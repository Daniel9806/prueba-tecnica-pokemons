<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <img src="/pokeball.png" alt="Pikachu" class="w-48 h-auto mb-8 animate-bounce" /> <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Pokédex!</h1>
    <p class="text-lg text-gray-600 mb-8 max-w-md">
      The digital encyclopedia created for Pokémon fans, from the Pokémon video games.
    </p>
    <button
      @click="startPokedex"
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      Start
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const startPokedex = () => {
  router.push('/pokemon');
};
</script>

<style scoped>
/* Ensure you have a pikachu image in your /public folder */
/* Example: /public/pokeball.png or /public/pikachu.png */
img {
  max-width: 250px; /* Adjust size as needed */
  animation: bounce 2s infinite; /* Example animation */
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>