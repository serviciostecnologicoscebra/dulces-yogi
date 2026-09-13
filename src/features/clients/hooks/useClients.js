"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/features/clients/api/clientsApi";
import { clientKeys } from "@/lib/query/keys";

export function useClients(filters = { page: 1, limit: 42 }) {
  return useQuery({
    queryKey: clientKeys.list(filters),
    queryFn: ({ signal }) => fetchClients(filters, signal),
    staleTime: 5 * 60_000,
    retry: 1,
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedClients() {
  return useClients({ page: 1, limit: 6, featured: true });
}
