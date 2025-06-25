<template>
  <div class="min-h-screen bg-medium-bg flex flex-col">
    <main class="flex-grow container mx-auto p-4 flex flex-col">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <div class="h-16"></div>
    </main>

    <BottomNavbar v-if="!isWelcomePage" />

    <PokemonDetailsModal />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import BottomNavbar from '@/components/BottomNavbar.vue';
import PokemonDetailsModal from '@/components/PokemonDetailsModal.vue';

const route = useRoute();
const isWelcomePage = computed(() => route.name === 'welcome');
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>