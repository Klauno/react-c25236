import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CART_STORAGE = "shopping_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem(CART_STORAGE);
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (!isLoadingCart) localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
  }, [cart, isLoadingCart]);

  /**
   * addToCart:
   * - recibe un objeto item que incluye `cantidad` (stock)
   * - devuelve { success: boolean, message: string }
   *
   * Importante: no hace toasts aquí para evitar duplicados; el componente llamante
   * decide si notificar al usuario.
   */
  const addToCart = (item) => {
    let result = { success: false, message: "" };

    setCart((prevCart) => {
      // buscar existente
      const existingItem = prevCart.find((ci) => ci.id === item.id);

      if (existingItem) {
        const currentQty = Number(existingItem.quantity || 0);
        const stock = Number(item.cantidad || 999);

        if (currentQty >= stock) {
          result = { success: false, message: "No hay más stock disponible para este producto" };
          return prevCart;
        }

        result = { success: true, message: "Producto agregado correctamente" };

        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: currentQty + 1 } : ci
        );
      }

      // si no existía
      result = { success: true, message: "Producto agregado correctamente" };
      return [...prevCart, { ...item, quantity: 1 }];
    });

    // IMPORTANTE: como setCart es asíncrono, devolvemos el resultado calculado arriba
    return result;
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((it) => it.id !== itemId));
  };

  /**
   * updateQuantity:
   * - newValue puede venir como número (cantidad deseada)
   * - se limita entre 1 y stock (item.cantidad)
   * - si newValue < 1, no lo convierte en 0: la eliminación debe ser confirmada por el UI
   */
  const updateQuantity = (itemId, newValue) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== itemId) return item;

        const parsed = parseInt(newValue, 10);
        let qty = Number.isNaN(parsed) ? item.quantity : parsed;
        qty = Math.max(1, qty);
        qty = Math.min(qty, item.cantidad || 999);
        return { ...item, quantity: qty };
      })
    );
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

  const getItemQuantity = (itemId) => {
    const it = cart.find((i) => i.id === itemId);
    return it ? it.quantity : 0;
  };

  const clearCart = () => {
    localStorage.removeItem(CART_STORAGE);
    setCart([]);
  };

  const totalItems = () => cart.reduce((count, item) => count + Number(item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoadingCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        getItemQuantity,
        clearCart,
        totalItems,
        setCart, // expuesto por si necesitas sincronizar desde admin
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
