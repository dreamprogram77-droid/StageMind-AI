
import React, { useState, useEffect, useRef } from 'react';
import { PAIN_POINTS } from '../constants';
import { PainPoint } from '../types';

interface PainPointCardProps {
  point: PainPoint;
  index: number;
}

const PainPointCard: React.FC<PainPointCardProps> = ({ point, index }) => {
  return (
    <div 
      className="relative bg-[#112240]/40 backdrop-blur-md p-10 md:p-12 rounded-[40px] border border-slate-800/80 transition-all duration-700 group hover:-translate-y-4 hover:border-amber-gold/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(255,180,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Dynamic Border Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-br from-amber-gold/15 via-transparent to-transparent" />
      
      {/* Card Top Accent Bar */}
      <div className="absolute top-0 right-0 left-0 h-2 bg-slate-800 group-hover:bg-amber-gold transition-colors duration-500 shadow-[0_0_20px_rgba(255,180,0,0.4)]" />
      
      {/* Hierarchy Indicator (Background Number) */}
      <div className="absolute -top-4 -left-4 text-[140px] font-black text-white/[0.02] group-hover:text-amber-gold/[0.08] transition-all duration-1000 pointer-events-none italic select-none group-hover:-translate-x-4 group-hover:-translate-y-4 font-plex">
        0{index + 1}
      </div>

      <div className="relative z-10 text-right">
        {/* Refined Icon Container with Enhanced Amber-Gold Glow */}
        <div className="relative mb-12 inline-block">
          {/* Subtle Ambient Aura - Scales larger on hover */}
          <div className="absolute inset-0 bg-amber-gold/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-[1.5] pointer-events-none" />
          
          {/* Focused Secondary Glow */}
          <div className="absolute inset-0 bg-amber-gold/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 pointer-events-none shadow-[0_0_40px_rgba(255,180,0,0.2)]" />
          
          {/* The Icon - Enhanced Zoom & Rotation on hover */}
          <div className="text-7xl relative z-10 transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-125 group-hover:rotate-[-8deg] group-hover:drop-shadow-[0_0_30px_rgba(255,180,0,0.6)]">
            {point.icon}
          </div>
        </div>
        
        {/* Bold Dominant Title */}
        <h3 className="text-5xl md:text-6xl font-black mb-10 text-white group-hover:text-amber-gold transition-all duration-500 leading-[1] tracking-tighter font-plex drop-shadow-sm group-hover:drop-shadow-[0_4px_12px_rgba(255,180,0,0.2)]">
          {point.title}
        </h3>
        
        {/* Refined Contrast Description */}
        <p className="text-lg md:text-xl font-medium text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-500 opacity-90 group-hover:opacity-100 max-w-full">
          {point.description}
        </p>

        {/* Action Reveal Accent */}
        <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0">
          <span className="text-[10px] font-black text-amber-gold uppercase tracking-[0.4em] whitespace-nowrap font-plex">تحليل الأداء الرقمي</span>
          <div className="flex-1 h-px bg-gradient-to-l from-amber-gold/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};

const InteractiveBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute top-[10%] left-[5%] w-[700px] h-[700px] bg-electric-teal/[0.03] rounded-full blur-[160px] transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${mousePos.x * -80}px, ${(mousePos.y * -80) + (scrollOffset * 0.1)}px) scale(${1 + Math.abs(mousePos.x) * 0.15})` 
        }}
      />
      
      <div 
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-amber-gold/[0.04] rounded-full blur-[140px] transition-transform duration-500 ease-out"
        style={{ 
          transform: `translate(${mousePos.x * 60}px, ${(mousePos.y * 60) - (scrollOffset * 0.15)}px) scale(${1 + Math.abs(mousePos.y) * 0.1})` 
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-600/[0.02] rounded-full blur-[180px] transition-transform duration-700 ease-out"
        style={{ 
          transform: `translate(${mousePos.x * 30}px, ${(mousePos.y * -40) + (scrollOffset * 0.05)}px) rotate(${mousePos.x * 15}deg)` 
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
        style={{ 
          transform: `translateY(${scrollOffset * 0.05}px)` 
        }}
      />
      
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full transition-transform duration-1000 ease-out opacity-[0.1]"
          style={{ 
            width: `${10 + (i * 15)}px`,
            height: `${10 + (i * 15)}px`,
            background: i % 2 === 0 ? 'var(--teal)' : 'var(--gold)',
            top: `${(i * 12) + 10}%`, 
            left: `${(i * 20) % 100}%`,
            filter: 'blur(40px)',
            transform: `translate(${mousePos.x * (20 + i * 10)}px, ${(mousePos.y * (20 + i * 10)) + (scrollOffset * (0.02 + i * 0.01))}px)`
          }}
        />
      ))}
    </div>
  );
};

const PainStrip: React.FC = () => {
  return (
    <section className="py-32 bg-[#0A192F] relative overflow-hidden">
      <InteractiveBackground />
      
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800/40 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-amber-gold/5 border border-amber-gold/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-gold"></span>
            </span>
            <span className="text-amber-gold text-[10px] font-black uppercase tracking-[0.4em] font-plex">واقع التشغيل التقليدي</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 font-plex">
            هل تواجه هذه <span className="bg-gradient-to-l from-amber-gold to-orange-400 bg-clip-text text-transparent">التحديات المعقدة؟</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-gold/30 to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(255,180,0,0.1)]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {PAIN_POINTS.map((point, index) => (
            <PainPointCard key={index} point={point} index={index} />
          ))}
        </div>

        <div className="mt-32 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="inline-block px-10 py-6 rounded-[32px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-xl shadow-2xl">
            <p className="text-gray-400 italic text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              "المسرح ليس مجرد فن يتجسد على الخشبة، بل هو <span className="text-white font-black">منظومة تشغيلية</span> تتطلب قرارات استباقية مبنية على حقائق رقمية لا تخطئ."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainStrip;
