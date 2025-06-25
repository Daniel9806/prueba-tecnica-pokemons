<template>
  <Transition name="modal-fade">
    <div v-if="pokemonStore.isDetailsModalOpen" class="fixed inset-0 flex items-center 
    justify-center px-4 z-[100]" style="background-color: rgba(0, 0, 0, 0.5)"
    @click="closeModal">
      <div
        class="relative bg-white rounded-sm shadow-xl w-full max-w-md transform 
        transition-all duration-300 scale-95 opacity-0"
        :class="{ 'scale-100 opacity-100': pokemonStore.isDetailsModalOpen }"
        @click.stop
      >
        <button
          @click.stop="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 
          rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer z-[101]"
        >
          <svg style="color: #79C9F9;" class="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <p v-if="pokemonStore.error" class="text-red-600 text-center">{{ pokemonStore.error }}</p>
        <div v-else-if="pokemonStore.selectedPokemonDetails" class="text-center">
          <img src="/pokemon-bg-img.png" alt="pokemon-bg-img" class="w-full h-52 object-cover
           rounded-t-sm relative" />
          <img
            :src="getPokemonImage"
            :alt="pokemonStore.selectedPokemonDetails.name"
            class="w-40 h-40 absolute top-8 left-1/3"
          />

          <div class="text-left p-7">
            <ul class="list-none text-gray-600 space-y-2">
              <li class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Name:</span>
                <span>{{ pokemonStore.selectedPokemonDetails.name }}</span>
              </li>
              <li class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Weight:</span>
                <span>{{ (pokemonStore.selectedPokemonDetails.weight / 10).toFixed(1) }} kg</span>
              </li>
              <li class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Height:</span>
                <span>{{ (pokemonStore.selectedPokemonDetails.height / 10).toFixed(1) }} m</span>
              </li>
              <li class="flex justify-between border-b pb-1">
                <span class="font-semibold text-gray-600">Types:</span>
                <span>
                  <span v-for="(typeInfo, index) in pokemonStore.selectedPokemonDetails.types" :key="typeInfo.type.name">
                    {{ typeInfo.type.name }}{{ index < pokemonStore.selectedPokemonDetails.types.length - 1 ? ', ' : '' }}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex justify-center items-center space-x-4 mt-2 pb-3">
            <button
              @click="sharePokemonDetails"
              class="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 
              rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 
              cursor-pointer flex items-center"
            >
              Share to my friends
            </button>

            <button @click="toggleFavorite" class="focus:outline-none cursor-pointer">
              <svg v-if="isCurrentPokemonFavorite" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" fill="#F5F5F5"/>
                <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#ECA539"/>
              </svg>
              <svg v-else width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" fill="#F5F5F5"/>
                <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#BFBFBF"/>
              </svg>
            </button>
          </div>
        </div>

        <div v-else class="text-center text-gray-600">
          <p>No Pokémon details to display.</p>
          <button
            @click="closeModal"
            class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2
            px-6 rounded-full shadow transition duration-300 ease-in-out cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useToast } from "vue-toastification";

//Composables
const toast = useToast();
const pokemonStore = usePokemonStore();

//Computed
const isCurrentPokemonFavorite = computed(() => {
  return pokemonStore.selectedPokemonDetails
    ? pokemonStore.isFavorite(pokemonStore.selectedPokemonDetails.name)
    : false;
});

const getPokemonImage = computed(() => {
  return pokemonStore.selectedPokemonDetails
    ? pokemonStore.selectedPokemonDetails.sprites?.other?.dream_world.front_default
    : null;
});

//Methods
const closeModal = () => {
  pokemonStore.closeDetailsModal();
};

const sharePokemonDetails = async () => {
  const pokemon = pokemonStore.selectedPokemonDetails;
  if (!pokemon) return;

  const name = pokemon.name;
  const types = pokemon.types.map(t => t.type.name).join(', ');
  const height = `${(pokemon.height / 10).toFixed(1)}m`;
  const weight = `${(pokemon.weight / 10).toFixed(1)}kg`;

  const shareText = `Pokémon: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types}`;

  try {
    await navigator.clipboard.writeText(shareText);
    toast.success('Pokémon details copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    toast.error('Failed to copy details to clipboard.');
  }
};

const toggleFavorite = () => {
  if (pokemonStore.selectedPokemonDetails) {
    pokemonStore.toggleFavorite(pokemonStore.selectedPokemonDetails.name);
  }
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .transform,
.modal-fade-leave-active .transform {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.3s ease;
}

.modal-fade-enter-from .transform,
.modal-fade-leave-to .transform {
  transform: scale(0.95);
  opacity: 0;
}
</style>