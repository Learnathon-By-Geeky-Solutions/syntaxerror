import React, { createContext, useContext, useEffect, useState } from 'react';
import { TProductCart } from '../types/types';

interface CartContextType {
  items: TProductCart[];
  addItem: (item: TProductCart) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TProductCart[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const saveToLocalStorage = (cartItems: TProductCart[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    setItems(cartItems);
  };

  const addItem = (item: TProductCart) => {
    const existingItem = items.find((i) => i.productId === item.productId);
    if (existingItem) {
      const updatedItems = items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      saveToLocalStorage(updatedItems);
    } else {
      saveToLocalStorage([...items, item]);
    }
  };

  const removeItem = (productId: string) => {
    const updatedItems = items.filter((item) => item.productId !== productId);
    saveToLocalStorage(updatedItems);
  };

  const clearCart = () => {
    saveToLocalStorage([]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedItems = items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    saveToLocalStorage(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}