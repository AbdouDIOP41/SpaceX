
<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLaunches } from './useLaunches';
import { useLaunchStore } from "./launches-data/launchStore";
//import LaunchModal from './components/LaunchModal.vue'; 
import NextLaunch from './components/NextLaunch.vue';
import FilterBar from './components/FilterBar.vue';
import LaunchesList from './components/LaunchesList.vue';

let countdownInterval: number | null = null;
const launchStore = useLaunchStore();
const {
  fetchLaunches,
  fetchNextLaunch,
  updateCountdown
} = launchStore;

onMounted(() => {
  fetchLaunches();
  fetchNextLaunch();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }
});

</script>


<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">

     <!-- Titre principal -->
    <h1 class="text-4xl font-bold text-center mb-8">🚀 SpaceX Launches</h1>

    <!-- Section Prochain lancement -->
    <NextLaunch />

    <!-- Filtrage des lancements -->
    <FilterBar />

    <!-- Liste des lancements -->
    <LaunchesList />
  
  </div>
</template>


<style scoped>
@import "tailwindcss";
</style>

