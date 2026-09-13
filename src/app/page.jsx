import { dehydrate, QueryClient } from "@tanstack/react-query";
import HomeView from "@/features/home/components/HomeView";
import { clientKeys, productKeys } from "@/lib/query/keys";
import HydratedQueryBoundary from "@/providers/HydratedQueryBoundary";
import { getClients, getProducts } from "@/server/services/catalogService";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const queryClient = new QueryClient();
  const productFilters = { page: 1, limit: 4, featured: true, sort: "featured" };
  const clientFilters = { page: 1, limit: 6, featured: true };
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: productKeys.list(productFilters), queryFn: () => getProducts(productFilters) }),
    queryClient.prefetchQuery({ queryKey: clientKeys.list(clientFilters), queryFn: () => getClients(clientFilters) }),
  ]);
  return <HydratedQueryBoundary state={dehydrate(queryClient)}><HomeView /></HydratedQueryBoundary>;
}
