<template>
  <div class="container mx-auto p-4 rounded-lg w-full max-w-lg">

    <PokemonSearchInput v-if="hasFavorites" @update:searchTerm="handleSearchInput" />

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="hasFavorites">
      <PokemonCard
        v-for="pokemon in pokemonStore.getFavoritePokemonsFiltered"
        :key="pokemon.name"
        :pokemon="pokemon"
        @toggleFavorite="pokemonStore.toggleFavorite"
      />
    </div>
    <EmptyListView v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import EmptyListView from '@/views/EmptyListView.vue';
import PokemonSearchInput from '@/components/PokemonSearchInput.vue';

const pokemonStore = usePokemonStore();

const handleSearchInput = (searchTerm: string) => {
  pokemonStore.setSearchTerm(searchTerm);
};

const hasFavorites = computed(() => {
  return pokemonStore.getFavoritePokemons.length > 0;
});

onMounted(() => {
  if (pokemonStore.allPokemons.length === 0) {
    pokemonStore.fetchAllPokemons();
  } else {
    // pokemonStore.syncFavoriteStatus();
  }
});
</script>