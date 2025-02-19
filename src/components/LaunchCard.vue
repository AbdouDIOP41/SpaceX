<!-- src/components/LaunchCard.vue -->
<template>
    <div class="bg-white border border-gray-200 rounded-lg shadow-md p-6 my-4">
      <h2 class="text-xl font-semibold mb-2">{{ launch.name }}</h2>
      <p class="text-gray-600 mb-2">
        <strong>Date:</strong> {{ new Date(launch.date_utc).toLocaleDateString() }}
      </p>
      <p class="text-gray-700 mb-4">
        <strong>Details:</strong> {{ launch.details || 'No details available' }}
      </p>
  
      <!-- Image de la mission -->
      <div v-if="launch.links?.flickr?.original?.length" class="mb-4">
        <img :src="launch.links.flickr.original[0]" alt="Mission Image" class="rounded-md w-full h-auto" />
      </div>
  
      <p class="text-gray-600 mb-2"><strong>Launchpad:</strong> {{ launch.launchpad?.name || 'Unknown' }}</p>
  
      <!-- Liste des Payloads -->
      <div v-if="launch.payloads?.length" class="mb-4">
        <strong>Payloads:</strong>
        <ul class="list-disc pl-6">
          <li v-for="payload in launch.payloads" :key="payload" class="text-gray-700">{{ payload }}</li>
        </ul>
      </div>
  
      <!-- Lien vers l'article de présentation -->
      <div v-if="launch.links?.article" class="mb-4">
        <a :href="launch.links.article" target="_blank" class="text-blue-500 hover:text-blue-700">
          Read more
        </a>
      </div>
  
      <!-- Toggle YouTube video -->
      <div class="mt-4">
        <label for="show-video" class="inline-flex items-center text-gray-700">
          <input type="checkbox" id="show-video" v-model="showVideo" class="mr-2" />
          Show YouTube Video
        </label>
  
        <!-- Afficher la vidéo YouTube si showVideo est vrai -->
        <div v-if="showVideo && launch.links?.webcast" class="mt-4">
          <iframe :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`" frameborder="0" allowfullscreen class="w-full h-64 rounded-md"></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Prop 'launch' qui recevra les données du lancement
  const props = defineProps({
    launch: Object,
  });
  
  // Déclaration de l'état pour gérer l'affichage de la vidéo YouTube
  const showVideo = ref(false);
  </script>
  
  <style scoped>
  /* Aucune règle CSS spécifique nécessaire avec Tailwind */
  </style>
  