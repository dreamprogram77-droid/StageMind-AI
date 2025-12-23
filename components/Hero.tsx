
import React from 'react';
import { Play, TrendingUp, Zap, Users, ArrowLeft, Sparkles } from 'lucide-react';

interface HeroProps {
  onBookDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookDemo }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F]">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[1000px] h-[1000px] bg-electric-teal/5 rounded-full blur-[200px] animate-subtle-pulse" />
        <div className="absolute bottom-[5%] left-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[180px]" />
        
        {/* Animated Grid Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10 pt-32 pb-20">
        <div className="text-right space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/40 border border-white/5 backdrop-blur-3xl group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-teal"></span>
            </span>
            <span className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase group-hover:text-electric-teal transition-colors font-plex">StageMind Enterprise AI 3.1</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[90px] font-black leading-[1] tracking-tighter font-plex">
            مستقبل المسرح <br />
            <span className="bg-gradient-to-l from-electric-teal via-white to-amber-gold bg-clip-text text-transparent drop-shadow-2xl">
              يُدار بالبيانات.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-medium opacity-80">
            حوّل مسرحك إلى منظومة ذكية تتوقع احتياجات الجمهور، تعظم الإيرادات تلقائياً، وتضمن انسيابية الحشود في كل عرض عبر تحليلات لحظية دقيقة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-start items-center pt-4">
            <button 
              onClick={onBookDemo}
              className="w-full sm:w-auto bg-electric-teal text-[#0A192F] px-12 py-5 rounded-[24px] text-lg font-black hover:shadow-[0_0_60px_rgba(100,255,218,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-4 justify-center"
            >
              <span>ابدأ التحول الرقمي</span>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button className="w-full sm:w-auto group flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-12 py-5 rounded-[24px] text-lg font-bold transition-all backdrop-blur-xl">
              <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-[#0A192F] transition-all border border-white/10">
                <Play className="w-4 h-4 fill-current ml-1" />
              </div>
              <span>شاهد المنصة</span>
            </button>
          </div>
          
          <div className="flex items-center gap-10 flex-row-reverse border-t border-white/5 pt-12">
            <div className="flex -space-x-reverse -space-x-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-14 h-14 rounded-2xl border-2 border-[#0A192F] bg-slate-800 overflow-hidden shadow-2xl transition-all hover:-translate-y-3 hover:z-20 cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=theatre-${i}`} alt="user" className="grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">+150 مؤسسة</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] font-plex">تعتمد على ذكاء StageMind</p>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000 animate-in fade-in slide-in-from-left-12 duration-1000 delay-300 hidden lg:block">
          {/* Layered Visual Effects */}
          <div className="absolute inset-0 bg-electric-teal/15 blur-[120px] opacity-30 group-hover:opacity-50 transition-all duration-1000" />
          
          {/* Main Hero Card */}
          <div className="relative glass-card p-4 rounded-[56px] shadow-2xl transform transition-transform duration-700 group-hover:rotate-x-3 group-hover:rotate-y-[-3deg] hover:scale-[1.02]">
             <div className="overflow-hidden rounded-[44px] border border-white/10 aspect-[4/5] relative">
               <img 
                 src="https://images.unsplash.com/photo-1503095396549-807a89010046?q=80&w=1471&auto=format&fit=crop" 
                 alt="Theatre Management UI" 
                 className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4000ms]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent" />
               
               {/* Floating Micro-Widget */}
               <div className="absolute top-10 left-10 p-6 glass-card rounded-3xl border border-white/10 animate-float shadow-2xl">
                 <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="p-3 bg-amber-gold/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-amber-gold" />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest font-plex">توقعات الطلب</p>
                      <p className="text-lg font-black text-white font-plex">إشغال 94%</p>
                    </div>
                 </div>
               </div>
             </div>

             {/* Bottom Summary Bar */}
             <div className="absolute -bottom-10 right-10 left-10 bg-[#0F172A]/90 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-12 duration-1000 delay-700">
                <div className="flex items-center justify-between mb-8 flex-row-reverse">
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <Sparkles className="w-4 h-4 text-electric-teal" />
                      <p className="text-[10px] text-electric-teal uppercase tracking-[0.4em] font-black font-plex">تحليل العائد اللحظي</p>
                    </div>
                    <p className="text-2xl font-black text-white font-plex">عائد إضافي: <span className="text-green-400">+$12,450</span></p>
                  </div>
                  <div className="bg-electric-teal/5 p-4 rounded-2xl border border-electric-teal/10">
                    <Zap className="text-electric-teal w-8 h-8 drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]" />
                  </div>
                </div>
                <div className="flex gap-2.5 items-end h-16 flex-row-reverse">
                   {[65, 80, 45, 90, 70, 85, 95, 60, 75, 55, 80, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-white/5 rounded-full overflow-hidden relative group/bar">
                       <div 
                        className="absolute bottom-0 left-0 right-0 bg-electric-teal/30 transition-all duration-1000 group-hover/bar:bg-electric-teal group-hover/bar:opacity-100" 
                        style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} 
                       />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
