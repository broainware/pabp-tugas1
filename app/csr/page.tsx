'use client';

import { useState, useEffect } from 'react';

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

  const handleOrder = (id: number) => {
    setProducts(prev => 
      prev.map(item => 
        item.id === id && item.stock > 0 ? { ...item, stock: item.stock - 1 } : item
      )
    );
  };

  return (
    <main className="min-h-screen font-sans selection:bg-[#d4c3a3] selection:text-[#3a0a0a] relative overflow-x-hidden bg-[#2a0505]">
      
      {/* 1. MONOCHROMATIC MAROON GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Gradient: Deep Maroon to Lighter Maroon */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0202] via-[#3a0a0a] to-[#4a0e0e]"></div>
        
    
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#800000]/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-[#5a0c0c]/30 blur-[120px] rounded-full"></div>

        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      </div>

      <div className="relative z-10">
        <nav className="border-b border-white/5 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#1a0202]/40 backdrop-blur-2xl z-50">
          <div className="flex gap-8 items-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">KZ CO.</h1>
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/ssr" className="hover:text-white transition-colors">SSR</a>
              <a href="/ssg" className="hover:text-white transition-colors">SSG</a>
              <span className="text-[#d4c3a3] border-b border-[#d4c3a3] pb-1">CSR Catalog</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
               <span className="text-[10px] font-mono text-[#d4c3a3] bg-white/5 px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">
                  ● LIVE {currentTime || '--:--:--'}
               </span>
          </div>
        </nav>

        {/* 3. HERO MODEL */}
        <section className="relative w-full h-[85vh] flex items-center overflow-hidden border-b border-white/5">
          <div className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 items-center relative z-20">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#d4c3a3] mb-6 block drop-shadow-lg">
                Seasonal Collection 2026
              </span>
              <h2 className="text-7xl md:text-9xl font-medium leading-[0.85] tracking-tighter mb-8 text-white">
                Velvet <br /> <span className="italic font-serif text-[#d4c3a3]">Modernity.</span>
              </h2>
              <p className="text-white/70 text-sm mb-12 max-w-sm leading-relaxed font-light">
                Where the richness of deep wine shades meets the clarity of modern design. Curated for the digital elite.
              </p>
              <button className="bg-[#d4c3a3] text-[#3a0a0a] px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">
                Discover Boutique
              </button>
            </div>
          </div>

         
          <div className="absolute right-0 top-0 w-full md:w-[58%] h-full">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
              alt="Model" 
              className="w-full h-full object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0202] via-[#1a0202]/40 to-transparent md:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a0505] via-transparent to-transparent"></div>
          </div>
        </section>

        {/* 4. SHOP CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="text-left">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d4c3a3] mb-2">Shop Now</h3>
                <h2 className="text-5xl font-medium tracking-tighter text-white">Product Gallery</h2>
            </div>
            <div className="h-[1px] flex-1 bg-white/10 mx-8 hidden md:block"></div>
            <p className="text-[#d4c3a3] text-[10px] uppercase font-bold tracking-[0.2em] bg-white/5 px-6 py-2 border border-white/10 rounded-full">
                {products.length} EXCLUSIVE PIECES
            </p>
          </div>

          {/* 5. PRODUCT GRID */}
          {isLoading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-2 border-[#d4c3a3]/20 border-t-[#d4c3a3] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  {/* Card Container with subtle glass effect */}
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-700 group-hover:border-[#d4c3a3]/30">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                    />
                    
                    {/* Hover purchase button */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <button 
                        onClick={(e) => { e.preventDefault(); handleOrder(product.id); }}
                        disabled={product.stock === 0}
                        className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all
                          ${product.stock > 0 
                            ? 'bg-[#d4c3a3] text-[#3a0a0a] hover:bg-white shadow-2xl' 
                            : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'}`}
                      >
                        {product.stock > 0 ? 'Buy Piece' : 'Sold Out'}
                      </button>
                    </div>

                    {/* Stock counter */}
                    <div className="absolute top-6 left-6 bg-[#1a0202]/80 backdrop-blur-md px-4 py-1.5 text-[8px] font-black uppercase tracking-widest text-[#d4c3a3] border border-[#d4c3a3]/20">
                       ONLY {product.stock} LEFT
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[14px] font-bold uppercase tracking-widest text-white leading-tight">
                        {product.title}
                      </h3>
                      <span className="text-[16px] font-serif italic text-[#d4c3a3]">${product.price}</span>
                    </div>
                    <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 italic font-light">
                        {product.description}
                    </p>
                    <div className="flex gap-2 pt-4">
                        <div className="w-3 h-3 rounded-full bg-[#d4c3a3] ring-2 ring-offset-2 ring-offset-[#2a0505] ring-[#d4c3a3]/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/10 border border-white/10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. FOOTER */}
        <footer className="bg-[#1a0202] text-white pt-32 pb-16 px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h4 className="text-4xl font-black tracking-tighter uppercase mb-8">KZ CO.</h4>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-16">
                <span className="hover:text-[#d4c3a3] cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-[#d4c3a3] cursor-pointer transition-colors">TikTok</span>
                <span className="hover:text-[#d4c3a3] cursor-pointer transition-colors">Newsletter</span>
            </div>
            <p className="text-[9px] font-bold text-white/20 tracking-[1em] uppercase">
                EST 2026 // PREMIUM DIGITAL ATTIRE
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}