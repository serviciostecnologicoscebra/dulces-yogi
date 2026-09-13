"use client";

import Image from "next/image";
import { useClients } from "@/features/clients/hooks/useClients";

const colors = ["var(--yogi-lilac)", "var(--yogi-pink-soft)", "var(--yogi-blue-soft)", "var(--yogi-pink)"];

export default function ClientsView() {
  const query = useClients({ page: 1, limit: 42 });
  const clients = query.data?.data || [];
  return (
    <main>
      <section className="clients-hero mx-auto grid max-w-[1440px] lg:grid-cols-[.8fr_1.2fr]">
        <div className="flex flex-col justify-center bg-[var(--yogi-lilac)] px-6 py-10 md:px-12 lg:min-h-[430px]"><p className="eyebrow">Comunidad Yogi</p><h1 className="display-title mt-5">42 historias que hacen nuestra vida más dulce.</h1><p className="mt-4 max-w-xl">Cada pedido termina en una mesa, un regalo o un momento que alguien recordará. Ellos son parte de la historia de Yogi.</p><div className="mt-7 grid grid-cols-2 border border-black text-center"><span className="p-4"><strong className="block text-3xl">42</strong><small className="font-bold uppercase">Clientes</small></span><span className="border-l border-black p-4"><strong className="block text-3xl">42</strong><small className="font-bold uppercase">Momentos inolvidables</small></span></div></div>
        <div className="relative min-h-[360px]"><Image src="/images/brand/hero.webp" alt="Dulces de Yogi preparados para regalar" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" /></div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 xl:px-12">
        <p className="eyebrow">Sus palabras</p><h2 className="section-title mt-3">Lo que dicen de Yogi.</h2>
        {query.isError ? <div className="mt-8 border border-black p-8 text-center"><p>{query.error.message}</p><button onClick={() => query.refetch()} className="mt-3 font-bold underline">Reintentar</button></div> : query.isLoading ? <div className="mt-7 grid gap-3 md:grid-cols-2">{Array.from({ length: 12 }, (_, index) => <div key={index} className="h-20 animate-pulse bg-black/10" />)}</div> : clients.length ? <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{clients.map((client, index) => <article key={client.id} className="client-quote grid grid-cols-[44px_1fr] items-center border border-black p-3" style={{ background: colors[index % colors.length] }}><span className="text-xs font-extrabold">{String(index + 1).padStart(2, "0")}</span><div className="grid grid-cols-[36px_1fr] items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-black/10 text-xs font-extrabold">{client.name.split(" ").map((part) => part[0]).join("")}</span><div><h3 className="text-sm font-bold">{client.name}</h3><p className="text-sm leading-snug">“{client.testimonial}”</p></div></div></article>)}</div> : <p className="mt-8 bg-[var(--yogi-blue-soft)] p-8 text-center">Aún no hay testimonios publicados.</p>}
        <p className="mt-10 text-center">Gracias por convertir cada dulce en una historia que vale la pena contar.</p>
      </section>
    </main>
  );
}
