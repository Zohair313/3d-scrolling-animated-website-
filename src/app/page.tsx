import CarScrollCanvas from "@/components/CarScrollCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <CarScrollCanvas />
      
      {/* Specifications Section */}
      <section className="relative bg-black text-white py-40 px-8 md:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h3 className="text-xs font-medium tracking-[0.4em] uppercase text-white/30 mb-20 text-center">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 pt-20">
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white/90 group-hover:text-white transition-colors duration-500">1.9s</div>
              <div className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/70 transition-colors duration-500">0-60 MPH</div>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white/90 group-hover:text-white transition-colors duration-500">1,400</div>
              <div className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/70 transition-colors duration-500">Horsepower</div>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white/90 group-hover:text-white transition-colors duration-500">450</div>
              <div className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/70 transition-colors duration-500">Mile Range</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
