"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function CarScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  
  const frameCount = 50;

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Assuming images are at /images/car/frame_001.webp to frame_060.webp
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `images/car/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === frameCount) {
          setIsPreloaded(true);
        }
      };
      
      // In case of error (e.g., missing images), we still want to progress
      img.onerror = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === frameCount) {
          setIsPreloaded(true);
        }
      };
      
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to frame index (0 to 59)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const opacity0 = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale0 = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const opacity30 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const y30 = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const filter30 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.45], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const opacity60 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const y60 = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);
  const filter60 = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.75], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const opacity90 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const y90 = useTransform(scrollYProgress, [0.8, 0.9], [50, 0]);

  useEffect(() => {
    if (!isPreloaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency needed if bg is solid
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      
      // Match canvas size to display size
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      // Only resize if changed to avoid expensive operations
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      
      // Fill background with pure black to blend with images
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate 'contain' aspect ratio
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Initial draw
    drawFrame(0);

    // Subscribe to framer-motion scroll updates
    const unsubscribe = frameIndex.on("change", (latest: number) => {
      // Use requestAnimationFrame for buttery smooth canvas updates
      requestAnimationFrame(() => drawFrame(latest));
    });

    // Handle resize
    const handleResize = () => {
      requestAnimationFrame(() => drawFrame(frameIndex.get()));
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isPreloaded, images, frameIndex]);

  // Loading Screen Overlay
  if (!isPreloaded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
        <div className="text-sm tracking-[0.3em] font-light text-white/50 mb-6 uppercase">Initializing Sequence</div>
        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${(loaded / frameCount) * 100}%` }}
          />
        </div>
        <div className="mt-6 font-mono text-xs text-white/40">
          {Math.round((loaded / frameCount) * 100)}%
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50"></div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-90 mix-blend-screen"
        />
        
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-80"></div>
        
        {/* Scrollytelling Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30">Scroll to Explore</div>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
          </motion.div>

          {/* 0% Scroll */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            style={{ 
              opacity: opacity0,
              scale: scale0
            }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-4">APEX-01</h1>
            <p className="text-lg md:text-xl text-white/60 font-light tracking-wide max-w-2xl">
              The Next Evolution of Electric Performance.
            </p>
          </motion.div>

          {/* 30% Scroll */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24 lg:p-32"
            style={{ 
              opacity: opacity30,
              y: y30,
              filter: filter30
            }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              AERODYNAMIC<br />ARCHITECTURE
            </h2>
            <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-lg border-l-2 border-white/20 pl-6">
              Handcrafted ultra-lightweight carbon fiber monocoque engineered for zero drag.
            </p>
          </motion.div>

          {/* 60% Scroll */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-end justify-center text-right p-8 md:p-24 lg:p-32"
            style={{ 
              opacity: opacity60,
              y: y60,
              filter: filter60
            }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4 bg-clip-text text-transparent bg-gradient-to-l from-white to-white/50">
              QUAD-MOTOR<br />VECTORING
            </h2>
            <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-lg border-r-2 border-white/20 pr-6">
              1,400 Horsepower. Individual torque control with instant liquid-cooled battery delivery.
            </p>
          </motion.div>

          {/* 90% Scroll */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-auto"
            style={{ 
              opacity: opacity90,
              y: y90
            }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white/90 mb-6">
              EXPERIENCE PURE POWER
            </h2>
            <p className="text-lg md:text-xl text-white/60 font-light mb-12">
              Reserve your build allocation today.
            </p>
            <button className="group relative px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase overflow-hidden rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
              <span className="relative z-10">Reserve Now</span>
              <div className="absolute inset-0 h-full w-full bg-black/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
