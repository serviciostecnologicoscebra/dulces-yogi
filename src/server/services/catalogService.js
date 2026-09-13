import { clientFiltersSchema, productFiltersSchema } from "@/server/validators/schemas";
import { findClients, findProductBySlug, findProducts, findRelatedProducts } from "@/server/repositories/catalogRepository";

export async function getProducts(input = {}) {
  const filters = productFiltersSchema.parse(input);
  const result = await findProducts(filters);
  return {
    data: result.data,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      totalItems: result.totalItems,
      totalPages: Math.max(1, Math.ceil(result.totalItems / filters.limit)),
    },
  };
}

export async function getProduct(slug) {
  const product = await findProductBySlug(slug);
  if (!product) return null;
  return { ...product, related: await findRelatedProducts(product) };
}

export async function getClients(input = {}) {
  const filters = clientFiltersSchema.parse(input);
  const result = await findClients(filters);
  return {
    data: result.data,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      totalItems: result.totalItems,
      totalPages: Math.max(1, Math.ceil(result.totalItems / filters.limit)),
    },
  };
}
