import { ref, computed } from 'vue';
import axios from 'axios';

export const useLaunches = () => {
  const launches = ref<any[]>([]);
  const nextLaunch = ref<any>(null);
  const countdown = ref(0);
  const filter = ref('all');
  //const showModal = ref<boolean[]>([]);

  const isLoading = ref(true);

  const fetchLaunches = async () => {
    try {
      isLoading.value = true;

      const response = await axios.get('https://api.spacexdata.com/v5/launches');
      launches.value = response.data;
      // S'assurer que showModal est un tableau de la bonne taille
      //showModal.value = new Array(response.data.length).fill(false);

    }
    catch (error) {
      console.error('❌ Erreur lors du chargement des lancements:', error);
    }
    finally {
      isLoading.value = false;
    }
  };

  const fetchNextLaunch = async () => {
    try {
      const resp = await axios.get('https://api.spacexdata.com/v5/launches/next');
      console.log("next", resp.data);
      nextLaunch.value = resp.data; // Le prochain lancement

    } catch (error) {
      console.error('Erreur lors de la récupération des lancements:', error);
    }
  };



  const updateCountdown = () => {
    if (!nextLaunch.value || !nextLaunch.value.date_utc) {
        countdown.value = 0;
        return;
    }

    const nextLaunchDate = new Date(nextLaunch.value.date_utc).getTime();
    const now = Date.now();
    
    countdown.value = Math.max(Math.floor((nextLaunchDate - now) / 1000), 0);
};

  const options = ref([
    { text: 'all', value: 'all' },
    { text: 'successful', value: 'successful' },
    { text: 'failed', value: 'failed' },
  ])

  const filterLaunches = computed(() => {
    if (!launches.value || launches.value.length === 0) return [];

    if (filter.value === 'successful') {
      return launches.value.filter((launch: any) => launch.success === true).slice(-10);
    } else if (filter.value === 'failed') {
      return launches.value.filter((launch: any) => launch.success === false).slice(-10);
    } else {
      return launches.value.slice(-10);
    }
  });

  return {
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
  };
};
