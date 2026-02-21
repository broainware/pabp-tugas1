export default function HomePage() {
  return (
    <main 
      className="min-h-screen bg-[#1a0a0a] text-[#f5f5f7] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/products/background-dashboard.jpeg')" }}
    >
      
      {/* Overlay Gelap Latar Belakang  */}
      <div className="absolute inset-0 bg-[#1a0a0a]/50 backdrop-blur-[1px]"></div>

      {/* BOX UTAMA (Container) - Transparan & Glassmorphism */}
      <div className="max-w-4xl w-full border border-[#d4c3a3]/20 backdrop-blur-md p-12 md:p-20 rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col items-center relative z-10 bg-transparent">
        
        {/* Header Section dengan Animasi Typing */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-[1px] w-12 bg-[#d4c3a3] mb-6 opacity-50"></div>
          
          {/* BOX ANIMASI TYPING */}
          <div className="overflow-hidden whitespace-nowrap border-r-4 border-[#d4c3a3] animate-typing w-fit mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif italic font-black text-[#f5f5dc] uppercase tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              KZ <span className="text-[#d4c3a3]">Co.</span>
            </h1>
          </div>

          <p className="mt-6 text-[#d4c3a3] tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold drop-shadow-md text-center opacity-80">
            Premium Roblox Apparel 
          </p>
        </div>

        {/* Garis Pembatas Gradasi */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4c3a3]/30 to-transparent mb-16"></div>
        
        {/* Tombol Navigasi Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['ssr', 'csr', 'ssg'].map((type) => (
            <a 
              key={type}
              href={`/${type}`} 
              className="group relative overflow-hidden px-8 py-6 border border-[#d4c3a3]/30 rounded-sm hover:border-[#d4c3a3] transition-all duration-500 text-center bg-black/20 backdrop-blur-sm"
            >
              {/* Hover Effect Fill Layer */}
              <div className="absolute inset-0 bg-[#d4c3a3] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
              
              <span className="relative z-10 text-[10px] font-black tracking-[0.3em] text-[#d4c3a3] group-hover:text-[#1a0a0a] uppercase transition-colors duration-500">
                {type} Catalog
              </span>
            </a>
          ))}
        </div>

     
        <div className="mt-16 flex items-center gap-4 opacity-50">
           <div className="h-[1px] w-8 bg-[#d4c3a3]"></div>
           <span className="text-[8px] uppercase tracking-[0.4em] font-medium text-[#d4c3a3] drop-shadow-md">Experimental Projects</span>
           <div className="h-[1px] w-8 bg-[#d4c3a3]"></div>
        </div>
      </div>
      
      {/* FOOTER */}
      <footer className="absolute bottom-8 text-[#d4c3a3]/60 text-[9px] tracking-[0.5em] uppercase font-light text-center z-10 drop-shadow-md">
        Built for PABP Assignment // Project by brooainware
      </footer>
    </main>
  );
}