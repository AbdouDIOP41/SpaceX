import { defineStore } from 'pinia';
import { ref, computed} from 'vue';
import { getFetchLaunches, getFetchNextLaunch } from './launchesApi';

export const useLaunchStore = defineStore('launchStore', () => {

    const launchesState = ref ({
        data : [] as any[],
        isLoading: false,
        error : null as string | null
    });

    const nextLaunchState = ref ({
        data : null as any | null,
        isLoading: false,
        error : null as string | null
    });

    const countdown = ref(0);
    const filterOptions = ref('all')


    async function fetchLaunches() {
        // Évite de refetch inutilement
        if (launchesState.value.data.length > 0) return;
        
        launchesState.value.isLoading = true;
        launchesState.value.error = null;

        try {
            launchesState.value.data = await getFetchLaunches();
        }
        catch (err) {
            launchesState.value.error = "Une erreur est survenue lors du chargement des lancements. Veuillez réessayer plus tard.";
        } finally {
            launchesState.value.isLoading = false;
        }
    }
  
    // Récupérer le prochain lancement
    async function fetchNextLaunch() {
        
        // Évite de refetch inutilement
        if (nextLaunchState.value.data) return; 

        nextLaunchState.value.isLoading = true;
        nextLaunchState.value.error = null;

        try {
            nextLaunchState.value.data = await getFetchNextLaunch();
        }
        catch (err) {
            nextLaunchState.value.error =  "Une erreur est survenue lors du chargement du prochain lancement. Veuillez réessayer plus tard.";
        }
        finally {
            nextLaunchState.value.isLoading = false;
        }
    }

    const updateCountdown = () => {
        if (!nextLaunchState.value.data || !nextLaunchState.value.data.date_utc) {
        countdown.value = 0;
        return;
        }
        const nextLaunchDate = new Date(nextLaunchState.value.data.date_utc).getTime();
        const now = Date.now();
        countdown.value = Math.max(Math.floor((nextLaunchDate - now) / 1000), 0);
    };

    const filterLaunches = computed(() => {
        console.log('filterLaunches', launchesState.value.data)
        if (!launchesState.value.data || launchesState.value.data.length === 0) return [];

        if (filterOptions.value === 'successful') {
            return launchesState.value.data.filter((launch) => launch.success === true).slice(-10);
        }
        else if (filterOptions.value === 'failed') {
            return launchesState.value.data.filter((launch) => launch.success === false).slice(-10);
        }
        else {
            return launchesState.value.data.slice(-10);
        }
    });

    //Options de filtrage
    const options = ref([
        { text: 'all', value: 'all' },
        { text: 'successful', value: 'successful' },
        { text: 'failed', value: 'failed' },
    ]);

    return {
        launchesState,
        nextLaunchState,
        fetchLaunches,
        fetchNextLaunch,
        updateCountdown,
        countdown,
        filterLaunches,
        filterOptions,
        options,
    };
});
