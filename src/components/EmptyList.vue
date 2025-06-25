<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPokemonList = () => {
  router.push('/pokemon');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-center p-4">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Uh-oh!</h2>
    <p class="text-lg text-gray-600 mb-8 max-w-md">
      You haven't added any favorite Pokémon yet, or there's no data to show.
    </p>
    <button
      @click="goToPokemonList"
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full
      shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      Go to Pokémon List
    </button>
  </div>
</template>