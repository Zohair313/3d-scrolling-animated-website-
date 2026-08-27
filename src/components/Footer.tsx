export default function Footer() {
  return (
    <footer className="bg-black text-white/40 border-t border-white/10 py-16 px-8 md:px-24 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase">
      <div>© 2026 APEX Motors. All rights reserved.</div>
      <div className="flex gap-8 mt-6 md:mt-0">
        <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
      </div>
    </footer>
  );
}
