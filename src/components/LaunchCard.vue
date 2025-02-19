<template>
    
      <div  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
          <!-- Bouton de fermeture 
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
          -->
          <!-- Contenu du modal -->
          <h2 class="text-2xl font-semibold text-center mb-4">{{ launch?.name || 'Nom inconnu' }}</h2>
          <img v-if="launch?.links?.patch?.large" :src="launch.links.patch.large" alt="Mission Patch" class="w-full h-64 object-contain mb-4">
          <p class="text-gray-600"><strong>Date :</strong> {{ formattedDate }}</p>
          <p class="text-gray-600"><strong>Détails :</strong> {{ launch?.details || 'Aucune information disponible' }}</p>
          <p class="text-gray-600"><strong>Lieu :</strong> {{ launch?.launchpad?.name || 'Inconnu' }}</p>
          
          <!-- Payloads et Clients -->
          <p class="text-gray-600"><strong>Payloads :</strong> {{ launch?.payloads?.map(p => p.name).join(', ') || 'Non disponible' }}</p>
          <p class="text-gray-600"><strong>Clients :</strong> {{ launch?.payloads?.map(p => p.customers?.join(', ')).join(', ') || 'Non disponible' }}</p>
  
          <a v-if="launch?.links?.article" :href="launch.links.article" target="_blank" class="text-blue-500 hover:underline block mt-2">
            📖 Lire l'article
          </a>
  
          <!-- Toggle vidéo YouTube -->
          <div v-if="launch?.links?.webcast" class="mt-4">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" v-model="showVideo" class="hidden">
              <span class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-blue-500': showVideo }">
                <span class="w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-5': showVideo }"></span>
              </span>
              <span class="ml-3 text-gray-700">Voir la vidéo</span>
            </label>
            <div v-if="showVideo" class="mt-4">
              <iframe class="w-full h-64 rounded-lg" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
  
        </div>
      </div>

  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  
  const props = defineProps({
    show: Boolean,
    launch: Object
  });
  
  const emit = defineEmits(['update:show']);
  const showVideo = ref(false);
  
  // Formatter la date en JJ/MM/AAAA
  const formattedDate = computed(() => {
    return props.launch?.date_utc ? new Date(props.launch.date_utc).toLocaleDateString('fr-FR') : 'Non disponible';
  });
  
  // Générer l'URL d'intégration YouTube
  const youtubeEmbedUrl = computed(() => {
    if (!props.launch?.links?.webcast) return '';
    const videoId = props.launch.links.webcast.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  });
  
  /*
  // Fonction pour fermer le modal
  const closeModal = () => {
    emit('update:show', false);
  };
  */
  </script>
  