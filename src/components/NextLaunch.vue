<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLaunchStore } from '../launches-data/launchStore';

const launchStore = useLaunchStore();
const { nextLaunchState, countdown } = storeToRefs(launchStore);

</script>

<template>
  <section class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
    <h2 class="text-2xl font-semibold text-center mb-4">🛰️ Prochain lancement</h2>

    <div v-if="nextLaunchState.isLoading" class="text-center">
      <p class="animate-pulse text-gray-400">Chargement du prochain lancement...</p>
    </div>
    <div v-else-if="nextLaunchState.error" class="text-center text-red-400">
      <p>⚠️ {{ nextLaunchState.error }}</p>
    </div>
    <div v-else-if="!nextLaunchState.data" class="text-center text-gray-400">
      <p> Aucune donnée disponible pour le prochain lancement.</p>
    </div>
    <div v-else class="text-center">
      <h3 class="text-xl font-bold">🚀 {{ nextLaunchState.data?.name }}</h3>
      <p class="text-lg mt-2">📅 <strong>Date :</strong> {{ new Date(nextLaunchState.data?.date_utc).toLocaleString() }}</p>
      <p class="text-lg mt-2">⏳ <strong>Décompte :</strong> 
        <span class="text-red-400 font-bold">{{ countdown }}</span>
        <span> {{ countdown < 1 ? 'seconde' : 'secondes' }} </span>
      </p>
    </div>
  </section>
</template>
