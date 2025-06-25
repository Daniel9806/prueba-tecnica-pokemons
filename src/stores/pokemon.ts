import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { fetchAll, fetchPokemonByName } from '@/services/pokemons'

export const usePokemonStore = defineStore('pokemon', () => {
  //Data
  const allPokemons = ref<Pokemon[]>([])
  const favoritePokemonNames = ref<string[]>([])
  const selectedPokemonDetails = ref<Pokemon | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchTerm = ref<string>('')
  const isDetailsModalOpen = ref(false);

  //<Pagination data
  const currentPage = ref<number>(1)
  const limit = ref<number>(30)
  const offset = ref<number>(0)
  const totalPages = ref<number>(0)
  //>

  //Computed
  const getFavoritePokemons = computed(() => {
    return favoritePokemonNames.value.map((pokemonName: string) => ({
      name: pokemonName,
      isFavorite: true
    } as Pokemon));
  })

  const getFavoritePokemonsFiltered = computed(() => {
    if (!searchTerm.value) {
      return getFavoritePokemons.value;
    }
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return getFavoritePokemons.value.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  })
  
  //Methods
  const getFavoritesPokemonsFromStorage = () => {
    favoritePokemonNames.value = JSON.parse(localStorage.getItem('favoritePokemonNames') as string);
  }

  const getAllPokemons = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchAll({limit: limit.value, offset: offset.value}); 
      allPokemons.value = response.data.results.map((pokemon: Pokemon) => ({
        name: pokemon.name,
        isFavorite: isFavorite(pokemon.name) 
      }));
      totalPages.value = Math.ceil(response.data.count / limit.value);
    } catch (err) {
      error.value = 'Failed to fetch Pokémon list.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  const getPokemonDetails = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchPokemonByName({name});
      selectedPokemonDetails.value = response.data;
    } catch (err) {
      error.value = `Failed to fetch details for ${name}.`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  const searchPokemonByName = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchPokemonByName({name});
      allPokemons.value = [{
        name: response.data.name,
        isFavorite: isFavorite(response.data.name) 
      }]
    } catch (err) {
      error.value = `Don't found pokemon for ${name}.`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  const toggleFavorite = (pokemonName: string) => {
    const index = favoritePokemonNames.value.indexOf(pokemonName);
    if (index > -1) {
      favoritePokemonNames.value.splice(index, 1);
    } else {
      favoritePokemonNames.value.push(pokemonName);
    }
    const pokemonInList = allPokemons.value.find((pokemon: Pokemon) => pokemon.name === pokemonName);
    if (pokemonInList) {
      pokemonInList.isFavorite = !pokemonInList.isFavorite;
    }
    localStorage.setItem('favoritePokemonNames', JSON.stringify(favoritePokemonNames.value));
  }

  const isFavorite = (pokemonName: string) => {
    return favoritePokemonNames.value.includes(pokemonName);
  }

  const updateCurrentPage = (page: number) => {
    currentPage.value = page;
    offset.value = (page - 1) * limit.value;
    getAllPokemons();
  }

  //Search favorite pokemons
  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  }
  
  const searchPokemon = (term: string) => {
    if(term === '') {
      getAllPokemons();
    } else {
      searchPokemonByName(term);
    }
  }

  //Open and close details modal
  const openDetailsModal = async (pokemonName: string) => {
    await getPokemonDetails(pokemonName); 
    if(selectedPokemonDetails.value) {
      isDetailsModalOpen.value = true;
    }
  }

  const closeDetailsModal = () => {
    isDetailsModalOpen.value = false;
    selectedPokemonDetails.value = null;
    error.value = null;
  }

  return {
    allPokemons,
    favoritePokemonNames,
    selectedPokemonDetails,
    getFavoritePokemons,
    loading,
    error,
    limit,
    offset,
    searchTerm,
    getFavoritePokemonsFiltered,
    isDetailsModalOpen,
    currentPage,
    totalPages,
    getFavoritesPokemonsFromStorage,
    getAllPokemons,
    getPokemonDetails,
    toggleFavorite,
    updateCurrentPage,  
    setSearchTerm,
    openDetailsModal,
    closeDetailsModal,
    isFavorite,
    searchPokemon,
    searchPokemonByName,
  }
})