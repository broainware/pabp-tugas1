'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  uniqueId: number; // Untuk membedakan barang yang sama yang dibeli berkali-kali
  title: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'uniqueId'>) => void;
  removeFromCart: (uniqueId: number) => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'uniqueId'>) => {
    setCart((prev) => [...prev, { ...item, uniqueId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (uniqueId: number) => {
    setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount: cart.length, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};