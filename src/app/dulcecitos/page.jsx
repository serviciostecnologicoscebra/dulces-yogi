import { dehydrate, QueryClient } from "@tanstack/react-query";
import CatalogView from "@/features/products/components/CatalogView";
import { parseProductFilters } from "@/features/products/utils/filters";
import { productKeys } from "@/lib/query/keys";
import { getProducts } from "@/server/services/catalogService";
import HydratedQueryBoundary from "@/providers/HydratedQueryBoundary";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dulcecitos", description: "Descubre la colección de dulces Yogi y encuentra tu próximo antojo.", alternates: { canonical: "/dulcecitos" } };

export default async function ProductsPage({ searchParams }) {
  const values = await searchParams;
  const filters = parseProductFilters(values);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: productKeys.list(filters), queryFn: () => getProducts(filters) });
  return <HydratedQueryBoundary state={dehydrate(queryClient)}><CatalogView /></HydratedQueryBoundary>;
}
