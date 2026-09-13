"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/features/cart/context/CartContext";

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <div className="inline-flex h-12 w-fit items-center border border-black"><button className="h-full w-12" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Disminuir cantidad"><Minus className="mx-auto" size={17} /></button><input className="h-full w-14 border-x border-black text-center" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))} aria-label="Cantidad" /><button className="h-full w-12" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Aumentar cantidad"><Plus className="mx-auto" size={17} /></button></div>
      <button className="yogi-button flex min-h-12 flex-1 justify-center gap-2 disabled:opacity-40" disabled={!product.available} onClick={() => dispatch({ type: "ADD", product, quantity })}><ShoppingBag size={18} />{product.available ? "Añadir al carrito" : "No disponible"}</button>
    </div>
  );
}
