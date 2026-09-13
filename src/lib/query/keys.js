export const productKeys = Object.freeze({
  all: ["products"],
  list: (filters) => ["products", "list", filters],
  detail: (slug) => ["products", "detail", slug],
});

export const clientKeys = Object.freeze({
  all: ["clients"],
  list: (filters) => ["clients", "list", filters],
});
