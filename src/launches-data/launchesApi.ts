import axios from "axios";

// Récupère la liste de tous les lancements
export async function getFetchLaunches() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v5/launches");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors du chargement des lancements");
  }
}

// Récupère le prochain lancement
export async function getFetchNextLaunch() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v5/launches/next");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors du chargement du prochain lancement");
  }
}
