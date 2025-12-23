
import React from 'react';
import { Landmark, Building2, Ticket, Tent, Star, ArrowLeft } from 'lucide-react';

interface SolutionsPageProps {
  onBookDemo: () => void;
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ onBookDemo }) => {
  const solutions = [
    {
      title: "دور الأوبرا الوطنية",
      desc: "إدارة شاملة لجمهور النخبة، مع أنظمة مراقبة تدفق دقيقة وتوقعات إقبال للمواسم الثقافية الطويلة.",
      icon: <Landmark className="w-8 h-8" />,
      tag: "فخامة تشغيلية"
    },
    {
      title: "المسارح التجارية",
      desc: "محرك تسعير ديناميكي يهدف لزيادة الأرباح اللحظية وضمان إشغال المقاعد حتى في اللحظات الأخيرة.",
      icon: <Ticket className="w-8 h-8" />,
      tag: "تحفيز العائد"
    },
    {
      title: "المهرجانات والفعاليات الكبرى",
      desc: "إدارة حشود ذكية للمواقع المفتوحة، تتبع مسارات الجمهور، وتوجيه المنظمين لحظياً لمنع التكدس.",
      icon: <Tent className="w-8 h-8" />,
      tag: "أمان الحشود"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-24 bg-gradient-to-b from-slate-900 to-[#0A192F]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8">حلول مصممة لـ <span className="text-electric-teal">كل خشبة مسرح.</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            نحن نفهم أن احتياجات دار الأوبرا تختلف عن المسرح الخاص. لهذا قمنا بتطوير خوارزميات متخصصة لكل قطاع.
          </p>
          
          <div className="grid md:grid-cols-3 gap-10 text-right">
            {solutions.map((s, i) => (
              <div key={i} className="glass-card p-10 rounded-[40px] border border-slate-800 flex flex-col items-start group">
                <div className="w-16 h-16 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal mb-8 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="text-[10px] font-black text-amber-gold uppercase tracking-widest mb-4">{s.tag}</span>
                <h3 className="text-2xl font-bold mb-6 text-white">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-8">{s.desc}</p>
                <button onClick={onBookDemo} className="text-electric-teal font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  استكشف تفاصيل الحل <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="py-32 border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[50px] overflow-hidden flex flex-col lg:flex-row items-center border border-slate-800">
            <div className="w-full lg:w-1/2 p-12 lg:p-20 text-right">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-gold text-amber-gold" />)}
              </div>
              <h2 className="text-3xl font-black mb-6">"كيف حققنا إشغالاً بنسبة 95% لموسم الرياض المسرحي؟"</h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                استخدم فريق التشغيل خوارزميات StageMind AI لتوقع فترات الذروة وتوجيه حشود تصل لـ 10,000 زائر يومياً دون تسجيل حالة تدافع واحدة.
              </p>
              <button className="bg-slate-800 px-8 py-4 rounded-2xl font-black border border-slate-700 hover:bg-slate-700 transition-all">تحميل دراسة الحالة</button>
            </div>
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] bg-slate-800 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover opacity-60" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
