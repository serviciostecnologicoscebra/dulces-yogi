import { z } from "zod";
import { CATEGORIES } from "@/config/site";

const optionalMoney = z.preprocess(
  (value) => (value === "" || value == null ? undefined : value),
  z.coerce.number().min(0).max(10000).optional()
);

export const productFiltersSchema = z.object({
  search: z.string().trim().max(80).default(""),
  category: z.enum(CATEGORIES).optional(),
  minPrice: optionalMoney,
  maxPrice: optionalMoney,
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  featured: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional()
  ),
  sort: z.enum(["featured", "name-asc", "name-desc", "price-asc", "price-desc"]).default("featured"),
});

export const clientFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(42),
  featured: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional()
  ),
});

export const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Ingresa tu nombre").max(60),
  lastName: z.string().trim().min(2, "Ingresa tus apellidos").max(80),
  email: z.string().trim().email("Ingresa un correo válido").max(120),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{7,18}$/, "Ingresa un número válido"),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "Debes aceptar ser contactado" }) }),
});
