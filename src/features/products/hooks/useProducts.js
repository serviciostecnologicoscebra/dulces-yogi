"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "@/features/products/api/productsApi";
import { productKeys } from "@/lib/query/keys";

export function useProducts(filters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: ({ signal }) => fetchProducts(filters, signal),
    staleTime: 60_000,
    retry: 1,
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedProducts() {
  return useProducts({ page: 1, limit: 4, featured: true, sort: "featured" });
}

export function useProduct(slug) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: ({ signal }) => fetchProduct(slug, signal),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
