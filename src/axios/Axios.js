import axios from "axios";

const conexionAxios = axios.create({
  baseURL: "https://planeador.onrender.com/api/",
});

conexionAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Reemplaza con tu token de autenticación válido

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default conexionAxios;
