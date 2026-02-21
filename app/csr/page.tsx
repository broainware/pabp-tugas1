'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
}

export default function CSRPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk kontrol Sidebar Keranjang
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ambil data dan fungsi dari Context (Termasuk cart dan removeFromCart)
  const { addToCart, cartCount, cart, removeFromCart, totalPrice } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category/mens-shirts?limit=9');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOrder = (product: Product) => {
    if (product.stock > 0) {
      addToCart({ id: product.id, title: product.title, price: product.price });
      
      // Update stok lokal agar UI sinkron
      setProducts(prev => 
        prev.map(item => item.id === product.id ? { ...item, stock: item.stock - 1 } : item)
      );
    }
  };

  return (
    <main className="min-h-screen font-sans selection:bg-[#d4c3a3] selection:text-[#3a0a0a] relative overflow-x-hidden bg-[#2a0505]">
      
      {/* 1. BACKGROUND DECORATION */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0202] via-[#3a0a0a] to-[#4a0e0e]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#800000]/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* 2. NAV */}
        <nav className="border-b border-white/5 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#1a0202]/40 backdrop-blur-2xl z-50">
          <div className="flex gap-8 items-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">KZ CO.</h1>
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/ssr" className="hover:text-white transition-colors">SSR</Link>
              <Link href="/ssg" className="hover:text-white transition-colors">SSG</Link>
              <span className="text-[#d4c3a3] border-b border-[#d4c3a3] pb-1">CSR Catalog</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#d4c3a3] bg-white/5 px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">
            ● LIVE {currentTime || '--:--:--'}
          </span>
        </nav>

        {/* 3. HERO SECTION */}
        <section className="relative w-full h-[85vh] flex items-center overflow-hidden border-b border-white/5">
          <div className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 items-center relative z-20">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#d4c3a3] mb-6 block">Seasonal Collection 2026</span>
              <h2 className="text-7xl md:text-9xl font-medium leading-[0.85] tracking-tighter mb-8 text-white">
                Velvet <br /> <span className="italic font-serif text-[#d4c3a3]">Modernity.</span>
              </h2>
              <p className="text-white/70 text-sm mb-12 max-w-sm leading-relaxed font-light italic">
                "Katalog interaktif yang dimuat di sisi klien untuk pengalaman belanja yang mulus."
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-full md:w-[58%] h-full grayscale brightness-75">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" alt="Model" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0202] via-[#1a0202]/40 to-transparent"></div>
          </div>
        </section>

        {/* 4. SHOP CONTENT */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          {isLoading ? (
            <div className="py-40 flex justify-center"><div className="w-10 h-10 border-2 border-[#d4c3a3]/20 border-t-[#d4c3a3] rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-white/5 border border-white/5">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <button 
                        onClick={() => handleOrder(product)}
                        disabled={product.stock === 0}
                        className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all
                          ${product.stock > 0 ? 'bg-[#d4c3a3] text-[#3a0a0a] hover:bg-white shadow-2xl' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                      >
                        {product.stock > 0 ? 'Add to Bag' : 'Sold Out'}
                      </button>
                    </div>
                    <div className="absolute top-6 left-6 bg-[#1a0202]/80 backdrop-blur-md px-4 py-1.5 text-[8px] font-black uppercase tracking-widest text-[#d4c3a3] border border-[#d4c3a3]/20">
                      STOCK: {product.stock}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-white">{product.title}</h3>
                    <span className="text-[16px] font-serif italic text-[#d4c3a3]">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. FLOATING CART (TRIGGER SIDEBAR) */}
        <div className="fixed bottom-10 right-10 z-[100] group">
          <div className="absolute -top-2 -right-2 bg-white text-[#1a0202] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 shadow-xl">
            {cartCount}
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#d4c3a3] text-[#1a0202] p-5 rounded-full shadow-2xl border border-white/20 hover:bg-white transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>

        {/* 6. SIDEBAR KERANJANG BELANJA */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full max-w-md bg-[#1a0202] h-full shadow-2xl border-l border-white/10 p-8 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black text-white tracking-tighter italic uppercase">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-[#d4c3a3] text-[10px] font-bold tracking-widest uppercase hover:text-white">
                   [ Close ]
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 text-center pt-20">Bag is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.uniqueId} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">{item.title}</h4>
                        <p className="text-[#d4c3a3] font-serif italic text-sm">${item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.uniqueId)} className="text-red-500/50 hover:text-red-500 text-[9px] font-bold uppercase transition-colors">
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-8 border-t border-white/10 mt-auto">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-serif text-[#d4c3a3] italic">${totalPrice}</span>
                </div>
                <button className="w-full bg-[#d4c3a3] text-[#3a0a0a] py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">
                  Process Order
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="bg-[#1a0202] text-white py-20 border-t border-white/5 text-center">
            <h4 className="text-2xl font-black tracking-tighter uppercase mb-4">KZ CO.</h4>
            <p className="text-[9px] font-bold text-white/20 tracking-[1em] uppercase">CSR EDITION // 2026</p>
        </footer>
      </div>
    </main>
  );
}