import apiClient from "@/clients/apiClient.js";

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
  return response;
}

export const getUser = async () => {
  return await apiClient.get('/me');
}
