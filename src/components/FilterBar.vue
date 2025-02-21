<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLaunchStore } from '../launches-data/launchStore';

const launchStore = useLaunchStore();
const { filterOptions, options } = storeToRefs(launchStore);
</script>

<template>
  <section class="mb-6">
    <label for="filter" class="block text-lg font-semibold mb-2">📌 Filtrer les lancements :</label>
    <select id="filter" v-model="filterOptions" class="w-full p-2 rounded bg-gray-700 text-white">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </section>
</template>
