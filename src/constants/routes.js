export const ROUTES = Object.freeze({
  home: "/",
  products: "/dulcecitos",
  clients: "/nuestros-clientes",
  about: "/quienes-somos",
  contact: "/contacto",
});

export const NAV_ITEMS = Object.freeze([
  { href: ROUTES.home, label: "Inicio" },
  { href: ROUTES.products, label: "Dulcecitos" },
  { href: ROUTES.clients, label: "Nuestros clientes" },
  { href: ROUTES.about, label: "¿Quiénes somos?" },
]);
