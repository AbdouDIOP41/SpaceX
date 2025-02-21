<script setup lang="ts">

import LaunchCard from './LaunchCard.vue';

const props = defineProps({
  show: Boolean,
  launch: Object
});

// Déclare l'événement 'close'
const emit = defineEmits(['update:show']);
//const showVideo = ref(false);

const closeModal = () => {
  //emit('close'); // Émet l'événement 'close'
  emit('update:show', false); // Met à jour la prop 'show' pour fermer le modal
};
</script>



<template>
    <Teleport to="body">
      <div v-if="show" 
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-2xl p-6 relative transform transition-all scale-95">

            <!-- Bouton de fermeture -->
            <button @click="$emit('update:show', false)" 
                class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg">✖
            </button>

            <!-- Contenu de la carte -->
            
            <LaunchCard :launch="launch" />

            <!-- Bouton de fermeture -->
            <div class="text-center mt-4">
                <button @click="$emit('update:show', false)" 
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Fermeture
                </button>
            </div>
            
        </div>
      </div>
    </Teleport>
  </template>

<style scoped>
@import "tailwindcss";
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mission-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

iframe {
  width: 100%;
  height: 315px;
}
</style>

