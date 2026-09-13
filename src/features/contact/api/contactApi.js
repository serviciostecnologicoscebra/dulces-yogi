import { apiClient } from "@/lib/axios/apiClient";

export async function createContactRequest(payload) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}
