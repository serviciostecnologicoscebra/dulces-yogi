"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/config/site";
import { useCart } from "@/features/cart/context/CartContext";
import { buildWhatsAppUrl } from "@/features/cart/utils/whatsapp";
import { formatPrice } from "@/utils/currency";

export default function CartDrawer() {
  const { state, subtotal, dispatch } = useCart();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!state.isOpen) return undefined;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && dispatch({ type: "CLOSE" });
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [state.isOpen, dispatch]);

  if (!state.isOpen) return <span className="sr-only" aria-live="polite">{state.announcement}</span>;
  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.whatsappNumber, state.items);

  return (
    <div className="cart-drawer fixed inset-0 z-50" role="presentation">
      <button className="absolute inset-0 bg-black/50" aria-label="Cerrar carrito" onClick={() => dispatch({ type: "CLOSE" })} />
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/15 px-5 py-5">
          <div><span className="text-xs font-bold uppercase tracking-[.14em]">Tu selección</span><h2 id="cart-title" className="text-2xl font-extrabold">Carrito Yogi</h2></div>
          <button ref={closeButtonRef} className="grid h-11 w-11 place-items-center border border-black" onClick={() => dispatch({ type: "CLOSE" })} aria-label="Cerrar carrito"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {!state.items.length ? (
            <div className="grid min-h-[55vh] place-items-center text-center"><div><ShoppingBag className="mx-auto mb-4" size={40} strokeWidth={1.2} /><p className="text-xl font-bold">Aún no elegiste dulcecitos.</p><Link href={ROUTES.products} onClick={() => dispatch({ type: "CLOSE" })} className="yogi-button mt-5 inline-flex">Ver dulcecitos</Link></div></div>
          ) : (
            <ul className="space-y-5">
              {state.items.map((item) => (
                <li key={item.id} className="grid grid-cols-[82px_1fr_auto] gap-3 border-b border-black/15 pb-5">
                  <div className="relative h-24 overflow-hidden bg-[var(--yogi-pink-soft)]"><Image src={item.image} alt="" fill className="object-cover" sizes="82px" /></div>
                  <div><h3 className="font-bold">{item.name}</h3><p className="text-sm text-black/60">{formatPrice(item.priceInCents)}</p><div className="mt-3 inline-flex items-center border border-black"><button className="h-9 w-9" onClick={() => dispatch({ type: "SET_QUANTITY", id: item.id, quantity: item.quantity - 1 })} aria-label={`Disminuir ${item.name}`}><Minus size={15} className="mx-auto" /></button><input className="h-9 w-10 border-x border-black text-center text-sm" value={item.quantity} onChange={(event) => dispatch({ type: "SET_QUANTITY", id: item.id, quantity: event.target.value })} aria-label={`Cantidad de ${item.name}`} /><button className="h-9 w-9" onClick={() => dispatch({ type: "SET_QUANTITY", id: item.id, quantity: item.quantity + 1 })} aria-label={`Aumentar ${item.name}`}><Plus size={15} className="mx-auto" /></button></div></div>
                  <div className="flex flex-col items-end justify-between"><strong>{formatPrice(item.priceInCents * item.quantity)}</strong><button onClick={() => dispatch({ type: "REMOVE", id: item.id })} aria-label={`Eliminar ${item.name}`}><Trash2 size={18} /></button></div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!!state.items.length && (
          <div className="border-t border-black/20 bg-[var(--yogi-blue-soft)] p-5">
            <div className="mb-2 flex justify-between text-xl font-extrabold"><span>Total estimado</span><span>{formatPrice(subtotal)}</span></div>
            <p className="mb-4 text-xs leading-relaxed text-black/65">El pedido aún no está confirmado y no incluye delivery. Yogi confirmará disponibilidad, entrega y forma de pago.</p>
            {whatsappUrl ? <a className="yogi-button flex w-full justify-center" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar pedido por WhatsApp</a> : <button disabled className="yogi-button w-full cursor-not-allowed justify-center opacity-45">Configura WhatsApp para continuar</button>}
            <button className="mt-3 w-full py-2 text-xs font-bold uppercase underline" onClick={() => window.confirm("¿Vaciar todo el carrito?") && dispatch({ type: "CLEAR" })}>Vaciar carrito</button>
          </div>
        )}
      </aside>
      <span className="sr-only" aria-live="polite">{state.announcement}</span>
    </div>
  );
}
