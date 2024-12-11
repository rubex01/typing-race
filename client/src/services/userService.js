import apiClient from "@/clients/apiClient.js";
import {recreateSocket} from "@/services/socket.js";

export const registerUser = async (name, email, password) => {
  return await apiClient.post('/register', {
    name,
    email,
    password,
  });
}

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/login', {
    email,
    password,
  });
  const { token } = response.data;
  localStorage.setItem('authToken', token);
  recreateSocket();
  return response;
}

export const getUser = async () => {
  return await apiClient.get('/me');
}
