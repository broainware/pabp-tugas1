'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, cartCount, totalPrice } = useCart();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <div className="absolute -top-2 -right-2 bg-white text-[#1a0202] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 shadow-xl pointer-events-none">
          {cartCount}
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#d4c3a3] text-[#1a0202] p-5 rounded-full shadow-2xl border border-white/20 hover:bg-white transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-md bg-[#1a0202] h-full shadow-2xl border-l border-white/10 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black text-white tracking-tighter italic">YOUR BAG</h2>
              <button onClick={() => setIsOpen(false)} className="text-[#d4c3a3] text-[10px] font-bold tracking-widest uppercase hover:text-white">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] text-center pt-20">Your bag is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.uniqueId} className="flex justify-between items-center border-b border-white/5 pb-4 group">
                    <div>
                      <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">{item.title}</h4>
                      <p className="text-[#d4c3a3] font-serif italic text-sm">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.uniqueId)}
                      className="text-white/20 hover:text-red-500 transition-colors text-[9px] font-bold uppercase tracking-tighter"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Total</span>
                <span className="text-2xl font-serif text-[#d4c3a3] italic">${totalPrice}</span>
              </div>
              <button className="w-full bg-[#d4c3a3] text-[#1a0202] py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}