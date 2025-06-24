<template>
  <div class="container mx-auto p-4 bg-white rounded-lg shadow-xl w-full max-w-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Pokémon List</h2>

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="pokemonStore.allPokemon.length > 0">
      <PokemonCard
        v-for="pokemon in pokemonStore.allPokemon"
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
import EmptyListView from '../views/EmptyListView.vue'; // Can be used here too if list is empty

const pokemonStore = usePokemonStore();

onMounted(async () => {
  if (pokemonStore.allPokemon.length === 0) {
    await pokemonStore.fetchAllPokemon();
  } else {
    // Ensure favorite status is synced if data was already loaded
    pokemonStore.syncFavoriteStatus();
  }
});
</script>