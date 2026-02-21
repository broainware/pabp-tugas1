'use client'; 
import React, { useState, useEffect } from 'react';
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

export default function SSGPage() {
  // 1. Integrasi Global State
  const { cartCount, cart, removeFromCart, totalPrice } = useCart(); 
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const buildDate = "21 FEBRUARI 2026";

  // Fetch data sekali saat mount (Simulasi SSG Behavior di Client)
  useEffect(() => {
    const getSSGData = async () => {
      const res = await fetch('https://dummyjson.com/products/category/mens-shirts?limit=9');
      const data = await res.json();
      setProducts(data.products);
    };
    getSSGData();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-[#d4c3a3] selection:text-[#3a0a0a] relative overflow-x-hidden bg-[#0a0101]">
      
      {/* 1. BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#4a0e0e]/20 blur-[180px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* 2. NAV */}
        <nav className="border-b border-white/5 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#0a0101]/90 backdrop-blur-xl z-50">
          <h1 className="text-2xl font-black tracking-tighter uppercase text-white">KZ CO.</h1>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/ssr" className="hover:text-white transition-colors">SSR</Link>
            <span className="text-[#d4c3a3] border-b border-[#d4c3a3] pb-1 cursor-default">SSG Edition</span>
            <Link href="/csr" className="hover:text-white transition-colors">CSR</Link>
          </div>
          <span className="text-[9px] font-mono text-[#d4c3a3] border border-[#d4c3a3]/30 px-4 py-2 rounded-full uppercase">
            ● STATIC BUILD: {buildDate}
          </span>
        </nav>

        {/* 3. HERO */}
        <section className="relative w-full h-[70vh] flex items-center px-12 md:px-24 overflow-hidden border-b border-white/5">
          <div className="z-20 max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-medium tracking-tighter text-white mb-6 leading-none">
              PURE <br /> <span className="italic font-serif text-[#d4c3a3]">STILLNESS.</span>
            </h2>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed font-light italic">
              "Koleksi arsip statis. Performa maksimal dengan data yang dibekukan saat waktu build."
            </p>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full z-10 hidden lg:block">
             <img 
               src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2000&auto=format&fit=crop" 
               alt="SSG" 
               className="w-full h-full object-cover grayscale brightness-50" 
             />
             <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0101]"></div>
          </div>
        </section>

        {/* 4. PRODUCT GRID */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-white/5 border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#d4c3a3]/30">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-50" 
                  />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[#d4c3a3] text-[10px] leading-relaxed uppercase tracking-widest mb-4">
                      {product.description}
                    </p>
                    <div className="w-full h-[1px] bg-[#d4c3a3]/30"></div>
                  </div>

                  <div className="absolute top-4 right-4 bg-[#d4c3a3] text-[#0a0101] px-2 py-1 text-[8px] font-bold uppercase tracking-tighter">
                    Static Archive
                  </div>
                </div>
                
                <div className="flex justify-between items-baseline px-1">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                    {product.title}
                  </h3>
                  <span className="text-[14px] font-serif italic text-[#d4c3a3]">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FLOATING CART TRIGGER */}
        <div className="fixed bottom-10 right-10 z-[100]">
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

        {/* 6. SIDEBAR DRAWER */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <div className="relative w-full max-w-md bg-[#0a0101] h-full shadow-2xl border-l border-white/10 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black text-white tracking-tighter italic uppercase">Archive Bag</h2>
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
                      <button 
                        onClick={() => removeFromCart(item.uniqueId)} 
                        className="text-red-500/50 hover:text-red-500 text-[9px] font-bold uppercase transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-8 border-t border-white/10 mt-auto">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-serif text-[#d4c3a3] italic">${totalPrice}</span>
                </div>
                <button className="w-full bg-[#d4c3a3] text-[#1a0202] py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. FOOTER */}
        <footer className="bg-black text-white py-20 px-12 border-t border-white/5 text-center">
            <h4 className="text-2xl font-black tracking-tighter uppercase mb-4">KZ CO.</h4>
            <p className="text-[8px] text-white/20 tracking-[1em] uppercase">SSG EDITION // 2026</p>
        </footer>
      </div>
    </main>
  );
}