// src/stores/pokemon.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    allPokemon: [],
    favoritePokemonNames: JSON.parse(localStorage.getItem('favoritePokemonNames') || '[]'), // Persist favorites in localStorage
    selectedPokemonDetails: null,
    loading: false,
    error: null
  }),
  getters: {
    getFavoritePokemon: (state) => {
      // Filter allPokemon to get only the favorited ones
      return state.allPokemon.filter(p => state.favoritePokemonNames.includes(p.name));
    },
    // Getter to check if a pokemon is favorited
    isFavorite: (state) => (pokemonName) => {
      return state.favoritePokemonNames.includes(pokemonName);
    }
  },
  actions: {
    async fetchAllPokemon() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151'); // Limit to first 151 for simplicity or remove limit for more
        this.allPokemon = response.data.results.map(pokemon => ({
          name: pokemon.name,
          url: pokemon.url,
          isFavorite: this.isFavorite(pokemon.name) // Initial favorite status
        }));
      } catch (err) {
        this.error = 'Failed to fetch Pokémon list.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonDetails(name) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        this.selectedPokemonDetails = response.data;
      } catch (err) {
        this.error = `Failed to fetch details for ${name}.`;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    toggleFavorite(pokemonName) {
      const index = this.favoritePokemonNames.indexOf(pokemonName);
      if (index > -1) {
        // Remove from favorites
        this.favoritePokemonNames.splice(index, 1);
      } else {
        // Add to favorites
        this.favoritePokemonNames.push(pokemonName);
      }
      // Update the allPokemon list's isFavorite flag
      const pokemonInList = this.allPokemon.find(p => p.name === pokemonName);
      if (pokemonInList) {
        pokemonInList.isFavorite = !pokemonInList.isFavorite;
      }
      // Persist to localStorage
      localStorage.setItem('favoritePokemonNames', JSON.stringify(this.favoritePokemonNames));
    },

    // Action to re-sync favorite status when allPokemon is loaded or reloaded
    syncFavoriteStatus() {
      this.allPokemon = this.allPokemon.map(pokemon => ({
        ...pokemon,
        isFavorite: this.isFavorite(pokemon.name)
      }));
    }
  }
})