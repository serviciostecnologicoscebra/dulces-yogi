import { formatPrice } from "@/utils/currency";

export function buildWhatsAppMessage(items) {
  const lines = ["Hola, Yogi. Quiero consultar por este pedido:", ""];
  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name}`,
      `Cantidad: ${item.quantity}`,
      `Precio: ${formatPrice(item.priceInCents)}`,
      `Subtotal: ${formatPrice(item.priceInCents * item.quantity)}`,
      ""
    );
  });
  const total = items.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0);
  lines.push(
    `Total estimado: ${formatPrice(total)}`,
    "",
    "¿Podrían confirmarme disponibilidad, costo de envío y forma de pago?"
  );
  return lines.join("\n");
}

export function buildWhatsAppUrl(number, items) {
  if (!number || !items.length) return "";
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(buildWhatsAppMessage(items))}`;
}
