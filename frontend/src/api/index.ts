import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const auth_token = localStorage.getItem("__auth_token__");
  const access_token = localStorage.getItem("__access_token__");

  if (!access_token || !auth_token) return config;

  config.headers.__auth_token__ = `Bearer ${auth_token}`;
  config.headers.__access_token__ = `Bearer ${access_token}`;

  return config;
});

export default API;
