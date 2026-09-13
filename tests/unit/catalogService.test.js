import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/repositories/catalogRepository", () => ({
  findProducts: vi.fn(), findProductBySlug: vi.fn(), findRelatedProducts: vi.fn(), findClients: vi.fn(),
}));

import { findClients, findProductBySlug, findProducts } from "@/server/repositories/catalogRepository";
import { getClients, getProduct, getProducts } from "@/server/services/catalogService";

describe("catalogService", () => {
  beforeEach(() => vi.clearAllMocks());
  it("devuelve productos paginados", async () => {
    findProducts.mockResolvedValue({ data: [{ id: "1" }], totalItems: 24 });
    const result = await getProducts({ page: 2, limit: 20 });
    expect(result.pagination).toMatchObject({ page: 2, totalItems: 24, totalPages: 2 });
  });
  it("devuelve clientes activos", async () => {
    findClients.mockResolvedValue({ data: [{ id: "c1" }], totalItems: 42 });
    expect((await getClients({ page: 1, limit: 42 })).pagination.totalItems).toBe(42);
  });
  it("devuelve null para un producto inexistente", async () => {
    findProductBySlug.mockResolvedValue(null);
    expect(await getProduct("no-existe")).toBeNull();
  });
});
