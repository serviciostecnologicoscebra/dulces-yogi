"use client";

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function HydratedQueryBoundary({ state, children }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } } }));
  return <QueryClientProvider client={queryClient}><HydrationBoundary state={state}>{children}</HydrationBoundary></QueryClientProvider>;
}
