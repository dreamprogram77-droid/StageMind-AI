
import React, { useState } from 'react';
import { Check, Sparkles, Building2, Zap, ArrowLeft, X, HelpCircle, Info, ShieldCheck, Cpu, Users, TrendingUp } from 'lucide-react';

interface PricingPageProps {
  onBookDemo: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBookDemo }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "المجاني",
      monthlyPrice: 0,
      annualPrice: 0,
      desc: "للمسارح المستقلة والفرق الصغيرة التي تبدأ خطواتها الأولى في الرقمنة.",
      features: ["توقعات إقبال (يوم واحد)", "لوحة تحكم محدودة", "دعم عبر المجتمع", "ربط نظام تذاكر واحد", "حد 500 تذكرة شهرياً"],
      icon: <Users className="w-6 h-6" />,
      color: "border-slate-800/50 hover:border-slate-700"
    },
    {
      name: "الأساسي",
      monthlyPrice: 199,
      annualPrice: 159,
      desc: "مثالي للمسارح المتوسطة التي تحتاج إلى أتمتة التقارير وفهم الجمهور.",
      features: ["توقعات إقبال (3 أيام)", "لوحة تحكم احترافية", "دعم عبر البريد (24 ساعة)", "ربط نظامي تذاكر", "تحليلات الديموغرافيا الأساسية"],
      icon: <Zap className="w-6 h-6" />,
      color: "border-slate-800/50 hover:border-slate-700"
    },
    {
      name: "الاحترافي",
      monthlyPrice: 499,
      annualPrice: 399,
      desc: "الخيار الأقوى لتعظيم الأرباح وإدارة الحشود بالذكاء الاصطناعي الكامل.",
      features: ["تسعير ديناميكي كامل 2.0", "توقعات إقبال (10 أيام)", "إدارة حشود لحظية", "تكاملات API مفتوحة", "دعم فني متميز (ساعة واحدة)"],
      icon: <Sparkles className="w-6 h-6" />,
      color: "border-electric-teal shadow-[0_0_40px_rgba(100,255,218,0.1)]",
      popular: true
    },
    {
      name: "المؤسسات",
      monthlyPrice: "تواصل",
      annualPrice: "تواصل",
      desc: "حلول سيادية ومخصصة لدور الأوبرا والشبكات المسرحية الكبرى.",
      features: ["خوارزميات AI مخصصة", "أمن بيانات فائق (On-premise)", "مدير حساب استراتيجي", "تدريب ميداني وتخصيص كامل", "خدمات استشارية تشغيلية"],
      icon: <Building2 className="w-6 h-6" />,
      color: "border-amber-gold/50 hover:border-amber-gold"
    }
  ];

  const comparisonRows = [
    { feature: "توقعات الإقبال AI", free: "يوم واحد", basic: "3 أيام", pro: "10 أيام", ent: "غير محدود" },
    { feature: "التسعير الديناميكي", free: false, basic: "أساسي", pro: "متقدم (لحظي)", ent: "مخصص بالكامل" },
    { feature: "إدارة الحشود", free: false, basic: false, pro: "نشط", ent: "نشط + توقعات زحام" },
    { feature: "عدد أنظمة التذاكر", free: "1", basic: "2", pro: "غير محدود", ent: "غير محدود" },
    { feature: "تحليلات الديموغرافيا", free: "محدود", basic: "كامل", pro: "عميق + AI Insights", ent: "تنبؤي مخصص" },
    { feature: "تكاملات API", free: false, basic: false, pro: "متاح", ent: "متاح + دعم هندسي" },
    { feature: "أمن البيانات", free: "معياري", basic: "معياري", pro: "متقدم", ent: "On-Premise متاح" },
    { feature: "الدعم الفني", free: "منتدى", basic: "بريد", pro: "هاتف/شات", ent: "مهندس مخصص 24/7" },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-24 bg-gradient-to-b from-[#0A192F] via-[#0D1F3D] to-[#0A192F] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(100,255,218,0.05),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-teal/10 border border-electric-teal/20 mb-8">
            <span className="text-[10px] font-black text-electric-teal tracking-[0.2em] uppercase">باقات مرنة لجميع الأحجام</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8">استثمر في <span className="text-electric-teal">مستقبل مسرحك.</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            اختر الباقة التي تناسب حجم عملياتك وطموحاتك الاستثمارية. جميع الباقات تتضمن تحديثات أمنية دورية.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-6 mb-20 flex-row-reverse">
            <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>شهرياً</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-slate-800 rounded-full p-1 transition-all"
            >
              <div className={`w-6 h-6 bg-electric-teal rounded-full shadow-lg transform transition-transform duration-300 ${isAnnual ? '-translate-x-0' : '-translate-x-8'}`} />
            </button>
            <div className="flex items-center gap-3 flex-row-reverse">
              <span className={`text-sm font-bold transition-colors ${isAnnual ? 'text-white' : 'text-gray-500'}`}>سنوياً</span>
              <span className="bg-amber-gold/10 text-amber-gold text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-gold/20 uppercase tracking-tighter">وفر 20%</span>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 text-right max-w-[1400px] mx-auto mb-32">
            {plans.map((p, i) => (
              <div 
                key={i} 
                className={`group relative glass-card p-10 rounded-[40px] border-2 ${p.color} flex flex-col h-full transition-all duration-500 hover:-translate-y-4`}
              >
                {p.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-electric-teal to-blue-500 text-[#0A192F] px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">الخيار الموصى به</div>
                )}
                
                <div className="flex items-center justify-between mb-10">
                  <div className={`p-4 rounded-2xl bg-slate-800 transition-colors group-hover:bg-slate-700 ${p.popular ? 'text-electric-teal' : 'text-white'}`}>{p.icon}</div>
                  <h3 className="text-2xl font-black">{p.name}</h3>
                </div>

                <div className="mb-8 min-h-[80px] flex flex-col items-end">
                  <div className="flex items-baseline gap-2 flex-row-reverse">
                    <span className="text-5xl font-black text-white transition-all duration-500">
                      {typeof p.monthlyPrice === 'string' 
                        ? p.monthlyPrice 
                        : isAnnual ? `$${p.annualPrice}` : `$${p.monthlyPrice}`
                      }
                    </span>
                    {typeof p.monthlyPrice !== 'string' && (
                      <span className="text-gray-500 font-bold text-sm">/ شهرياً</span>
                    )}
                  </div>
                  {isAnnual && typeof p.monthlyPrice !== 'string' && p.monthlyPrice > 0 && (
                    <p className="text-[10px] text-electric-teal font-black mt-2 uppercase tracking-widest">تُدفع سنوياً ($ {(p.annualPrice as number) * 12})</p>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-10 leading-relaxed min-h-[60px]">{p.desc}</p>

                <div className="space-y-4 mb-12 flex-1 border-t border-white/5 pt-8">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-4 flex-row-reverse">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.popular ? 'bg-electric-teal/20 text-electric-teal' : 'bg-slate-800 text-gray-500'}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm font-bold text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onBookDemo}
                  className={`w-full py-5 rounded-2xl font-black text-sm transition-all active:scale-[0.98] ${p.popular ? 'bg-electric-teal text-[#0A192F] hover:shadow-[0_20px_40px_rgba(100,255,218,0.2)]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                >
                  {p.name === "المؤسسات" ? "اتصل بفريق المبيعات" : p.name === "المجاني" ? "ابدأ الآن مجاناً" : "ابدأ الفترة التجريبية"}
                </button>
              </div>
            ))}
          </div>

          {/* Feature Comparison Matrix */}
          <div className="max-w-5xl mx-auto mb-40 text-right">
            <h2 className="text-4xl font-black mb-12 text-center">مقارنة <span className="text-electric-teal">الميزات التفصيلية</span></h2>
            <div className="glass-card rounded-[48px] border border-slate-800 overflow-hidden overflow-x-auto custom-scrollbar">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800">
                    <th className="p-8 text-lg font-black text-gray-400">الميزة</th>
                    <th className="p-8 text-center font-black">المجاني</th>
                    <th className="p-8 text-center font-black">الأساسي</th>
                    <th className="p-8 text-center font-black text-electric-teal">الاحترافي</th>
                    <th className="p-8 text-center font-black">المؤسسات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-plex">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-8 font-bold text-white whitespace-nowrap">{row.feature}</td>
                      <td className="p-8 text-center text-gray-400">{row.free === false ? <X className="w-5 h-5 mx-auto text-gray-700" /> : row.free}</td>
                      <td className="p-8 text-center text-gray-300">{row.basic === false ? <X className="w-5 h-5 mx-auto text-gray-700" /> : row.basic}</td>
                      <td className="p-8 text-center text-electric-teal font-black">{row.pro}</td>
                      <td className="p-8 text-center text-amber-gold font-bold">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Social Proof/Trust Section */}
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-32">
             {[
               { icon: <ShieldCheck className="w-10 h-10 text-green-400" />, title: "أمن فائق", desc: "تشفير AES-256 لكافة بيانات مبيعاتك." },
               { icon: <Cpu className="w-10 h-10 text-blue-400" />, title: "دقة 99%", desc: "خوارزميات مدربة على ملايين نقاط البيانات." },
               { icon: <TrendingUp className="w-10 h-10 text-amber-gold" />, title: "عائد مضمون", desc: "زيادة متوسطة في الأرباح تصل لـ 22%." },
             ].map((trust, i) => (
               <div key={i} className="flex flex-col items-center gap-6">
                 <div className="p-5 bg-white/5 rounded-[24px] border border-white/10">{trust.icon}</div>
                 <div className="text-center">
                    <h4 className="text-xl font-black mb-2">{trust.title}</h4>
                    <p className="text-sm text-gray-500">{trust.desc}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-32 p-12 bg-slate-900/30 backdrop-blur-md rounded-[48px] border border-slate-800 max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10 text-right group">
             <div className="w-20 h-20 bg-amber-gold/10 rounded-3xl text-amber-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-500"><Building2 className="w-10 h-10" /></div>
             <div className="flex-1">
               <h4 className="font-black text-2xl mb-3">هل تدير جهة حكومية أو أكاديمية؟</h4>
               <p className="text-gray-400 leading-relaxed font-medium">نحن نؤمن بأهمية الثقافة العامة، لذا نقدم خصومات تصل لـ 40% للمؤسسات التعليمية والجهات الحكومية غير الربحية لدعم الفن المسرحي العربي.</p>
             </div>
             <button onClick={onBookDemo} className="bg-amber-gold text-[#0A192F] px-10 py-4 rounded-2xl font-black whitespace-nowrap hover:shadow-[0_10px_30px_rgba(255,180,0,0.2)] transition-all active:scale-95">تقديم طلب دعم</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
