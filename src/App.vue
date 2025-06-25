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
import { computed, onMounted } from 'vue';
import BottomNavbar from '@/components/shared/BottomNavbar.vue';
import PokemonDetailsModal from '@/components/PokemonDetailsModal.vue';
import { usePokemonStore } from '@/stores/pokemon';

const pokemonStore = usePokemonStore();
const route = useRoute();
const isWelcomePage = computed(() => route.name === 'welcome');

onMounted(() => {
  pokemonStore.getFavoritesPokemonsFromStorage();
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>