import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePokemonStore } from '../../src/stores/pokemon';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('../../src/services/pokemons');
import { fetchAll, fetchPokemonByName } from '../../src/services/pokemons';

let getAllPokemonsInternalSpy: ReturnType<typeof vi.fn>;
let searchPokemonByNameInternalSpy: ReturnType<typeof vi.fn>;

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('usePokemonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorageMock.clear();
    vi.clearAllMocks();

    (fetchAll as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      data: {
        results: [
          { name: 'bulbasaur' },
          { name: 'charmander' },
          { name: 'squirtle' },
          { name: 'pikachu' },
        ],
        count: 100,
      },
    }));

    (fetchPokemonByName as ReturnType<typeof vi.fn>).mockImplementation((params: { name: string }) => {
      if (params.name.toLowerCase() === 'pikachu') {
        return { data: { name: 'pikachu', id: 25, type: 'electric' } };
      }
      if (params.name.toLowerCase() === 'bulbasaur') {
        return { data: { name: 'bulbasaur', id: 1, type: 'grass' } };
      }
      throw new Error(`Pokemon ${params.name} not found`); // Default error for others
    });

    const store = usePokemonStore(); // Get a fresh store instance for spying
    getAllPokemonsInternalSpy = vi.spyOn(store, 'getAllPokemons');
    searchPokemonByNameInternalSpy = vi.spyOn(store, 'searchPokemonByName');
  });

  //Initial State Tests
  it('should initialize with correct default state', () => {
    const {
      allPokemons,
      favoritePokemonNames,
      selectedPokemonDetails,
      loading,
      error,
      searchTerm,
      isDetailsModalOpen,
      currentPage,
      limit,
      offset,
      totalPages,
    } = usePokemonStore();

    expect(allPokemons).toEqual([]);
    expect(favoritePokemonNames).toEqual([]);
    expect(selectedPokemonDetails).toBeNull();
    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(searchTerm).toBe('');
    expect(isDetailsModalOpen).toBe(false);
    expect(currentPage).toBe(1);
    expect(limit).toBe(30);
    expect(offset).toBe(0);
    expect(totalPages).toBe(0);
  });

  //Computed Properties Tests
  describe('Computed Properties', () => {
    it('getFavoritePokemons should return an empty array if no favorites', () => {
      const store = usePokemonStore();
      expect(store.getFavoritePokemons).toEqual([]);
    });

    it('getFavoritePokemons should return favorited pokemons with isFavorite true', () => {
      const store = usePokemonStore();
      store.favoritePokemonNames = ['pikachu', 'charmander'];
      expect(store.getFavoritePokemons).toEqual([
        { name: 'pikachu', isFavorite: true },
        { name: 'charmander', isFavorite: true },
      ]);
    });

    it('getFavoritePokemonsFiltered should filter favorite pokemons based on searchTerm', () => {
      const store = usePokemonStore();
      store.favoritePokemonNames = ['pikachu', 'charmander', 'bulbasaur'];
      store.searchTerm = 'char';
      expect(store.getFavoritePokemonsFiltered).toEqual([
        { name: 'charmander', isFavorite: true },
      ]);
    });

    it('getFavoritePokemonsFiltered should return all favorites if searchTerm is empty', () => {
      const store = usePokemonStore();
      store.favoritePokemonNames = ['pikachu', 'charmander'];
      store.searchTerm = '';
      expect(store.getFavoritePokemonsFiltered).toEqual([
        { name: 'pikachu', isFavorite: true },
        { name: 'charmander', isFavorite: true },
      ]);
    });
  });

  //Actions/Methods Tests
  describe('Actions/Methods', () => {
    it('getFavoritesPokemonsFromStorage should load favorites from localStorage', () => {
      localStorageMock.setItem('favoritePokemonNames', JSON.stringify(['squirtle', 'jigglypuff']));
      const store = usePokemonStore();
      store.getFavoritesPokemonsFromStorage();
      expect(store.favoritePokemonNames).toEqual(['squirtle', 'jigglypuff']);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('favoritePokemonNames');
    });

    it('getAllPokemons should fetch and set allPokemons, and update totalPages', async () => {
      const store = usePokemonStore();
      expect(store.loading).toBe(false);

      const promise = store.getAllPokemons();

      expect(store.loading).toBe(true);
      expect(store.error).toBeNull();
      expect(fetchAll).toHaveBeenCalledWith({ limit: 30, offset: 0 });

      await promise;

      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
      expect(store.allPokemons).toEqual([
        { name: 'bulbasaur', isFavorite: false },
        { name: 'charmander', isFavorite: false },
        { name: 'squirtle', isFavorite: false },
        { name: 'pikachu', isFavorite: false },
      ]);
      expect(store.totalPages).toBe(Math.ceil(100 / 30));
    });

    it('getAllPokemons should handle API errors', async () => {
      (fetchAll as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));
      const store = usePokemonStore();

      await store.getAllPokemons();

      expect(store.loading).toBe(false);
      expect(store.error).toBe('Failed to fetch Pokémon list.');
      expect(store.allPokemons).toEqual([]);
    });

    it('getPokemonDetails should fetch and set selectedPokemonDetails', async () => {
      const store = usePokemonStore();
      expect(store.loading).toBe(false);
      expect(store.selectedPokemonDetails).toBeNull();

      const promise = store.getPokemonDetails('pikachu');

      expect(store.loading).toBe(true);
      expect(store.error).toBeNull();
      expect(fetchPokemonByName).toHaveBeenCalledWith({ name: 'pikachu' });

      await promise;

      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
      expect(store.selectedPokemonDetails).toEqual({
        name: 'pikachu',
        id: 25,
        type: 'electric',
      });
    });

    it('getPokemonDetails should handle API errors', async () => {
      (fetchPokemonByName as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Pokemon not found'));
      const store = usePokemonStore();

      await store.getPokemonDetails('unknown-pokemon');

      expect(store.loading).toBe(false);
      expect(store.error).toBe('Failed to fetch details for unknown-pokemon.');
      expect(store.selectedPokemonDetails).toBeNull();
    });

    it('searchPokemonByName should fetch and set allPokemons to a single pokemon', async () => {
      const store = usePokemonStore();
      store.allPokemons = [{ name: 'old-pokemon', isFavorite: false }];

      const promise = store.searchPokemonByName('bulbasaur');

      expect(store.loading).toBe(true);
      expect(store.error).toBeNull();
      expect(fetchPokemonByName).toHaveBeenCalledWith({ name: 'bulbasaur' });

      await promise;

      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
      expect(store.allPokemons).toEqual([
        { name: 'bulbasaur', isFavorite: false },
      ]);
    });

    it('searchPokemonByName should handle not found errors', async () => {
      (fetchPokemonByName as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
        throw new Error('Pokemon testpokemon not found');
      });
      const store = usePokemonStore();

      await store.searchPokemonByName('testpokemon');

      expect(store.loading).toBe(false);
      expect(store.error).toBe("Don't found pokemon for testpokemon.");
      expect(store.allPokemons).toEqual([]);
    });

    it('toggleFavorite should add a pokemon to favorites and update localStorage', () => {
      const store = usePokemonStore();
      store.allPokemons = [{ name: 'pikachu', isFavorite: false }];

      store.toggleFavorite('pikachu');
      expect(store.favoritePokemonNames).toEqual(['pikachu']);
      expect(store.allPokemons[0].isFavorite).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('favoritePokemonNames', JSON.stringify(['pikachu']));

      store.toggleFavorite('bulbasaur');
      expect(store.favoritePokemonNames).toEqual(['pikachu', 'bulbasaur']);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('favoritePokemonNames', JSON.stringify(['pikachu', 'bulbasaur']));
    });

    it('toggleFavorite should remove a pokemon from favorites and update localStorage', () => {
      const store = usePokemonStore();
      store.favoritePokemonNames = ['pikachu', 'charmander'];
      store.allPokemons = [
        { name: 'pikachu', isFavorite: true },
        { name: 'charmander', isFavorite: true },
      ];

      store.toggleFavorite('pikachu');
      expect(store.favoritePokemonNames).toEqual(['charmander']);
      expect(store.allPokemons[0].isFavorite).toBe(false);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('favoritePokemonNames', JSON.stringify(['charmander']));
    });

    it('isFavorite should return true if pokemon is in favorites', () => {
      const store = usePokemonStore();
      store.favoritePokemonNames = ['pikachu'];
      expect(store.isFavorite('pikachu')).toBe(true);
      expect(store.isFavorite('charmander')).toBe(false);
    });

    it('updateCurrentPage should update page, offset, and call getAllPokemons', async () => {
      const store = usePokemonStore();
      store.limit = 10;
      store.updateCurrentPage(2);
      expect(store.currentPage).toBe(2);
      expect(store.offset).toBe(10);
      expect(fetchAll).toHaveBeenCalledTimes(1);

      await vi.waitFor(() => {
        expect(fetchAll).toHaveBeenCalledWith({ limit: 10, offset: 10 });
      });
    });

    it('setSearchTerm should update the searchTerm', () => {
      const store = usePokemonStore();
      store.setSearchTerm('bulbasaur');
      expect(store.searchTerm).toBe('bulbasaur');
    });

    it('openDetailsModal should fetch details and open the modal', async () => {
      const store = usePokemonStore();
      expect(store.isDetailsModalOpen).toBe(false);
      expect(store.selectedPokemonDetails).toBeNull();

      const promise = store.openDetailsModal('pikachu');

      expect(fetchPokemonByName).toHaveBeenCalledWith({ name: 'pikachu' });
      await promise;
      expect(store.selectedPokemonDetails).toEqual({
        name: 'pikachu',
        id: 25,
        type: 'electric',
      });
      expect(store.isDetailsModalOpen).toBe(true);
    });

    it('openDetailsModal should not open modal if getPokemonDetails fails', async () => {
      (fetchPokemonByName as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Error fetching'));
      const store = usePokemonStore();
      
      await store.openDetailsModal('testpokemon');

      expect(store.isDetailsModalOpen).toBe(false);
      expect(store.selectedPokemonDetails).toBeNull();
      expect(store.error).not.toBeNull();
    });

    it('closeDetailsModal should close the modal and clear details/error', () => {
      const store = usePokemonStore();
      store.isDetailsModalOpen = true;
      store.selectedPokemonDetails = { name: 'bulbasaur', id: 1, type: 'grass' };
      store.error = 'Some error';

      store.closeDetailsModal();

      expect(store.isDetailsModalOpen).toBe(false);
      expect(store.selectedPokemonDetails).toBeNull();
      expect(store.error).toBeNull();
    });
  });
});