const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
});

export function formatPrice(priceInCents = 0) {
  return formatter.format(priceInCents / 100).replace("PEN", "S/").replace(/\s+/g, " ");
}
