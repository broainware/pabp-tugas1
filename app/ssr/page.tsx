'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Import context global

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
}

export default function SSRPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [serverTime, setServerTime] = useState<string>('');
  const { cartCount } = useCart(); // Ambil jumlah keranjang global

  useEffect(() => {
    // Simulasi SSR di Client: Fetch data tanpa cache
    const fetchSSRData = async () => {
      const res = await fetch(
        'https://dummyjson.com/products/category/mens-shirts?limit=9', 
        { cache: 'no-store' } // Menjaga perilaku SSR (Data selalu baru)
      );
      const data = await res.json();
      setProducts(data.products);
      setServerTime(new Date().toLocaleTimeString('id-ID'));
    };

    fetchSSRData();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-[#d4c3a3] selection:text-[#3a0a0a] relative overflow-x-hidden bg-[#2a0505]">
      
      {/* 1. BACKGROUND GRADIENT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0202] via-[#3a0a0a] to-[#4a0e0e]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#800000]/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* 2. TOP NAV */}
        <nav className="border-b border-white/5 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#1a0202]/60 backdrop-blur-2xl z-50">
          <div className="flex gap-8 items-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">KZ CO.</h1>
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-[#d4c3a3] border-b border-[#d4c3a3] pb-1 cursor-default">SSR Edition</span>
              <Link href="/ssg" className="hover:text-white transition-colors">SSG</Link>
              <Link href="/csr" className="hover:text-white transition-colors">CSR</Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
               <span className="text-[9px] font-mono text-[#d4c3a3] bg-white/5 px-4 py-2 rounded-full border border-white/10 tracking-[0.2em] uppercase">
                  ● RENDER TIME: {serverTime || 'LOADING...'}
               </span>
          </div>
        </nav>

        {/* 3. HERO SECTION */}
        <section className="relative w-full h-[75vh] flex items-center justify-center text-center overflow-hidden">
          <div className="z-20 max-w-4xl px-8 drop-shadow-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#d4c3a3] mb-8 block opacity-100">
              Server-Side Rendering
            </span>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-8 leading-none">
              The <span className="italic font-serif text-[#d4c3a3]">Classic</span> <br /> Heritage.
            </h2>
            <div className="w-20 h-[1px] bg-[#d4c3a3] mx-auto mb-8"></div>
          </div>

          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
               alt="Model SSR" 
               className="w-full h-full object-cover opacity-60 brightness-75" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-[#1a0202]/90 via-transparent to-[#2a0505]"></div>
          </div>
        </section>

        {/* 4. PRODUCT GRID */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-white/5 border border-white/5 backdrop-blur-sm shadow-2xl">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-6 right-6 bg-[#d4c3a3] text-[#3a0a0a] px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      SSR Data
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-white">{product.title}</h3>
                    <span className="text-[16px] font-serif italic text-[#d4c3a3]">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FLOATING CART (Sinkronisasi Global State) */}
        <div className="fixed bottom-10 right-10 z-[100]">
          <div className="absolute -top-2 -right-2 bg-white text-[#1a0202] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 shadow-xl">
            {cartCount}
          </div>
          <button className="bg-[#d4c3a3] text-[#1a0202] p-5 rounded-full shadow-2xl border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>

        <footer className="bg-[#1a0202] text-white py-16 text-center border-t border-white/5">
            <h4 className="text-3xl font-black tracking-tighter uppercase mb-6">KZ CO.</h4>
            <p className="text-[9px] font-bold text-white/20 tracking-[1em] uppercase">
                SSR EDITION // 2026
            </p>
        </footer>
      </div>
    </main>
  );
}