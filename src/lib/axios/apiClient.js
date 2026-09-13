import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const details = error.response?.data?.error?.details || [];
    const baseMessage = error.response?.data?.error?.message || "No pudimos conectar con Yogi. Inténtalo nuevamente.";
    const normalized = new Error(details[0]?.message ? `${baseMessage}: ${details[0].message}` : baseMessage);
    normalized.code = error.response?.data?.error?.code || "NETWORK_ERROR";
    normalized.details = details;
    return Promise.reject(normalized);
  }
);
