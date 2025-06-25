<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <img src="/pokeball.png" alt="Loading" class="w-24 h-24 animate-spin-slow" />
    <p class="mt-4 text-gray-700">Loading...</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>