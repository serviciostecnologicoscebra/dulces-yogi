import { apiClient } from "@/lib/axios/apiClient";

export async function fetchClients(filters, signal) {
  const { data } = await apiClient.get("/clients", { params: filters, signal });
  return data;
}
