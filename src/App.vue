
<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';
import { useLaunches } from './useLaunches';
import LaunchModal from './components/LaunchModal.vue'; 

//const showModal = ref<boolean[]>([]);

const {
  launches,
  nextLaunch,
  countdown,
  fetchLaunches,
  fetchNextLaunch,
  updateCountdown,
  filterLaunches,
  filter,
  //showModal,
  options,
  isLoading
} = useLaunches();

const showModal = ref<boolean[]>([]);

// Vérification quand filterLaunches change
watch(filterLaunches, (newVal) => {
  console.log("🔄 Filtered launches updated:", newVal);
  showModal.value = new Array(newVal.length).fill(false); 
}, { immediate: true });

// Vérifier quand filterLaunches change
watch(filterLaunches, (newVal) => {
  console.log("🔄 Filtered launches updated:", newVal);
});

watch(launches, (newVal) => {
  console.log("🚀 Launches updated:", newVal);
});


// Ouvre le modal au bon index
const openModal = (index: number) => {
  if (!showModal.value || showModal.value.length <= index) return; // Vérification supplémentaire
  showModal.value[index] = true;
};


onMounted(() => {
  fetchLaunches();
  fetchNextLaunch();
  setInterval(updateCountdown, 1000);

  console.log('launches', launches.value.length, filterLaunches.value); // Utilisation correcte de filterLaunches
  console.log('show dans fetch', showModal);
  console.log('show avec value', showModal.value);
});
</script>


<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">

     <!-- Titre principal -->
    <h1 class="text-4xl font-bold text-center mb-8">🚀 SpaceX Launches</h1>

    <!-- Section Prochain lancement -->
    <section class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-center mb-4">🛰️ Prochain lancement</h2>
      
      <div v-if="nextLaunch" class="text-center">
        <h3 class="text-xl font-bold">{{ nextLaunch.name }}</h3>
        <p class="text-lg mt-2">📅 <strong>Date :</strong> {{ new Date(nextLaunch.date_utc).toLocaleString() }}</p>
        <p class="text-lg mt-2">⏳ <strong>Décompte :</strong> <span class="text-red-400 font-bold">{{ countdown }}</span> secondes</p>
      </div>

      <div v-else class="text-center text-gray-400">
        <p class="animate-pulse">Chargement du prochain lancement...</p>
      </div>
    </section>

    <!-- Filtrage des lancements -->
    <section class="mb-6">
      <label for="filter" class="block text-lg font-semibold mb-2">📌 Filtrer les lancements :</label>
      <select id="filter" v-model="filter" class="w-full p-2 rounded bg-gray-700 text-white">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </section>

    <!-- Liste des lancements -->
    <section class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-4">📜 Derniers lancements</h2>

      <div v-if="isLoading" class="text-center">
        <p class="animate-pulse text-gray-400">Chargement des lancements...</p>
      </div>

      <ul v-else class="space-y-4">



      <!--<ul v-if="filterLaunches && filterLaunches.length > 0"> -->
        <li v-for="(launch, index) in filterLaunches" :key="launch.id"
          class="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ launch.name }}</h3>
            <p class="text-sm text-gray-300">{{ new Date(launch.date_utc).toLocaleString('fr-FR') }}</p>
          </div>
          
          <button @click="openModal(index)"
                  class="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Voir détails
          </button>

          <Teleport to="body">
            <LaunchModal 
              v-if="showModal && showModal[index] !== undefined && showModal[index]"
              :show="showModal[index]" 
              @update:show="showModal[index] = $event"
              :launch="launch">
            </LaunchModal>
          </Teleport>
        </li>
      </ul>
    </section>
  </div>
</template>


<style scoped>
@import "tailwindcss";
/* Styles de base pour le projet */
</style>

