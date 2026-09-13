const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yogi.pe";

export const SITE_CONFIG = Object.freeze({
  name: "Yogi",
  title: "Yogi | Dulces que se roban las miradas",
  description:
    "Dulces, regalos y pequeños momentos de alegría hechos para compartir en Piura.",
  url: configuredUrl,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+51 987 654 321",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@yogi.pe",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Piura, Perú",
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://maps.google.com/?q=Piura,Peru",
});

export const CATEGORIES = Object.freeze([
  "Caramelos",
  "Chocolates",
  "Paletas",
  "Bombones",
  "Helados",
  "Chocotejas",
  "Gomitas",
  "Regalos",
]);
