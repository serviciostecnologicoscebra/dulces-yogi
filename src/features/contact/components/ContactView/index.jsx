"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import ContactForm from "@/features/contact/components/ContactForm";

export default function ContactView() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] bg-[var(--yogi-lilac)] px-6 py-12 md:px-12 lg:py-16 xl:px-16"><p className="eyebrow">Estamos cerca</p><h1 className="display-title mt-5 max-w-4xl">Hablemos de algo dulce.</h1><p className="mt-3 max-w-2xl">Visítanos, escríbenos o llámanos. Estamos listos para convertir tu próxima idea en algo delicioso.</p><div className="mt-8 grid gap-5 lg:grid-cols-3"><Info icon={<MapPin />} label="Dirección" value={SITE_CONFIG.address} /><Info icon={<Mail />} label="Correo" value={SITE_CONFIG.email} href={`mailto:${SITE_CONFIG.email}`} /><Info icon={<Phone />} label="Teléfono" value={SITE_CONFIG.phone} href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} /></div></section>
      <section className="mx-auto grid max-w-[1440px] lg:grid-cols-2"><div className="contact-map flex min-h-[390px] flex-col justify-between bg-white p-6 md:p-10"><div><span className="grid h-14 w-14 place-items-center rounded-full bg-black text-white"><MapPin /></span><h2 className="mt-8 text-5xl font-black uppercase md:text-7xl">Piura</h2><p className="mt-3 max-w-md text-black/65">Encuéntranos en el corazón de la ciudad. La ubicación comercial definitiva se configura mediante variables de entorno.</p></div><a href={SITE_CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" className="yogi-button mt-8 w-fit">Abrir en Google Maps</a></div><div className="relative min-h-[390px]"><Image src="/images/brand/hero.webp" alt="Caja de regalo y dulces Yogi" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div></section>
      <section className="mx-auto max-w-[1440px]"><ContactForm /></section>
    </main>
  );
}

function Info({ icon, label, value, href }) {
  const content = <><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--yogi-pink)]">{icon}</span><span><strong className="block text-xs uppercase tracking-wider">{label}</strong><span>{value}</span></span></>;
  return href ? <a className="flex items-center gap-4 border-b border-black/20 pb-4" href={href}>{content}</a> : <div className="flex items-center gap-4 border-b border-black/20 pb-4">{content}</div>;
}
