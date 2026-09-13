import { describe, expect, it } from "vitest";
import { parseProductFilters, serializeProductFilters } from "@/features/products/utils/filters";

describe("filtros del catálogo", () => {
  it("serializa y recupera filtros compartibles", () => {
    const query = serializeProductFilters({ search: "rosa", category: "Paletas", minPrice: 10, page: 2, limit: 20, sort: "price-asc" });
    const filters = parseProductFilters(new URLSearchParams(query));
    expect(filters).toMatchObject({ search: "rosa", category: "Paletas", minPrice: "10", page: 2, sort: "price-asc" });
  });
});
