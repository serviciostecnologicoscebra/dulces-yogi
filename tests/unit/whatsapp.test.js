import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/features/cart/utils/whatsapp";

const items = [{ id: "1", name: "Chocoteja clásica", priceInCents: 500, quantity: 2 }];

describe("WhatsApp", () => {
  it("genera el resumen y la URL codificada", () => {
    expect(buildWhatsAppMessage(items)).toContain("Total estimado: S/ 10.00");
    const url = buildWhatsAppUrl("+51 999 111 222", items);
    expect(url).toMatch(/^https:\/\/wa\.me\/51999111222\?text=/);
    expect(decodeURIComponent(url)).toContain("Chocoteja clásica");
  });
});
