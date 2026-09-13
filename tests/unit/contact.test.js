import { describe, expect, it } from "vitest";
import { contactSchema } from "@/server/validators/schemas";

describe("formulario de contacto", () => {
  it("valida una solicitud correcta", () => {
    const result = contactSchema.safeParse({ firstName: "Ana", lastName: "Ruiz", email: "ana@example.com", phone: "+51 999 999 999", message: "Quiero una caja para el sábado", consent: true });
    expect(result.success).toBe(true);
  });

  it("rechaza datos incompletos", () => {
    expect(contactSchema.safeParse({ firstName: "A", email: "no" }).success).toBe(false);
  });
});
