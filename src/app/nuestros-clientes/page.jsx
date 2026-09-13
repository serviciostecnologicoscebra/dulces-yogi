import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientsView from "@/features/clients/components/ClientsView";
import { clientKeys } from "@/lib/query/keys";
import { getClients } from "@/server/services/catalogService";
import HydratedQueryBoundary from "@/providers/HydratedQueryBoundary";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nuestros clientes", description: "Conoce las historias y testimonios de quienes eligieron Yogi.", alternates: { canonical: "/nuestros-clientes" } };

export default async function ClientsPage() {
  const filters = { page: 1, limit: 42 };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: clientKeys.list(filters), queryFn: () => getClients(filters) });
  return <HydratedQueryBoundary state={dehydrate(queryClient)}><ClientsView /></HydratedQueryBoundary>;
}
