// app/ssr/page.tsx

export default async function SSRPage() {
  // Simulasi data dari server
  // Di SSR, data ini "dimasak" setiap kali halaman di-refresh
  const serverTime = new Date().toLocaleTimeString('id-ID');
  
  const products = [
    { 
      id: 1, 
      name: "Retro Jersey MU", 
      price: "10 ⏣", 
      stock: 5, 
      desc: "Jersey Retro Manchester United Vintage" 
    },
    { 
      id: 2, 
      name: "Sand Camo Shirt",
      price: "7 ⏣", 
      stock: 12, 
      desc: "t-shirt stone island" 
    },
    { 
      id: 3, 
      name: "Blush Jacket", 
      price: "8 ⏣", 
      stock: 3, 
      desc: "Stone Island Jacket" 
    },
    { 
      id: 4, 
      name: "Frost Jacket", 
      price: "10 ⏣", 
      stock: 17, 
      desc: "Stone Island (silver jacket)" 
    },
    { 
      id: 5, 
      name: "Fredperry long sleeve",
      price: "12 ⏣", 
      stock: 20,
      desc: "Fredperry t-shirt long sleeve y2k" 
    },
    { 
      id: 6, 
      name: " Engineering Workshirt", 
      price: "8 ⏣", 
      stock: 4, 
      desc: "Black workshirt"
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigasi & Info Server */}
        <div className="flex justify-between items-center mb-12">
          <a href="/" className="text-gray-500 text-xs hover:text-blue-400 transition-colors tracking-[0.2em] uppercase font-bold">
            ← Dashboard
          </a>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">
              Server Time: {serverTime}
            </span>
          </div>
        </div>
        
        {/* Header Section */}
        <header className="mb-16 relative">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <h1 className="text-6xl font-black italic bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter">
            SSR Catalog
          </h1>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
            Server-Side Rendering // Authenticated Data
          </p>
        </header>

        {/* Product List */}
        <div className="grid gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="relative group p-[1px] rounded-[32px] bg-gradient-to-b from-blue-900/40 to-transparent hover:from-blue-500 transition-all duration-500"
            >
              <div className="bg-[#0c0c0c]/90 backdrop-blur-xl p-8 rounded-[31px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                      In Stock: {product.stock}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-light italic">
                    "{product.desc}"
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                  <span className="text-3xl font-black text-white tracking-tighter italic">
                    {product.price}
                  </span>
                  <button className="w-full px-6 py-3 bg-white text-black text-[10px] font-black uppercase rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <footer className="mt-24 text-center border-t border-white/5 pt-8">
          <p className="text-[9px] tracking-[1em] uppercase font-bold text-gray-600">
            KZ CO. PREMIUM APPAREL // 2026
          </p>
        </footer>
      </div>
    </main>
  );
}