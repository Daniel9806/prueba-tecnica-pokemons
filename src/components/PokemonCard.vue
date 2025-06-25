<template>
  <div
    class="flex items-center justify-between py-1 px-4 bg-white rounded-sm mb-2 
    cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
    @click="viewDetails"
  >
    <span class="text-lg font-semibold text-gray-800 capitalize">{{ pokemon.name }}</span>
    <button @click.stop="toggleFavoritePokemon" class="focus:outline-none cursor-pointer">
      <svg v-if="pokemon.isFavorite" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="22" fill="#F5F5F5"/>
        <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#ECA539"/>
      </svg>

      <svg v-else width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="22" fill="#F5F5F5"/>
        <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#BFBFBF"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import type { Pokemon } from '@/types/pokemon';

const { openDetailsModal, toggleFavorite } = usePokemonStore();

const props = defineProps<{
  pokemon: Pokemon;
}>();

const toggleFavoritePokemon = () => {
  toggleFavorite(props.pokemon.name);
};

const viewDetails = () => {
  openDetailsModal(props.pokemon.name);
};
</script>