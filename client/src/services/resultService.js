import apiClient from "@/clients/apiClient.js";
import {useResultStore} from "@/stores/result.js";

export const getAverageWPM = async () => {
  return await apiClient.get('/results/average');
}

export const getAndStoreAverageWPM = async () => {
  const response = await getAverageWPM();
  if (response.status !== 200) {
    return;
  }

  const resultStore = useResultStore();
  resultStore.setAverageWPM(response.data.average);
}
