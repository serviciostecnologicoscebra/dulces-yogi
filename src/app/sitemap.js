import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/config/site";
import { PRODUCT_SEEDS } from "@/server/data/products";

export default function sitemap() {
  const now = new Date();
  const pages = Object.values(ROUTES).map((route) => ({ url: `${SITE_CONFIG.url}${route}`, lastModified: now, changeFrequency: route === "/dulcecitos" ? "weekly" : "monthly", priority: route === "/" ? 1 : 0.8 }));
  return [...pages, ...PRODUCT_SEEDS.map((product) => ({ url: `${SITE_CONFIG.url}/dulcecitos/${product.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }))];
}
