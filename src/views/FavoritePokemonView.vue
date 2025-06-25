<script setup lang="ts">
import { computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import EmptyList from '@/components/EmptyList.vue';
import PokemonSearchInput from '@/components/PokemonSearchInput.vue';

const pokemonStore = usePokemonStore();

const handleSearchInput = (searchTerm: string) => {
  pokemonStore.setSearchTerm(searchTerm);
};

const hasFavorites = computed(() => {
  return pokemonStore.getFavoritePokemons.length > 0;
}); 
</script>

<template>
  <div class="container mx-auto p-4 rounded-lg w-full max-w-lg">

    <PokemonSearchInput 
      v-if="hasFavorites" 
      @update:searchTerm="handleSearchInput" 
      @clear-search="handleSearchInput"
    />

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="hasFavorites">
      <PokemonCard
        v-for="pokemon in pokemonStore.getFavoritePokemonsFiltered"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
    <EmptyList v-else />
  </div>
</template>