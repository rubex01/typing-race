import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import {getUser, loginUser} from "@/services/userService.js";
import {useResultStore} from "@/stores/result.js";

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref(null)
  const playerId = ref(null)
  const playerEmail = ref(null)
  const remoteId = ref(null)

  const resultStore = useResultStore()

  const isReady = computed(
    () =>
      playerName.value !== null &&
      playerName.value !== '' &&
      playerId.value !== null,
  )

  const setPlayer = (name, email = null, id = null) => {
    playerName.value = name
    remoteId.value = id
    playerEmail.value = email
    playerId.value = uuidv4()
  }

  const getUserData = async () => {
    const response = await getUser();
    const data = response.data;
    setPlayer(data.name, data.email, data.id);
    await resultStore.loadAverageWPM();
  }

  const login = async (email, password) => {
    const loginResponse = await loginUser(email, password)
    if (loginResponse.status === 200) {
      await getUserData();
    }
    return loginResponse;
  }

  const signOut = () => {
    playerName.value = null
    playerId.value = null
    playerEmail.value = null
    remoteId.value = null
    localStorage.removeItem('authToken');
  }

  getUserData();

  return { setPlayer, isReady, playerId, playerName, login, signOut }
})
