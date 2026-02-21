export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-5">
      {/* Header KZ Co. */}
      <h1 className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 italic uppercase">
        KZ Co.
      </h1>
      <p className="mt-2 text-gray-500 tracking-[0.3em] text-xs uppercase font-light">
        Premium Roblox Apparel 
      </p>
      
      {/* Tombol Navigasi Rendering */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <a href="/ssr" className="group px-8 py-3 border border-blue-900 rounded-full hover:bg-blue-600 transition-all duration-300">
          <span className="text-sm font-bold tracking-widest text-blue-200 group-hover:text-white text-center">SSR CATALOG</span>
        </a>
        <a href="/csr" className="group px-8 py-3 border border-blue-900 rounded-full hover:bg-blue-600 transition-all duration-300">
          <span className="text-sm font-bold tracking-widest text-blue-200 group-hover:text-white text-center">CSR CATALOG</span>
        </a>
        <a href="/ssg" className="group px-8 py-3 border border-blue-900 rounded-full hover:bg-blue-600 transition-all duration-300">
          <span className="text-sm font-bold tracking-widest text-blue-200 group-hover:text-white text-center">SSG CATALOG</span>
        </a>
      </div>
      
      <footer className="absolute bottom-8 text-gray-600 text-[10px] tracking-widest uppercase">
        Built for PABP Assignment // Project by brooainware
      </footer>
    </main>
  );
}