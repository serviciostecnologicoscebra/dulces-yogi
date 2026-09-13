"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, ROUTES } from "@/constants/routes";
import { useCart } from "@/features/cart/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { units, dispatch } = useCart();

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="yogi-header sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 xl:px-12">
        <Link href={ROUTES.home} className="text-[1.3rem] font-extrabold tracking-[.28em]" aria-label="Yogi, inicio">YOGI</Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} className="hover-underline">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button className="relative grid h-11 w-11 place-items-center" onClick={() => dispatch({ type: "OPEN" })} aria-label={`Abrir carrito, ${units} unidades`}>
            <ShoppingBag size={21} strokeWidth={1.8} />
            <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--yogi-pink)] px-1 text-[11px] font-bold">{units}</span>
          </button>
          <Link href={ROUTES.contact} className="yogi-button hidden lg:inline-flex">Contáctanos</Link>
          <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="border-t border-black/10 bg-white px-5 py-5 lg:hidden" aria-label="Navegación móvil">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-black/10 py-3 text-base font-semibold">{item.label}</Link>)}
            <Link href={ROUTES.contact} onClick={() => setMenuOpen(false)} className="yogi-button mt-4 justify-center">Contáctanos</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
