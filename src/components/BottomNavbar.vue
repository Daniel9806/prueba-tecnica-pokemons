<template>
  <div class="fixed inset-x-0 bottom-0 bg-white shadow-lg p-3 flex justify-around items-center rounded-t-xl z-50">
    <router-link
      to="/pokemon"
      class="flex-1 flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
      :class="{
        'bg-red-600 text-white': isAllActive,
        'text-gray-600 hover:bg-gray-100': !isAllActive
      }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <span class="text-xs font-semibold ml-2">All</span>
    </router-link>

    <router-link
      to="/pokemon/favorites"
      class="flex-1 flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ml-2"
      :class="{
        'bg-gray-300 text-gray-800': isFavoritesActive,
        'text-gray-600 hover:bg-gray-100': !isFavoritesActive
      }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>

      <span class="text-xs font-semibold ml-2">Favorites</span>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isAllActive = computed(() => {
  return route.path === '/pokemon';
});

const isFavoritesActive = computed(() => {
  return route.path === '/pokemon/favorites';
});
</script>

<style scoped>
/* No additional scoped styles needed for Tailwind */
</style>