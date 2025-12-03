import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CART_STORAGE = "shopping_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE);
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      localStorage.removeItem(CART_STORAGE);
    } finally {
      setIsLoadingCart(false);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!isLoadingCart) localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
  }, [cart, isLoadingCart]);

  const addToCart = (item) => {
    let result = { success: false, message: "" };
    setCart((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.id === item.id);
      if (existingItem) {
        const currentQty = Number(existingItem.quantity || 0);
        const stock = Number(item.cantidad || 999);
        if (currentQty >= stock) {
          result = { success: false, message: "No hay más stock disponible" };
          return prevCart;
        }
        result = { success: true, message: "Producto agregado correctamente" };
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: currentQty + 1 } : ci
        );
      }
      result = { success: true, message: "Producto agregado correctamente" };
      return [...prevCart, { ...item, quantity: 1 }];
    });
    return result;
  };

  const removeFromCart = (itemId) => setCart((prev) => prev.filter((i) => i.id !== itemId));

  const updateQuantity = (itemId, newValue) => {
    setCart((prev) =>
      prev.map((item) => {
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
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
