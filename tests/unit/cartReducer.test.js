import { describe, expect, it } from "vitest";
import { cartReducer, getCartTotals, initialCartState } from "@/features/cart/utils/cartReducer";

const product = { id: "1", name: "Ositos Rubí", priceInCents: 1800, available: true };

describe("cartReducer", () => {
  it("añade un producto y acumula la misma línea", () => {
    const once = cartReducer(initialCartState, { type: "ADD", product, quantity: 1 });
    const twice = cartReducer(once, { type: "ADD", product, quantity: 2 });
    expect(twice.items).toHaveLength(1);
    expect(twice.items[0].quantity).toBe(3);
  });

  it("modifica cantidades, elimina y calcula totales", () => {
    const added = cartReducer(initialCartState, { type: "ADD", product, quantity: 2 });
    const updated = cartReducer(added, { type: "SET_QUANTITY", id: "1", quantity: 3 });
    expect(getCartTotals(updated.items)).toEqual({ units: 3, subtotal: 5400 });
    expect(cartReducer(updated, { type: "REMOVE", id: "1" }).items).toEqual([]);
  });

  it("recupera un carrito persistido", () => {
    const state = cartReducer(initialCartState, { type: "HYDRATE", items: [{ ...product, quantity: 2 }] });
    expect(state.hydrated).toBe(true);
    expect(state.items[0].quantity).toBe(2);
  });
});
