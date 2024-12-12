import apiClient from "@/clients/apiClient.js";
import {recreateSocket} from "@/services/socket.js";
import {usePlayerStore} from "@/stores/player.js";
import {getAndStoreAverageWPM} from "@/services/resultService.js";
import {useGameStore} from "@/stores/game.js";
import {useResultStore} from "@/stores/result.js";
import {useLoadingStore} from "@/stores/loading.js";

export const registerUser = async (name, email, password) => {
  const response = await apiClient.post('/register', {
    name,
    email,
    password,
  });
  if (response.status !== 200) {
    return response;
  }

  await loginUser(email, password);
}

const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
  recreateSocket();
}

const getAndStoreCurrentUser = async () => {
  const response = await getUser();
  if (response.status !== 200) {
    return;
  }
  const playerStore = usePlayerStore();
  playerStore.setPlayer(response.data.name, response.data.email, response.data.id);
}

export const loginUser = async (email, password) => {
  const loadingStore = useLoadingStore();
  loadingStore.setLoading(true);

  const response = await apiClient.post('/login', {
    email,
    password,
  });
  if (response.status !== 200) {
    loadingStore.setLoading(false);
    return response;
  }
  const { token } = response.data;
  storeAuthToken(token);

  await getAndStoreCurrentUser();
  await getAndStoreAverageWPM();

  loadingStore.setLoading(false);
  return response;
}

export const getUser = async () => {
  return await apiClient.get('/me');
}

export const signOutUser = async () => {
  localStorage.removeItem('authToken');
  const playerStore = usePlayerStore();
  playerStore.clearPlayerState();
  const gameStore = useGameStore();
  gameStore.clearGameState();
  const resultStore = useResultStore();
  resultStore.clearResultState();
  recreateSocket();
}

export const checkIfLoggedIn = async () => {
  const loadingStore = useLoadingStore();
  loadingStore.setLoading(true);
  const token = localStorage.getItem('authToken');
  if (!token) {
    loadingStore.setLoading(false);
    return;
  }

  try {
    await getAndStoreCurrentUser();
    await getAndStoreAverageWPM();
  }
  catch {
    localStorage.removeItem('authToken');
    recreateSocket();
  }
  loadingStore.setLoading(false);
}
