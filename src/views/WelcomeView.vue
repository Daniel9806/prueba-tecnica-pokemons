<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const startPokedex = () => {
  router.push('/pokemon');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-center pt-10">
    <img src="/hero-img.png" alt="Pikachu" class="w-64 h-auto mb-3" /> 
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Pokédex!</h1>
    <p class="text-lg text-gray-600 mb-8 max-w-md">
      The digital encyclopedia created for Pokémon fans, from the Pokémon video games.
    </p>
    <button
      @click="startPokedex"
      class="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 
      rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105
      cursor-pointer"
    >
      Get Started
    </button>
  </div>
</template>

<style scoped>
img {
  max-width: 250px;
  animation: bounce 2s infinite;
  border-radius: 50%;
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