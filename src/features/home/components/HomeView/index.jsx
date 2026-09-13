"use client";

import Image from "next/image";
import Link from "next/link";
import { Gem, Heart, Leaf } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useFeaturedClients } from "@/features/clients/hooks/useClients";
import { useFeaturedProducts } from "@/features/products/hooks/useProducts";
import ProductCard from "@/features/products/components/ProductCard";

export default function HomeView() {
  const productsQuery = useFeaturedProducts();
  const clientsQuery = useFeaturedClients();
  const products = productsQuery.data?.data || [];
  const clients = clientsQuery.data?.data || [];

  return (
    <main>
      <section className="home-hero mx-auto grid max-w-[1440px] lg:grid-cols-2" aria-labelledby="home-title">
        <div className="home-hero__copy flex flex-col justify-center bg-[var(--yogi-lilac)] px-6 py-12 md:px-12 lg:min-h-[570px] xl:px-16">
          <p className="eyebrow">Colección 01</p>
          <h1 id="home-title" className="display-title mt-6 max-w-[720px]">El lado más dulce de tu estilo.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed">Pequeños objetos de deseo hechos para regalar, compartir o quedártelos todos.</p>
          <Link href={ROUTES.products} className="yogi-button mt-7 w-fit">Descubrir dulcecitos</Link>
        </div>
        <div className="relative min-h-[390px] lg:min-h-[570px]"><Image src="/images/brand/hero.webp" alt="Copa de cristal con dulces rojos junto a una caja de regalo rosa" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 lg:py-24 xl:px-12">
        <h2 className="section-title text-center">Dulcecitos que se roban las miradas.</h2>
        {productsQuery.isError ? <StateMessage message="No pudimos cargar los dulcecitos." onRetry={() => productsQuery.refetch()} /> : (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
          </div>
        )}
        <div className="mt-8 text-center"><Link href={ROUTES.products} className="yogi-button yogi-button--outline">Ver dulcecitos</Link></div>
      </section>

      <section className="mx-auto grid max-w-[1440px] bg-black text-white lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
          <span className="mb-5 block h-px w-14 bg-white" />
          <h2 className="section-title max-w-xl">Endulzamos los momentos que sí importan.</h2>
          <p className="mt-4 max-w-lg text-white/75">Cada pedido se crea como una pequeña colección hecha a medida.</p>
          <Link href={ROUTES.clients} className="yogi-button yogi-button--light mt-7 w-fit">Conoce a nuestros clientes</Link>
          <div className="mt-8 grid gap-2 sm:grid-cols-3">
            {clients.slice(0, 3).map((client) => <blockquote key={client.id} className="border border-white/25 p-3 text-xs leading-relaxed">“{client.testimonial}”<footer className="mt-2 font-bold text-white">{client.name}</footer></blockquote>)}
          </div>
        </div>
        <div className="relative min-h-[420px]"><Image src="/images/brand/story.webp" alt="Caja de regalo rosa, dulces y macarons en una composición editorial" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>

      <section className="mx-auto grid max-w-[1440px] bg-[var(--yogi-blue-soft)] lg:grid-cols-[.8fr_1.2fr]">
        <div className="relative min-h-[350px]"><Image src="/images/products/marshmallows.webp" alt="Nubes de vainilla rosadas y blancas" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
          <span className="mb-5 block h-px w-14 bg-black" />
          <h2 className="section-title max-w-2xl">Diseñamos pequeños momentos de alegría.</h2>
          <p className="mt-4 max-w-xl">Yogi nació de una idea sencilla: lo delicioso también puede verse extraordinario.</p>
          <div className="mt-9 grid grid-cols-3 divide-x divide-black/25 text-center text-xs font-bold uppercase tracking-wider">
            <span className="grid gap-2"><Leaf className="mx-auto" />Sabores</span><span className="grid gap-2"><Gem className="mx-auto" />Detalles</span><span className="grid gap-2"><Heart className="mx-auto" />Corazón</span>
          </div>
          <Link href={ROUTES.about} className="mt-8 w-fit text-sm font-bold uppercase underline underline-offset-8">Conoce nuestra historia</Link>
        </div>
      </section>

      <section className="home-cta mx-auto flex max-w-[1440px] flex-col items-center bg-[var(--yogi-pink-soft)] px-6 py-16 text-center md:py-24">
        <h2 className="section-title max-w-3xl">Hagamos algo deliciosamente inolvidable.</h2>
        <Link href={ROUTES.contact} className="yogi-button mt-7 rounded-full px-10">Contáctanos</Link>
      </section>
    </main>
  );
}

function StateMessage({ message, onRetry }) {
  return <div className="my-10 border border-black p-6 text-center"><p>{message}</p><button onClick={onRetry} className="mt-3 font-bold underline">Reintentar</button></div>;
}
