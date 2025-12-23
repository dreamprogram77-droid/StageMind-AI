
import React from 'react';
import { Zap, Clock, TrendingUp, Users, Map, CheckCircle2, Shield } from 'lucide-react';

interface FeaturesPageProps {
  onBookDemo: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBookDemo }) => {
  const detailFeatures = [
    {
      id: "ai",
      title: "Audience Intelligence",
      icon: <Users className="w-8 h-8 text-electric-teal" />,
      bullets: ["تحليل الديموغرافيا اللحظية", "تتبع ولاء الجمهور", "توقعات تفضيلات العروض"],
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "pricing",
      title: "Dynamic Pricing 2.0",
      icon: <TrendingUp className="w-8 h-8 text-amber-gold" />,
      bullets: ["تعديل الأسعار التلقائي", "خصومات اللحظة الأخيرة الذكية", "تحليل سرعة المبيعات"],
      image: "https://images.unsplash.com/photo-1611974717483-58ac3cd30661?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h1 className="text-5xl font-black mb-8">ترسانة تقنية <span className="text-electric-teal">بين يديك.</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">نحن لا نقدم مجرد برمجيات، بل نطور أدوات تعيد تعريف تجربة المسرح للجمهور والمنظمين.</p>
          </div>

          <div className="space-y-32">
            {detailFeatures.map((f, i) => (
              <div key={f.id} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 text-right`}>
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-slate-800 rounded-3xl">{f.icon}</div>
                    <h2 className="text-4xl font-black">{f.title}</h2>
                  </div>
                  <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    من خلال الربط المباشر مع قواعد بياناتك، يقوم نظامنا باستخراج الأنماط المخفية التي تساعدك في اتخاذ قرارات تسويقية وتشغيلية أذكى بـ 10 أضعاف.
                  </p>
                  <ul className="space-y-4">
                    {f.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-electric-teal flex-shrink-0" />
                        <span className="font-bold text-gray-300">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full lg:w-1/2">
                   <div className="glass-card p-4 rounded-[40px] border border-slate-700">
                     <img src={f.image} alt={f.title} className="rounded-[30px] w-full aspect-video object-cover opacity-80" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid Mini */}
      <section className="py-32 bg-slate-900/40">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { t: "تشفير كامل", i: <Shield /> },
                { t: "تكامل API", i: <Zap /> },
                { t: "دعم 24/7", i: <Clock /> },
                { t: "تقارير ذكية", i: <Map /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-[#112240] rounded-3xl border border-slate-800 text-center flex flex-col items-center">
                  <div className="text-electric-teal mb-4">{item.i}</div>
                  <h4 className="font-bold text-white">{item.t}</h4>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
