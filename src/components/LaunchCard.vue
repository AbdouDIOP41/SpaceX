<script setup lang="ts">
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
  if (!props.launch.links?.webcast) return '';
  
  
  if (props.launch.links.webcast.includes('watch?v=')) {
    return props.launch.links.webcast.replace('watch?v=', 'embed/');
  }
  
  if (props.launch.links.webcast.includes('youtu.be/')) {
    const videoId = props.launch.links.webcast.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return '';
});

</script>

<template>
    <div class="space-y-6">
    
        <!-- Titre -->
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">
          {{ launch?.name || 'Nom inconnu' }}
        </h2>
  
        <!-- Image -->
        <div class="flex justify-center">
          <img v-if="launch?.links?.patch?.large" 
               :src="launch.links.patch.large"
               loading="lazy"
               alt="Mission Patch" 
               class="w-48 h-48 object-contain mb-4 rounded-lg shadow-md">
        </div>
  
        <!-- Informations -->
        <div class="space-y-2 text-gray-700">
          <p><strong>Date :</strong> {{ formattedDate }}</p>
          <p><strong>Détails :</strong> {{ launch?.details || 'Aucune information disponible' }}</p>
          <p><strong>Lieu :</strong> {{ launch?.launchpad?.name || 'Inconnu' }}</p>
          <p><strong>Payloads :</strong> {{ launch?.payloads?.map(p => p.name).join(', ') || 'Non disponible' }}</p>
          <p><strong>Clients :</strong> {{ launch?.payloads?.map(p => p.customers?.join(', ')).join(', ') || 'Non disponible' }}</p>
        </div>
  
        <!-- Lien vers l'article -->
        <a v-if="launch?.links?.article" 
           :href="launch.links.article" 
           target="_blank" 
           class="text-blue-600 hover:underline block mt-3 text-center">
          📖 Lire l'article
        </a>
  
        <!-- Toggle vidéo YouTube -->
        <div v-if="launch?.links?.webcast" class="mt-6">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" v-model="showVideo" class="hidden">
            <span class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" 
                  :class="{ 'bg-blue-500': showVideo }">
              <span class="w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out" 
                    :class="{ 'translate-x-5': showVideo }">
              </span>
            </span>
            <span class="ml-3 text-gray-700">Voir la vidéo</span>
          </label>
  
          <div v-if="showVideo" class="mt-4">
            <iframe class="w-full h-64 rounded-lg shadow-md" 
                    :src="youtubeEmbedUrl" 
                    frameborder="0" 
                    allowfullscreen
                    loading="lazy" 
                    title="YouTube Video">
            </iframe>
          </div>
        </div>

  
      </div>
  </template>
  
  
  
  <style scoped>
        @import "tailwindcss";
  
  </style>