<template>
  <div class="container mx-auto p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
    <LoadingSpinner v-if="pokemonStore.loading" class="my-8" />
    <p v-else-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
    <div v-else-if="pokemonStore.selectedPokemonDetails" class="text-center">
      <h2 class="text-3xl font-bold capitalize text-gray-800 mb-4">{{ pokemonStore.selectedPokemonDetails.name }}</h2>
      <img
        :src="pokemonStore.selectedPokemonDetails.sprites?.front_default"
        :alt="pokemonStore.selectedPokemonDetails.name"
        class="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full p-2 object-contain"
      />

      <div class="text-left mb-6">
        <p class="text-lg font-semibold text-gray-700 mb-2">Attributes:</p>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>Height: {{ pokemonStore.selectedPokemonDetails.height / 10 }} m</li>
          <li>Weight: {{ pokemonStore.selectedPokemonDetails.weight / 10 }} kg</li>
          <li>Type(s):
            <span v-for="(typeInfo, index) in pokemonStore.selectedPokemonDetails.types" :key="typeInfo.type.name">
              {{ typeInfo.type.name }}{{ index < pokemonStore.selectedPokemonDetails.types.length - 1 ? ', ' : '' }}
            </span>
          </li>
          <li>Abilities:
            <span v-for="(abilityInfo, index) in pokemonStore.selectedPokemonDetails.abilities" :key="abilityInfo.ability.name">
              {{ abilityInfo.ability.name }}{{ index < pokemonStore.selectedPokemonDetails.abilities.length - 1 ? ', ' : '' }}
            </span>
          </li>
          </ul>
      </div>

      <button
        @click="sharePokemonDetails"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Share
      </button>

      <button
        @click="goBack"
        class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out ml-2"
      >
        Back
      </button>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>No Pokémon details found.</p>
      <button
        @click="goBack"
        class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '../stores/pokemon';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();

// Watch for changes in the route's 'name' parameter to refetch details
watch(() => route.params.name, async (newName) => {
  if (newName) {
    await pokemonStore.fetchPokemonDetails(newName);
  }
}, { immediate: true }); // immediate: true fetches on initial load

// If navigated directly to details page, fetch
onMounted(() => {
  if (route.params.name && !pokemonStore.selectedPokemonDetails) {
    pokemonStore.fetchPokemonDetails(route.params.name);
  }
});

const sharePokemonDetails = async () => {
  const pokemon = pokemonStore.selectedPokemonDetails;
  if (!pokemon) return;

  const name = pokemon.name;
  const types = pokemon.types.map(t => t.type.name).join(', ');
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  const height = `${pokemon.height / 10}m`;
  const weight = `${pokemon.weight / 10}kg`;

  const shareText = `Pokémon: ${name}, Type(s): ${types}, Abilities: ${abilities}, Height: ${height}, Weight: ${weight}`;

  try {
    await navigator.clipboard.writeText(shareText);
    alert('Pokémon details copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy details to clipboard.');
  }
};

const goBack = () => {
  // Go back to the previous page or to the list if there's no history
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/pokemon');
  }
};
</script>

