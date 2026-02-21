'use client';

import { useState, useEffect } from 'react';

export default function CSRPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // Data produk dalam State
  const [products, setProducts] = useState([
    { id: 1, name: "Retro Jersey MU", price: "10 ⏣", stock: 5, desc: "Jersey Retro Manchester United Vintage", image: "/products/jersey-mu.jpeg" },
    { id: 2, name: "Sand Camo Shirt", price: "7 ⏣", stock: 12, desc: "Stone Island Camo Overshirt", image: "/products/camo-shirt.jpeg" },
    { id: 3, name: "Blush Jacket", price: "8 ⏣", stock: 3, desc: "Stone Island Soft Shell Jacket", image: "/products/blush.png" },
    { id: 4, name: "Frost Jacket", price: "10 ⏣", stock: 17, desc: "Stone Island Silver Reflective", image: "/products/frost.jpeg" },
    { id: 5, name: "Fredperry Long Sleeve", price: "12 ⏣", stock: 20, desc: "Fredperry T-shirt Long Sleeve Y2K", image: "/products/fredperry.png" },
    { id: 6, name: "Engineering Workshirt", price: "8 ⏣", stock: 4, desc: "Black Heavy Duty Workshirt", image: "/products/workshirt.png" },
  ]);

  // Fungsi Kurangi Stok
  const handleOrder = (id: number) => {
    setProducts(prev => 
      prev.map(item => 
        item.id === id && item.stock > 0 ? { ...item, stock: item.stock - 1 } : item
      )
    );
  };

  useEffect(() => {
    setMounted(true);
    // Jalankan jam real-time
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Biar nggak error saat loading pertama
  if (!mounted) return <div className="min-h-screen bg-[#1a0a0a]" />;

  return (
    <main className="min-h-screen bg-[#1a0a0a] text-[#f5f5f7] selection:bg-[#d4c3a3]/30">
      
      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full overflow-hidden border-b border-[#d4c3a3]/10">
        <img src="/hero.png" alt="Hero" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] via-transparent to-black/20"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
           {/* HEADER AREA */}
           <div className="flex justify-between w-full max-w-6xl absolute top-8 px-8">
              <a href="/" className="text-white text-[10px] hover:text-[#d4c3a3] transition-colors tracking-widest uppercase font-bold drop-shadow-md">← Dashboard</a>
              
              {/* LIVE TIME BOX */}
              <div className="bg-black/40 border border-[#d4c3a3]/30 px-4 py-1.5 rounded-sm backdrop-blur-sm shadow-lg">
                <span className="text-[9px] font-mono text-[#d4c3a3] tracking-tighter uppercase font-bold">
                  ● Client Live: {currentTime}
                </span>
              </div>
           </div>
           
           <h1 className="text-4xl md:text-6xl font-serif italic text-white uppercase tracking-[0.2em] text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-700">
             CSR CATALOG
           </h1>
           <div className="h-[2px] w-20 bg-[#d4c3a3] mt-6 shadow-lg"></div>
           <p className="text-white text-[10px] font-bold uppercase tracking-[0.6em] mt-6 text-center drop-shadow-md">
             Interactive Inventory System
           </p>
        </div>
      </div>

      {/* PRODUCT GRID SECTION */}
      <div className="max-w-6xl mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group relative transition-all duration-500 hover:-translate-y-3">
              <div className="relative bg-[#d4c3a3] p-3 rounded-sm shadow-xl">
                <div className="aspect-square overflow-hidden bg-black/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 border-b border-[#1a0a0a]/10 pb-4">
                    <h3 className="text-sm font-black uppercase text-[#1a0a0a]">{product.name}</h3>
                    <span className="text-xs font-serif text-[#4a1a1a] font-bold italic">{product.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-[#1a0a0a]/50 uppercase font-bold tracking-widest">Stock Status</span>
                      <span className={`text-[10px] font-serif font-bold uppercase ${product.stock === 0 ? 'text-red-600 animate-pulse' : 'text-[#4a1a1a]'}`}>
                        {product.stock > 0 ? `${product.stock} Units Left` : 'Sold Out'}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleOrder(product.id)}
                      disabled={product.stock === 0}
                      className={`px-6 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300
                        ${product.stock > 0 
                          ? 'bg-[#1a0a0a] text-[#d4c3a3] hover:bg-[#4a1a1a] active:scale-90 shadow-md' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                    >
                      {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}