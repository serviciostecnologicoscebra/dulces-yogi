"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/utils/currency";

export default function ProductCard({ product, index = 0, compact = false }) {
  const { dispatch } = useCart();
  return (
    <article className={`product-card ${compact ? "product-card--compact" : ""} group border border-black/20 bg-white`}>
      <Link href={`${ROUTES.products}/${product.slug}`} className="product-card__image relative block overflow-hidden bg-[var(--yogi-pink-soft)]" aria-label={`Ver ${product.name}`}>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 600px) 36vw, (max-width: 1024px) 44vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 text-xs font-extrabold tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        {!product.available && <span className="absolute right-3 top-3 bg-black px-2 py-1 text-[11px] font-bold uppercase text-white">Agotado</span>}
      </Link>
      <div className="product-card__body flex flex-1 flex-col p-3">
        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-black/55">{product.category}</span>
        <Link href={`${ROUTES.products}/${product.slug}`} className="mt-1 font-bold leading-tight">{product.name}</Link>
        <p className="mt-1 text-xs leading-relaxed text-black/65">{product.shortDescription}</p>
        <strong className="mt-2 text-lg">{formatPrice(product.priceInCents)}</strong>
        <button
          type="button"
          className="mt-3 flex min-h-10 items-center justify-center gap-2 border border-black bg-black px-3 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-black/50"
          onClick={() => dispatch({ type: "ADD", product, quantity: 1 })}
          disabled={!product.available}
        >
          <ShoppingBag size={15} /> {product.available ? "Añadir al carrito" : "No disponible"}
        </button>
      </div>
    </article>
  );
}
