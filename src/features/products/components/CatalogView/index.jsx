"use client";

import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/config/site";
import ProductCard from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";
import { parseProductFilters, serializeProductFilters } from "@/features/products/utils/filters";

export default function CatalogView() {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseProductFilters(searchParams), [searchParams]);
  return <CatalogContents key={searchParams.toString()} filters={filters} />;
}

function CatalogContents({ filters }) {
  const router = useRouter();
  const [search, setSearch] = useState(filters.search);
  const [draft, setDraft] = useState(filters);
  const query = useProducts(filters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== filters.search) router.replace(`/dulcecitos?${serializeProductFilters({ ...filters, search, page: 1 })}`, { scroll: false });
    }, 350);
    return () => clearTimeout(timeout);
  }, [search, filters, router]);

  const apply = (event) => {
    event.preventDefault();
    router.push(`/dulcecitos?${serializeProductFilters({ ...draft, search, page: 1 })}`);
  };
  const reset = () => router.push("/dulcecitos");
  const pageTo = (page) => router.push(`/dulcecitos?${serializeProductFilters({ ...filters, page })}`);
  const data = query.data?.data || [];
  const pagination = query.data?.pagination;

  return (
    <main>
      <section className="catalog-hero mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-[var(--yogi-lilac)] px-6 py-10 md:px-12 lg:min-h-[340px]"><p className="eyebrow">Colección Yogi</p><h1 className="display-title mt-5 max-w-xl">Elige tu próximo antojo.</h1><p className="mt-3 max-w-lg">Dulces elegidos para regalar, compartir o disfrutar sin excusas.</p></div>
        <div className="relative min-h-[300px]"><Image src="/images/brand/hero.webp" alt="Selección de dulces rojos y caja de regalo" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-8 xl:px-12">
        <form onSubmit={apply} className="catalog-filters border border-black p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:items-end">
            <label className="grid gap-2 text-xs font-bold">Nombre<div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} /><input className="yogi-input pl-10" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar dulce" /></div></label>
            <label className="grid gap-2 text-xs font-bold">Tipo de producto<select className="yogi-input" value={draft.category || ""} onChange={(event) => setDraft({ ...draft, category: event.target.value || undefined })}><option value="">Todos</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="grid gap-2 text-xs font-bold">Precio mínimo<input className="yogi-input" type="number" min="0" placeholder="S/ 0" value={draft.minPrice || ""} onChange={(event) => setDraft({ ...draft, minPrice: event.target.value })} /></label>
            <label className="grid gap-2 text-xs font-bold">Precio máximo<input className="yogi-input" type="number" min="0" placeholder="S/ 50" value={draft.maxPrice || ""} onChange={(event) => setDraft({ ...draft, maxPrice: event.target.value })} /></label>
            <button className="yogi-button flex justify-center gap-2"><SlidersHorizontal size={16} />Aplicar</button>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-black/15 pt-4 sm:flex-row sm:items-center sm:justify-between"><label className="flex items-center gap-3 text-xs font-bold">Ordenar por<select className="border border-black bg-white px-3 py-2" value={draft.sort} onChange={(event) => setDraft({ ...draft, sort: event.target.value })}><option value="featured">Destacados</option><option value="name-asc">Nombre A–Z</option><option value="name-desc">Nombre Z–A</option><option value="price-asc">Precio menor</option><option value="price-desc">Precio mayor</option></select></label><button type="button" onClick={reset} className="text-xs font-bold uppercase underline underline-offset-4">Limpiar filtros</button></div>
        </form>
        <div className="mt-8 flex items-end justify-between"><div><p className="eyebrow">La colección</p><h2 className="mt-2 text-2xl font-extrabold uppercase">{pagination?.totalItems || 0} productos</h2></div>{query.isFetching && <span className="text-xs font-bold uppercase" role="status">Actualizando…</span>}</div>
        {query.isError ? <div className="mt-8 border border-black p-8 text-center"><p>{query.error.message}</p><button className="mt-3 font-bold underline" onClick={() => query.refetch()}>Reintentar</button></div> : query.isLoading ? <ProductSkeletons /> : data.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.map((product, index) => <ProductCard key={product.id} product={product} index={index + ((filters.page - 1) * 20)} />)}</div> : <div className="mt-8 bg-[var(--yogi-blue-soft)] p-10 text-center"><h3 className="text-xl font-bold">No encontramos dulcecitos.</h3><p className="mt-2">Prueba con otros filtros.</p><button onClick={reset} className="mt-4 font-bold underline">Ver todos</button></div>}
        {pagination && pagination.totalPages > 1 && <nav className="mt-10 flex justify-center gap-2" aria-label="Paginación">{Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => pageTo(page)} className={`grid h-10 w-10 place-items-center border border-black ${page === filters.page ? "bg-black text-white" : "bg-white"}`} aria-current={page === filters.page ? "page" : undefined}>{page}</button>)}</nav>}
      </section>
    </main>
  );
}

function ProductSkeletons() {
  return <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Cargando productos">{Array.from({ length: 8 }, (_, index) => <div key={index} className="h-[390px] animate-pulse bg-black/10" />)}</div>;
}
