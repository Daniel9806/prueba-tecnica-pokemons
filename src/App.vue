<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <main class="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <BottomNavbar v-if="!isWelcomePage" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import BottomNavbar from './components/BottomNavbar.vue'; // Import the new component

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