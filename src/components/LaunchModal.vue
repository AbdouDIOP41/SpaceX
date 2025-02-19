<script setup>

const props = defineProps({
  show: Boolean,
  launch: Object
});

const emit = defineEmits(['update:show']);
//const showVideo = ref(false);

const closeModal = () => {
  emit('update:show', false);
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
    <div v-if="show" class="modal">
      <div class="modal-content">
        <!-- Nom du lancement -->
        <h2>{{ launch?.name }}</h2>
        <!-- Date au format Jour/Mois/Année -->
        <p>Date: {{ new Date(launch?.date_utc).toLocaleDateString('fr-FR') }}</p>
        <!-- Détails de la mission -->
        <p><strong>Details:</strong> {{ launch?.details || 'No details available' }}</p>
  
        <button @click="closeModal">Close</button>
      </div>
    </div>
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

