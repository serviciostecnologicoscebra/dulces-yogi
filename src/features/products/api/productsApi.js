import { apiClient } from "@/lib/axios/apiClient";

export async function fetchProducts(filters, signal) {
  const { data } = await apiClient.get("/products", { params: filters, signal });
  return data;
}

export async function fetchProduct(slug, signal) {
  const { data } = await apiClient.get(`/products/${slug}`, { signal });
  return data.data;
}
