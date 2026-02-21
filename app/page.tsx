export default function HomePage() {
  return (
    <main 
      className="min-h-screen bg-[#1a0a0a] text-[#f5f5f7] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/products/background-dashboard.jpeg')" }}
    >
      
      {/* 1. LAYER OVERLAY: Vignette & Blur Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/80 via-[#1a0a0a]/40 to-[#1a0a0a]/90 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>

      {/* 2. BOX UTAMA (Container) */}
      <div className="max-w-4xl w-full border border-[#d4c3a3]/10 backdrop-blur-xl p-12 md:p-24 rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.7)] flex flex-col items-center relative z-10 bg-black/40 animate-in fade-in zoom-in duration-1000">
        
        {/* Diamond Ornament */}
        <div className="w-10 h-10 border border-[#d4c3a3]/40 rotate-45 flex items-center justify-center mb-10 group transition-transform duration-1000 hover:rotate-[225deg]">
           <div className="w-2 h-2 bg-[#d4c3a3] animate-pulse"></div>
        </div>
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] tracking-[1em] text-[#d4c3a3]/60 uppercase mb-4 font-black">
            The Digital Atelier
          </span>

          <h1 className="text-7xl md:text-9xl font-serif italic font-medium text-white uppercase tracking-tighter drop-shadow-2xl">
            KZ <span className="text-[#d4c3a3] not-italic font-sans font-black">Co.</span>
          </h1>

          <div className="flex items-center gap-6 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4c3a3]/50"></div>
            <p className="text-[#d4c3a3] tracking-[0.6em] text-[9px] md:text-[11px] uppercase font-bold opacity-80">
              Roblox Premium Apparel 
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4c3a3]/50"></div>
          </div>
        </div>

        {/* 3. NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {['ssr', 'csr', 'ssg'].map((type) => (
            <a 
              key={type}
              href={`/${type}`} 
              className="group relative overflow-hidden px-8 py-10 border border-white/5 rounded-sm hover:border-[#d4c3a3]/50 transition-all duration-700 bg-[#1a0a0a]/40 backdrop-blur-md"
            >
              {/* Animated Background on Hover */}
              <div className="absolute inset-0 bg-[#d4c3a3] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[9px] font-black tracking-[0.4em] text-[#d4c3a3] group-hover:text-[#1a0a0a] uppercase transition-colors duration-500 mb-2">
                  Explore
                </span>
                <span className="text-[16px] font-serif italic text-white group-hover:text-[#1a0a0a] uppercase tracking-widest transition-colors duration-500">
                  {type} Mode
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 4. SUBTITLE FOOTER */}
        <div className="mt-20 flex flex-col items-center gap-4">
            <div className="h-10 w-[1px] bg-gradient-to-b from-[#d4c3a3] to-transparent"></div>
            <span className="text-[8px] uppercase tracking-[0.6em] font-medium text-[#d4c3a3]/40">Experimental Interface // 2026</span>
        </div>
      </div>
      
      {/* 5. PAGE FOOTER */}
      <footer className="absolute bottom-8 w-full px-12 flex justify-between items-center text-[#d4c3a3]/40 text-[9px] tracking-[0.3em] uppercase font-bold z-10">
        <span>KZ_CO_SYSTEM_v1.0</span>
        <span className="text-center">Built for PABP Assignment // brooainware</span>
        <span>TASIKMALAYA // ID</span>
      </footer>
    </main>
  );
}