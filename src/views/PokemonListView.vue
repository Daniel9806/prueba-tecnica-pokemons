<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import EmptyList from '@/components/EmptyList.vue';
import Pagination from '@/components/shared/Pagination.vue';
import PokemonSearchInput from '@/components/PokemonSearchInput.vue';

const pokemonStore = usePokemonStore();

const handleSearchPokemon = (searchTerm: string) => {
  pokemonStore.searchPokemon(searchTerm);
};

onMounted(async () => {
  if (pokemonStore.allPokemons.length === 0) {
    await pokemonStore.getAllPokemons();
  }
});
</script>

<template>
  <div class="mx-auto p-4 w-full max-w-lg">

    <PokemonSearchInput 
      @search-pokemon="handleSearchPokemon" 
      @clear-search="handleSearchPokemon" 
    />

    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="pokemonStore.allPokemons.length > 0">
      <PokemonCard
        v-for="pokemon in pokemonStore.allPokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />

      <Pagination
        v-if="pokemonStore.allPokemons.length > 1"
        :totalPages="pokemonStore.totalPages"
        :currentPage="pokemonStore.currentPage"
        @update:currentPage="pokemonStore.updateCurrentPage"
      />
    </div>
    <EmptyList v-else />
  </div>
</template>