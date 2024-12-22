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

  if (!localStorage.getItem("user")) return config;

  const user = JSON.parse(localStorage.getItem("user")!);

  const auth_token = user.authToken;
  const access_token = user.accessToken;

  if (!access_token || !auth_token) return config;

  config.headers.__auth_token__ = `Bearer ${auth_token}`;
  config.headers.__access_token__ = `Bearer ${access_token}`;

  return config;
});

export default API;
