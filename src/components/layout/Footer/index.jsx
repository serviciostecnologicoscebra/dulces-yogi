"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { NAV_ITEMS } from "@/constants/routes";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:px-8 xl:px-12">
        <span className="text-xl font-extrabold tracking-[.3em]">YOGI</span>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/75" aria-label="Enlaces del pie de página">
          {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-5 text-xs text-white/70"><span className="text-base font-black">◎</span><span>Endulza un mejor mañana.</span><Heart size={18} /></div>
      </div>
    </footer>
  );
}
