export const DEFAULT_PRODUCT_FILTERS = Object.freeze({ page: 1, limit: 20, search: "", sort: "featured" });

export function parseProductFilters(searchParams) {
  const get = (key) => typeof searchParams.get === "function" ? searchParams.get(key) : searchParams[key];
  return {
    search: get("search") || "",
    category: get("category") || undefined,
    minPrice: get("minPrice") || undefined,
    maxPrice: get("maxPrice") || undefined,
    page: Number(get("page") || 1),
    limit: 20,
    sort: get("sort") || "featured",
  };
}

export function serializeProductFilters(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && !(key === "page" && Number(value) === 1) && key !== "limit") params.set(key, String(value));
  });
  return params.toString();
}
