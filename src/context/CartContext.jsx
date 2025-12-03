import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CART_STORAGE = "shopping_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem(CART_STORAGE);
      }
    }
    setIsLoadingCart(false);
  }, []);

  useEffect(() => {
    if (!isLoadingCart) {
      localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
    }
  }, [cart, isLoadingCart]);

  const addToCart = (item) => {
    return new Promise((resolve) => {
      setCart((prevCart) => {
        const existing = prevCart.find((ci) => ci.id === item.id);
        
        // 🔥 BLOQUEA cuando quantity >= stock original
        if (existing && existing.quantity >= item.cantidad) {
          resolve({ success: false, message: "❌ No hay más stock disponible" });
          return prevCart;
        }

        if (existing) {
          const newCart = prevCart.map((ci) =>
            ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
          );
          resolve({ success: true, message: "✅ Producto actualizado" });
          return newCart;
        }

        resolve({ success: true, message: "✅ Producto agregado" });
        return [...prevCart, { ...item, quantity: 1 }];
      });
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((it) => it.id !== itemId));
  };

  const updateQuantity = (itemId, newQty) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        let qty = parseInt(newQty, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > item.cantidad) qty = item.cantidad;
        return { ...item, quantity: qty };
      })
    );
  };

  const clearCart = () => {
    localStorage.removeItem(CART_STORAGE);
    setCart([]);
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const totalItems = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  // 🔥 Stock restante: original - carrito
  const getStockRemaining = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.cantidad - item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cart, isLoadingCart, addToCart, removeFromCart, updateQuantity,
      clearCart, calculateTotal, totalItems, getStockRemaining
    }}>
      {children}
    </CartContext.Provider>
  );
};
