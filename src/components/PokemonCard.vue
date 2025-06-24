<template>
  <div
    class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-2 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
    @click="viewDetails"
  >
    <span class="text-lg font-semibold text-gray-800 capitalize">{{ pokemon.name }}</span>
    <button @click.stop="toggleFavorite" class="focus:outline-none">
      <svg
        class="w-6 h-6"
        :class="{ 'text-red-500': pokemon.isFavorite, 'text-gray-400': !pokemon.isFavorite }"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 21.35l-1.84-1.66C4.41 15.36 2 13.04 2 10.5 2 7.72 4.22 5.5 7 5.5c1.81 0 3.55.9 4.5 2.36C13.45 6.4 15.19 5.5 17 5.5c2.78 0 5 2.22 5 5s-2.41 4.86-8.16 14.19z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    // Expected structure: { name: 'bulbasaur', url: '...', isFavorite: false }
  }
});

const emit = defineEmits(['toggleFavorite']);
const router = useRouter();

const toggleFavorite = () => {
  emit('toggleFavorite', props.pokemon.name);
};

const viewDetails = () => {
  router.push(`/pokemon/${props.pokemon.name}`);
};
</script>