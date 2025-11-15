import axios from "axios";

export const Api=axios.create({
    baseURL:`${import.meta.env.VITE_BACK_END_URL}/api`,
     withCredentials: true,
}

)
Api.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem("auth"));

  if (authData?.token) {
    config.headers.Authorization = `Bearer ${authData.token}`;
  }

  return config;
});