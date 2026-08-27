"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 mix-blend-difference"
    >
      <div className="text-xl font-bold tracking-[0.2em] uppercase text-white cursor-pointer hover:opacity-70 transition-opacity">
        APEX<span className="text-white/40">Motors</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
        <a href="#" className="hover:text-white transition-colors duration-300">Vision</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Aerodynamics</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Engineering</a>
      </div>
      <button className="px-6 py-3 text-[10px] font-bold tracking-[0.3em] uppercase border border-white/20 rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
        Pre-order
      </button>
    </motion.nav>
  );
}
