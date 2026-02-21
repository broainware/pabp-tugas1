'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Tipe data untuk item di keranjang
interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};