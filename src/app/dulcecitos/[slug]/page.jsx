import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JsonLd from "@/components/common/JsonLd";
import { ROUTES } from "@/constants/routes";
import AddToCart from "@/features/cart/components/AddToCart";
import ProductCard from "@/features/products/components/ProductCard";
import { getProduct } from "@/server/services/catalogService";
import { formatPrice } from "@/utils/currency";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `${ROUTES.products}/${product.slug}` },
    openGraph: { title: `${product.name} | Yogi`, description: product.shortDescription, images: [{ url: product.image, alt: product.imageAlt }] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const url = `${SITE_CONFIG.url}${ROUTES.products}/${product.slug}`;
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-9 md:px-8 lg:py-14 xl:px-12">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.name, image: `${SITE_CONFIG.url}${product.image}`, description: product.longDescription, sku: product.id, category: product.category, offers: { "@type": "Offer", url, priceCurrency: "PEN", price: (product.priceInCents / 100).toFixed(2), availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: SITE_CONFIG.url }, { "@type": "ListItem", position: 2, name: "Dulcecitos", item: `${SITE_CONFIG.url}${ROUTES.products}` }, { "@type": "ListItem", position: 3, name: product.name, item: url }] }} />
      <Breadcrumbs items={[{ label: "Inicio", href: ROUTES.home }, { label: "Dulcecitos", href: ROUTES.products }, { label: product.name }]} />
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative min-h-[430px] overflow-hidden bg-[var(--yogi-pink-soft)] md:min-h-[620px]"><Image src={product.image} alt={product.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
        <div className="flex flex-col justify-center"><p className="eyebrow">{product.category}</p><h1 className="display-title mt-5">{product.name}</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-black/70">{product.longDescription}</p><strong className="mt-7 text-4xl font-black">{formatPrice(product.priceInCents)}</strong><p className={`mt-3 text-sm font-bold uppercase ${product.available ? "text-emerald-800" : "text-red-800"}`}>{product.available ? "Disponible" : "No disponible por ahora"}</p><AddToCart product={product} /><p className="mt-4 text-xs text-black/55">La compra se coordina por WhatsApp. El total final y delivery se confirman antes de realizar el pedido.</p></div>
      </section>
      {!!product.related.length && <section className="py-16 lg:py-24"><p className="eyebrow">También te pueden gustar</p><h2 className="section-title mt-3">Dulcecitos relacionados.</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{product.related.map((item, index) => <ProductCard key={item.id} product={item} index={index} compact />)}</div></section>}
    </main>
  );
}
