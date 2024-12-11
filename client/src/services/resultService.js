import apiClient from "@/clients/apiClient.js";

export const getAverageWPM = async () => {
  return await apiClient.get('/results/average');
}
