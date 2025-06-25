<template>
  <div class="mx-auto p-4 w-full max-w-lg">
    <PokemonSearchInput @update:searchTerm="handleSearchInput" />

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="pokemonStore.allPokemons.length > 0">
      <PokemonCard
        v-for="pokemon in pokemonStore.getPokemonsFiltered"
        :key="pokemon.name"
        :pokemon="pokemon"
        @toggleFavorite="pokemonStore.toggleFavorite"
      />

      <Pagination
        :totalPages="pokemonStore.totalPages"
        :currentPage="pokemonStore.currentPage"
        @update:currentPage="pokemonStore.updateCurrentPage"
      />
    </div>
    <EmptyListView v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import EmptyListView from '@/views/EmptyListView.vue'; // Can be used here too if list is empty
import Pagination from '@/components/Pagination.vue';
import PokemonSearchInput from '@/components/PokemonSearchInput.vue';

const pokemonStore = usePokemonStore();

const handleSearchInput = (searchTerm: string) => {
  pokemonStore.setSearchTerm(searchTerm);
};

onMounted(async () => {
  if (pokemonStore.allPokemons.length === 0) {
    await pokemonStore.fetchAllPokemons();
  } else {
    // Ensure favorite status is synced if data was already loaded
    // pokemonStore.syncFavoriteStatus();
  }
});
</script>