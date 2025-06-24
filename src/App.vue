<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header v-if="!isWelcomePage" class="bg-red-600 text-white p-4 shadow-md flex justify-between items-center">
      <nav class="flex space-x-4">
        <router-link to="/pokemon" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">List</router-link>
        <router-link to="/pokemon/favorites" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Favorites</router-link>
      </nav>
    </header>
    <main class="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isWelcomePage = computed(() => route.name === 'welcome');
</script>

<style>
/* Basic fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>