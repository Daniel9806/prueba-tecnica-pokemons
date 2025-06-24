<template>
  <div class="container mx-auto p-4 bg-white rounded-lg shadow-xl w-full max-w-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Favorite Pokémon</h2>

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="pokemonStore.getFavoritePokemon.length > 0">
      <PokemonCard
        v-for="pokemon in pokemonStore.getFavoritePokemon"
        :key="pokemon.name"
        :pokemon="pokemon"
        @toggleFavorite="pokemonStore.toggleFavorite"
      />
    </div>
    <EmptyListView v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '../stores/pokemon';
import PokemonCard from '../components/PokemonCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import EmptyListView from '../views/EmptyListView.vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  // Ensure we have all pokemon data loaded to filter favorites from it
  if (pokemonStore.allPokemon.length === 0) {
    pokemonStore.fetchAllPokemon(); // Fetch if not already loaded
  } else {
    pokemonStore.syncFavoriteStatus(); // Make sure favorite status is updated
  }
});
</script>