
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
  <div>
    <h1 class="text-4xl text-center py-4">SpaceX Launches</h1>

    <!-- Section Prochain lancement -->
   <div>
    <h1>Prochain lancement SpaceX</h1>

    <!-- Afficher les informations du prochain lancement -->
    <div v-if="nextLaunch && countdown>0" >
      <h2>{{ nextLaunch.name }}</h2>
      <p>Date : {{ new Date(nextLaunch.date_utc).toLocaleString() }}</p>
      <p>Décompte : {{ countdown }} secondes</p>
    </div>

    <!-- Afficher un message si aucune donnée n'est disponible -->
    <div v-else>
      <p>Chargement du prochain lancement...</p>
    </div>
  </div>

   
  <div v-if="isLoading">
  <p>Chargement des lancements...</p>
</div>

    <!-- Liste des lancements -->
    <div v-else>

       <!-- Filtre de lancements -->
       <div class="mb-4">
        <select id="filter" v-model="filter" class="mb-4">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
       </div>

      <ul v-if="filterLaunches && filterLaunches.length > 0">
        <li v-for="(launch, index) in filterLaunches" :key="launch.id">
          {{ launch.name }} - {{ new Date(launch.date_utc).toLocaleString('fr-FR') }}
          <button @click="openModal(index)" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Show Modal</button>
          <Teleport to="body">
            <LaunchModal 
              v-if="showModal && showModal[index] !== undefined && showModal[index]"
              :show="showModal[index]" 
              @update:show="showModal[index] = $event"
              :launch="launch">
              <template #header>
                <h3>{{ launch.name }} Details</h3>
              </template>
            </LaunchModal>
          </Teleport>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
@import "tailwindcss";
/* Styles de base pour le projet */
</style>

