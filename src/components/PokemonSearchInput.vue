<script setup lang="ts">
import { ref } from 'vue';

const searchTerm = ref<string>('');

const emit = defineEmits(['update:searchTerm', 'searchPokemon', 'clearSearch'])

const onSearchInput = () => {
  emit('update:searchTerm', searchTerm.value);
};

const onSearchPokemon = () => {
  emit('searchPokemon', searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = '';
  emit('clearSearch', '');
};
</script>

<template>
  <div class="relative mb-8">
    <input
      type="text"
      placeholder="Search"
      v-model="searchTerm"
      class="w-full pl-10 pr-4 py-3 bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      @input="onSearchInput"
      @keyup.enter="onSearchPokemon"
    />
    <svg
      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>

    <svg
      v-if="searchTerm"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      @click="clearSearch"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </div>
</template>
