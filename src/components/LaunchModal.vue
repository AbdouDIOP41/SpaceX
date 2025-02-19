<script setup>

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

<script>
// Ajout d'un export default classique pour la compatibilité
export default {
  name: 'LaunchModal',
  props: {
    show: Boolean,
    launch: Object
  },
  emits: ['update:show'],
  methods: {
    closeModal() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<template>
    <Teleport to="body">
      <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
          <!-- Bouton de fermeture -->
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
  
          <!-- Contenu de la carte -->
          <LaunchCard :launch="launch" />
  
          <!-- Bouton de fermeture -->
          <div class="text-center mt-4">
            <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </template>

<style scoped>
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

