import React from 'react';
import Link from 'next/link';


interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
}

async function getSSRData() {
  const res = await fetch(
    'https://dummyjson.com/products/category/mens-shirts?limit=9', 
    { cache: 'no-store' } 
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  return data.products as Product[];
}

export default async function SSRPage() {
  const products = await getSSRData();
  const serverTime = new Date().toLocaleTimeString('id-ID');

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
                  ● SERVER TIME: {serverTime}
               </span>
          </div>
        </nav>

        {/* 3. HERO SECTION - Opacity Enhanced */}
        <section className="relative w-full h-[75vh] flex items-center justify-center text-center overflow-hidden">
          <div className="z-20 max-w-4xl px-8 drop-shadow-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#d4c3a3] mb-8 block opacity-100">
              Server-Side Exclusive
            </span>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-8 leading-none">
              The <span className="italic font-serif text-[#d4c3a3]">Classic</span> <br /> Heritage.
            </h2>
            <div className="w-20 h-[1px] bg-[#d4c3a3] mx-auto mb-8"></div>
            <p className="text-white text-sm max-w-lg mx-auto leading-relaxed font-light italic bg-[#1a0202]/40 backdrop-blur-sm p-4 rounded-sm">
              "Data rendered instantly at the edge. Speed meets sophisticated style in our SSR collection."
            </p>
          </div>

          {/* Model Background - Opacity increased to 60% for better visibility */}
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
          <div className="flex items-center gap-6 mb-20">
             <h2 className="text-4xl font-medium tracking-tighter text-white whitespace-nowrap">SSR Collection</h2>
             <div className="h-[1px] w-full bg-white/10"></div>
          </div>

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
                     SSR Rendered
                  </div>

                  {/* Fungsionalitas Link ke Detail Produk */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <Link href={`/products/${product.id}`} className="block w-full text-center py-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#d4c3a3] text-[#3a0a0a] hover:bg-white transition-all">
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-white">{product.title}</h3>
                    <span className="text-[16px] font-serif italic text-[#d4c3a3]">${product.price}</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5"></div>
                  <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 uppercase tracking-tighter">
                      {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FOOTER */}
        <footer className="bg-[#1a0202] text-white pt-32 pb-16 px-12 border-t border-white/5 text-center">
            <h4 className="text-3xl font-black tracking-tighter uppercase mb-6">KZ CO.</h4>
            <p className="text-[9px] font-bold text-white/20 tracking-[1em] uppercase mb-12">
                SSR EDITION // SERVER SIDE RENDERING
            </p>
        </footer>
      </div>
    </main>
  );
}