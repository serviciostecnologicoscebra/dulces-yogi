import Image from "next/image";

const team = [
  { name: "Imanol Mena", role: "Fundador", initials: "IM", color: "var(--yogi-lilac)" },
  { name: "María López", role: "Preparación de dulces", initials: "ML", color: "var(--yogi-pink-soft)" },
  { name: "Juan Hernández", role: "Atención del negocio", initials: "JH", color: "var(--yogi-blue-soft)" },
  { name: "Enrique Luján", role: "Inversor", initials: "EL", color: "var(--yogi-pink)" },
];

export default function AboutView() {
  return (
    <main>
      <section className="about-hero mx-auto grid max-w-[1440px] lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-center bg-[var(--yogi-lilac)] px-6 py-10 md:px-12 lg:min-h-[500px]"><p className="eyebrow">Nuestra historia</p><h1 className="display-title mt-5">Nacimos para hacer de cada antojo algo extraordinario.</h1><p className="mt-5 max-w-xl leading-relaxed">Yogi es una dulcería contemporánea creada en 2024 para transformar tus dulces favoritos en pequeños objetos de deseo. Seleccionamos sabores, colores y texturas que se disfrutan desde la primera mirada.</p><div className="mt-8 grid grid-cols-2 border border-black text-center text-xs font-bold uppercase"><span className="p-4">Fundada en 2024</span><span className="border-l border-black p-4">Dulces, regalos y experiencias</span></div></div>
        <div className="relative min-h-[390px]"><Image src="/images/brand/hero.webp" alt="Selección Yogi de dulces y caja rosa" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" /></div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 lg:py-20">
        <div className="flex items-end justify-between gap-5"><div><p className="eyebrow">El equipo</p><h2 className="section-title mt-3">Las personas detrás de Yogi.</h2></div><span className="hidden h-px flex-1 bg-black/25 md:block" /></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{team.map((member) => <article key={member.name} className="team-card border border-black"><div className="team-card__portrait grid aspect-[4/3] place-items-center" style={{ background: member.color }}><span className="text-6xl font-black tracking-tight text-black/70">{member.initials}</span></div><div className="p-4 text-center"><h3 className="font-bold">{member.name}</h3><p className="text-sm">{member.role}</p></div></article>)}</div>
        <p className="mt-8 text-center text-sm">Cuatro miradas, una misma obsesión: hacer que cada detalle se sienta especial.</p>
      </section>
    </main>
  );
}
