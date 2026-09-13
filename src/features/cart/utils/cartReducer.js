export const initialCartState = { items: [], hydrated: false, isOpen: false, announcement: "" };

function clamp(quantity) {
  return Math.max(1, Math.min(99, Number(quantity) || 1));
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: Array.isArray(action.items) ? action.items : [], hydrated: true };
    case "ADD": {
      if (!action.product?.available) return state;
      const existing = state.items.find((item) => item.id === action.product.id);
      const quantity = clamp(action.quantity);
      const items = existing
        ? state.items.map((item) => item.id === action.product.id ? { ...item, quantity: clamp(item.quantity + quantity) } : item)
        : [...state.items, { ...action.product, quantity }];
      return { ...state, items, isOpen: true, announcement: `${action.product.name} se añadió al carrito` };
    }
    case "SET_QUANTITY":
      return { ...state, items: state.items.map((item) => item.id === action.id ? { ...item, quantity: clamp(action.quantity) } : item) };
    case "REMOVE":
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [], announcement: "El carrito está vacío" };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function getCartTotals(items) {
  return items.reduce(
    (totals, item) => ({
      units: totals.units + item.quantity,
      subtotal: totals.subtotal + item.priceInCents * item.quantity,
    }),
    { units: 0, subtotal: 0 }
  );
}
