<template>
  <div class="flex justify-center gap-4 my-4">
    <button
      :disabled="currentPage === 1"
      @click="previousPage"
      class="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 
      disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
    >
      Anterior
    </button>

    <span class="mt-2">{{ currentPage }} de {{ totalPages }}</span>
    
    <button
      :disabled="currentPage === totalPages"
      @click="nextPage"
      class="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 
      disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>
