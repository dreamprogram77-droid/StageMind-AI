
import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Database, 
  Zap, 
  Layers,
  Sparkles,
  TrendingUp,
  Users,
  Map,
  Target,
  ShieldCheck,
  MousePointer2,
  BarChart3,
  Brain,
  Fingerprint,
  Heart,
  Smile,
  Activity,
  Clock,
  Navigation,
  Flame
} from 'lucide-react';

interface ProductPageProps {
  onBack: () => void;
  onBookDemo: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onBack, onBookDemo }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#0A192F] min-h-screen">
      {/* Back Button */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-500 hover:text-electric-teal transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-electric-teal group-hover:bg-electric-teal/10 transition-all">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest font-plex">العودة للمنصة الرئيسية</span>
          </button>
        </div>
      </section>

      {/* Hero Section: How it Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl text-right mb-24">
            <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.1] text-white font-plex">
              كيف يعمل <br />
              <span className="text-electric-teal">StageMind Conductor؟</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl">
              نحن لا نستبدل مدير المسرح، بل نمنحه "حواس خوارزمية" خارقة. نظامنا يعمل كطبقة ذكية فوق بنيتك التحتية الحالية ليحول البيانات الخام إلى قرارات تشغيلية ذهبية.
            </p>
          </div>

          {/* Step by Step Visual */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 hidden md:block z-0" />
            {[
              { t: "الربط الرقمي", d: "مزامنة لحظية مع بوابات التذاكر وأنظمة الدخول.", i: <Database /> },
              { t: "المعالجة السحابية", d: "تحليل الأنماط التاريخية والطلب الآني.", i: <Cpu /> },
              { t: "التوليد الذكي", d: "توليد توصيات التسعير وخطط التدفق.", i: <Sparkles /> },
              { t: "التنفيذ الميداني", d: "إرسال التنبيهات لفريق التشغيل والمنظمين.", i: <MousePointer2 /> }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-[#0F172A] p-10 rounded-[40px] border border-slate-800 text-right group hover:border-electric-teal/40 transition-all">
                <div className="w-14 h-14 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal mb-8 group-hover:scale-110 transition-transform">
                  {step.i}
                </div>
                <h3 className="text-xl font-black text-white mb-4 font-plex">{step.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Sections */}
      <section className="py-32 space-y-32">
        
        {/* Audience Intelligence Section */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-plex">Audience Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">افهم جمهورك <br /> <span className="text-indigo-400">كأفراد، لا أرقام.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              تجاوز مجرد معرفة عدد الحضور. نظام الذكاء الاصطناعي لدينا يحلل السلوك المعقد: من أوقات الوصول المفضلة إلى أنماط التفاعل العاطفي أثناء العرض. نحن نمنحك القدرة على بناء مواسم فنية تلبي شغف جمهورك بدقة متناهية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                <Fingerprint className="w-8 h-8 text-indigo-400 mb-4 opacity-50 group-hover:opacity-100" />
                <h4 className="font-black text-white mb-2">تحليل البصمة الفنية</h4>
                <p className="text-xs text-gray-500">فهم التفضيلات الدرامية والموسيقية لبناء برمجة فنية ناجحة.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-electric-teal/30 transition-all group">
                <Smile className="w-8 h-8 text-electric-teal mb-4 opacity-50 group-hover:opacity-100" />
                <h4 className="font-black text-white mb-2">رصد المشاعر (Sentiment)</h4>
                <p className="text-xs text-gray-500">تحليل التصفيق والتفاعل الصوتي لتقييم نجاح كل مشهد لحظياً.</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-10 rounded-[56px] border border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent relative group">
             <div className="aspect-square bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-48 h-48 rounded-full border-4 border-dashed border-indigo-500/20 animate-spin-slow flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-indigo-500/40 flex items-center justify-center">
                      <Heart className="w-16 h-16 text-indigo-400 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-gray-400 font-plex font-bold mt-8">خارطة الارتباط العاطفي للجمهور</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] rounded-full border border-green-500/20">حماس عالي</span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] rounded-full border border-indigo-500/20">تركيز عميق</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Dynamic Pricing - ELABORATED SECTION */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-gold/10 rounded-full border border-amber-gold/20">
              <TrendingUp className="w-4 h-4 text-amber-gold" />
              <span className="text-[10px] font-black text-amber-gold uppercase tracking-widest font-plex">الربحية الاستراتيجية</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">محرك التسعير الديناميكي: <br /> <span className="text-amber-gold">تعظيم العائد الذكي.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              لا تعتمد على أسعار ثابتة لموسم كامل. خوارزميتنا تقوم بتحليل متقاطع للبيانات لضمان أن كل تذكرة تُباع بالسعر الأمثل الذي يوازن بين القدرة الشرائية للجمهور وتعظيم أرباح المسرح.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  title: "تحليل منحنى الطلب",
                  desc: "مراقبة لحظية لسرعة الحجز (Booking Velocity). إذا زاد الطلب على عرض معين، يرتفع السعر تلقائياً لتأمين عوائد أعلى للمقاعد المتبقية.",
                  icon: <Flame className="w-5 h-5 text-amber-gold" />
                },
                {
                  title: "عامل التوقيت (Time Decay)",
                  desc: "تحسين الأسعار بناءً على القرب من موعد العرض. عروض 'اللحظة الأخيرة' الذكية تملأ المقاعد الشاغرة بأسعار محفزة بدلاً من بقائها فارغة.",
                  icon: <Clock className="w-5 h-5 text-amber-gold" />
                },
                {
                  title: "التسعير المعتمد على الموقع",
                  desc: "ربط خرائط الحرارة (Heatmaps) بقيمة المقعد. المقاعد ذات الرؤية الأفضل أو الأكثر طلباً يتم تسعيرها بشكل مختلف ديناميكياً حسب كل فعالية.",
                  icon: <Navigation className="w-5 h-5 text-amber-gold" />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 flex-row-reverse group">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-amber-gold/30 transition-all shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={onBookDemo} className="bg-amber-gold text-[#0A192F] px-10 py-4 rounded-2xl font-black text-sm hover:shadow-[0_10px_30px_rgba(255,180,0,0.3)] transition-all font-plex active:scale-95">استعرض خوارزمية الربح</button>
          </div>
          <div className="glass-card p-10 rounded-[56px] border border-white/5 order-1 lg:order-2 bg-gradient-to-br from-amber-gold/5 to-transparent relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,180,0,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5 relative">
                <div className="flex flex-col items-center gap-6 p-12 text-center">
                  <div className="grid grid-cols-3 gap-4 w-full opacity-40 group-hover:opacity-100 transition-all duration-1000 scale-90 group-hover:scale-100">
                    {[100, 140, 90, 200, 160, 120].map((v, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <span className="text-[10px] text-gray-500 block mb-1">Zone {i+1}</span>
                        <span className="text-lg font-black text-amber-gold font-plex">${v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 font-plex font-bold">نمذجة الأسعار اللحظية حسب كثافة الطلب</p>
                  <BarChart3 className="w-12 h-12 text-amber-gold/40 animate-pulse" />
                </div>
             </div>
          </div>
        </div>

        {/* Audience Forecasting */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="glass-card p-10 rounded-[56px] border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent">
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5">
                <Target className="w-20 h-20 text-purple-400/20" />
             </div>
          </div>
          <div className="text-right space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest font-plex">توقعات الجمهور</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">اعرف حجم جمهورك <br /> <span className="text-purple-400">قبل أسبوع من العرض.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              نستخدم التعلم الآلي للتنبؤ بنسبة الإشغال بناءً على نوع العرض، التاريخ، وحالة الطقس، وحتى الفعاليات المنافسة في المدينة. جهز فريقك اللوجستي بناءً على أرقام حقيقية، لا تخمينات.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-white font-plex">96.4%</p>
                <p className="text-[10px] text-gray-500 font-bold font-plex">دقة التنبؤ القياسية</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-white font-plex">7 أيام</p>
                <p className="text-[10px] text-gray-500 font-bold font-plex">نافذة التوقع الاستباقي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crowd Management */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-electric-teal/10 rounded-full border border-electric-teal/20">
              <Map className="w-4 h-4 text-electric-teal" />
              <span className="text-[10px] font-black text-electric-teal uppercase tracking-widest font-plex">إدارة الحشود</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">انسيابية كاملة <br /> <span className="text-electric-teal">بلا اختناقات.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              راقب تدفق الجمهور عند البوابات والردهات لحظة بلحظة. يقوم النظام بتنبيه المنظمين فوراً عند توقع أي تكدس، ويقترح فتح مسارات بديلة لضمان تجربة دخول مريحة تليق بمؤسستك الثقافية.
            </p>
            <button onClick={onBookDemo} className="bg-white text-[#0A192F] px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all font-plex">استعراض نظام التدفق</button>
          </div>
          <div className="glass-card p-10 rounded-[56px] border border-white/5 bg-gradient-to-br from-electric-teal/5 to-transparent order-1 lg:order-2">
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5">
                <ShieldCheck className="w-20 h-20 text-electric-teal/20" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-10 font-plex">جاهز لتحويل مسرحك؟</h2>
          <button 
            onClick={onBookDemo}
            className="bg-electric-teal text-[#0A192F] px-16 py-7 rounded-[28px] font-black text-xl hover:shadow-[0_0_60px_rgba(100,255,218,0.4)] transition-all font-plex"
          >
            احجز عرضاً تجريبياً حياً الآن
          </button>
        </div>
      </section>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
