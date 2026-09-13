"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer, getCartTotals, initialCartState } from "@/features/cart/utils/cartReducer";

const CartContext = createContext(null);
const STORAGE_KEY = "yogi-cart-v1";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    try {
      dispatch({ type: "HYDRATE", items: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") });
    } catch {
      dispatch({ type: "HYDRATE", items: [] });
    }
  }, []);

  useEffect(() => {
    if (state.hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.hydrated, state.items]);

  const value = useMemo(() => ({ state, dispatch, ...getCartTotals(state.items) }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
