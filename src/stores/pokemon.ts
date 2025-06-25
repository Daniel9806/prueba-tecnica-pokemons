// src/stores/pokemon.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemons = ref<any[]>([])
  const favoritePokemonNames = ref(JSON.parse(localStorage.getItem('favoritePokemonNames') as any || []))
  const selectedPokemonDetails = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref<number>(1)
  const limit = ref<number>(30)
  const offset = ref<number>(0)
  const totalPages = ref<number>(0)
  const searchTerm = ref<string>('')

  const isDetailsModalOpen = ref(false);

  //Computed
  const getFavoritePokemons = computed(() => {
    return allPokemons.value.filter(p => favoritePokemonNames.value.includes(p.name));
  })

  const getPokemonsFiltered = computed(() => {
    //Lo correcto seria filtrar en la misma peticion de datos para buscar en todos los elementos 
    //de la bd y no solo a nivel de front, pero no encontre endpoint para filtrar por un substring
    if (!searchTerm.value) {
      return allPokemons.value;
    }
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return allPokemons.value.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  })

  const getFavoritePokemonsFiltered = computed(() => {
    if (!searchTerm.value) {
      return getFavoritePokemons.value;
    }
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return getFavoritePokemons.value.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  })
  
  //Methods
 const fetchAllPokemons = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit.value}&offset=${offset.value}`); 
      allPokemons.value = response.data.results.map((pokemon: any) => ({
        name: pokemon.name,
        url: pokemon.url,
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

  const fetchPokemonDetails = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      selectedPokemonDetails.value = response.data;
    } catch (err) {
      error.value = `Failed to fetch details for ${name}.`;
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
    const pokemonInList = allPokemons.value.find(p => p.name === pokemonName);
    if (pokemonInList) {
      pokemonInList.isFavorite = !pokemonInList.isFavorite;
    }
    localStorage.setItem('favoritePokemonNames', JSON.stringify(favoritePokemonNames.value));
  }

  const isFavorite = (pokemonName: string) => {
    return favoritePokemonNames.value.includes(pokemonName);
  }

  const syncFavoriteStatus = () => {
    allPokemons.value = allPokemons.value.map((pokemon: any) => ({
      ...pokemon,
      isFavorite: isFavorite(pokemon.name)
    }));
  }

  const updateCurrentPage = (page: number) => {
    currentPage.value = page;
    offset.value = (page - 1) * limit.value;
    fetchAllPokemons();
  }

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  }

  const openDetailsModal = (pokemonName: string) => {
    isDetailsModalOpen.value = true;
    fetchPokemonDetails(pokemonName); 
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
    searchTerm,
    getPokemonsFiltered,
    getFavoritePokemonsFiltered,
    isDetailsModalOpen,
    currentPage,
    totalPages,
    fetchAllPokemons,
    fetchPokemonDetails,
    toggleFavorite,
    syncFavoriteStatus,
    updateCurrentPage,  
    setSearchTerm,
    openDetailsModal,
    closeDetailsModal,
    isFavorite,
  }
})