import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return <main className="grid min-h-[65vh] place-items-center bg-[var(--yogi-lilac)] px-5 text-center"><div><p className="eyebrow">Error 404</p><h1 className="display-title mt-5">Este dulcecito no está aquí.</h1><p className="mt-4">Puede que haya cambiado de lugar o ya no esté disponible.</p><Link href={ROUTES.products} className="yogi-button mt-7 inline-flex">Volver a dulcecitos</Link></div></main>;
}
