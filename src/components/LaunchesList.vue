<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLaunchStore } from '../launches-data/launchStore';
import LaunchModal from './LaunchModal.vue';

const launchStore = useLaunchStore();
const { launchesState, filterLaunches } = storeToRefs(launchStore);
const showModal = ref(new Map<number, boolean>());

const toggleModal = (index: number) => {
  /* 
    if (!showModal.value ) return; // Vérification supplémentaire
      showModal.value.set(index, true);
    };
  */
  showModal.value.set(index, !showModal.value.get(index));
};


</script>

<template>
  <section class="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-center mb-4">📜 Derniers lancements</h2>

    <div v-if="launchesState.isLoading" class="text-center">
      <p class="animate-pulse text-gray-400">Chargement...</p>
    </div>
    <div v-else-if="launchesState.error" class="text-center text-red-400">
      <p>⚠️ {{ launchesState.error }}</p>
    </div>
    <div v-else-if="!filterLaunches || filterLaunches.length === 0" class="text-center text-gray-400">
         Aucun lancement disponible pour ce filtre.
    </div>
    <ul v-else class="space-y-4">
      <li v-for="(launch, index) in filterLaunches" :key="launch.id"
          class="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
          @click="toggleModal(index)">
          <div>
            <h3 v-if="launch?.name" class="text-lg font-bold">{{ launch.name }}</h3>
            <p v-if="launch?.date_utc" class="text-sm text-gray-300">
              📅 {{ new Date(launch.date_utc).toLocaleString('fr-FR') }}
            </p>
            <p v-else class="text-gray-400">Informations sur le lancement non disponibles</p>
          </div>

        <Teleport to="body">
          <LaunchModal 
            v-if="showModal.get(index)"
            :show="showModal.get(index)" 
            @update:show="toggleModal(index)"
            :launch="launch">
          </LaunchModal>
        </Teleport>
      </li>
    </ul>
  </section>
</template>
