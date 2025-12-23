
import React from 'react';
import { Link, Search, BrainCircuit, LineChart, Layout, ArrowLeft, Quote } from 'lucide-react';

interface SolutionProps {
  onExplore?: () => void;
}

const steps = [
  {
    title: "الربط",
    description: "نربط مع نظام التذاكر وكاميرات الأمان الموجودة لديك ببساطة.",
    icon: <Link className="w-10 h-10 text-electric-teal" />
  },
  {
    title: "التحليل",
    description: "الذكاء الاصطناعي يحلل أنماط السلوك، أوقات الوصول، وتفضيلات الجمهور.",
    icon: <Search className="w-10 h-10 text-electric-teal" />
  },
  {
    title: "التوصية",
    description: "نقترح عليك السعر الأمثل وجدول التشغيل وتوزيع العمالة بدقة.",
    icon: <LineChart className="w-10 h-10 text-electric-teal" />
  },
  {
    title: "التحكم",
    description: "تابع كل شيء لحظيًا من لوحة تحكم واحدة وشاملة.",
    icon: <Layout className="w-10 h-10 text-electric-teal" />
  }
];

const Solution: React.FC<SolutionProps> = ({ onExplore }) => {
  return (
    <section id="solutions" className="py-32 relative overflow-hidden bg-[#0A192F]">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-electric-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Quote Block at the top as shown in the reference */}
        <div className="max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="relative p-10 md:p-14 rounded-[40px] border border-white/5 bg-[#112240]/30 backdrop-blur-xl shadow-2xl text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 bg-[#0A192F] border border-white/5 rounded-2xl shadow-xl">
              <Quote className="w-8 h-8 text-electric-teal fill-electric-teal/10" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed italic font-plex">
              "المسرح ليس مجرد فن يتجسد على الخشبة، بل هو <span className="text-white font-black">منظومة تشغيلية</span> تتطلب قرارات استباقية مبنية على حقائق رقمية لا تخطئ."
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side: Cards Grid */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Subtle background element for the grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-electric-teal/5 blur-[80px] rounded-full pointer-events-none opacity-40" />
              
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="group bg-[#0F172A]/80 backdrop-blur-xl p-10 rounded-[40px] border border-white/5 hover:border-electric-teal/30 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative mb-8 p-6 bg-slate-800/40 rounded-3xl group-hover:scale-110 group-hover:bg-electric-teal/10 transition-all duration-500">
                    {step.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-4 text-white font-plex">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-bold">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-right space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight font-plex tracking-tight">
                كيف نغير <span className="text-electric-teal underline decoration-electric-teal/20 underline-offset-8">قواعد اللعبة</span> <br />
                في إدارة مسرحك؟
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl font-medium">
                لقد ولى زمن التخمين. نحن نأخذ البيانات الموجودة بالفعل في مسرحك (التذاكر، الكاميرات، الاستطلاعات) ونحولها إلى رؤى استراتيجية تزيد من أرباحك وكفاءتك التشغيلية.
              </p>
            </div>

            <ul className="space-y-8">
              {[
                "زيادة الإيرادات بنسبة تصل إلى 30% عبر التسعير الديناميكي.",
                "تقليل الزحام عند المدخل بنسبة 45%.",
                "تحسين تجربة الجمهور عبر توفير الخدمات في أماكن الطلب."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 text-right justify-start group">
                  <div className="w-4 h-4 rounded-full bg-electric-teal/20 flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(100,255,218,0.2)]">
                    <div className="w-2 h-2 rounded-full bg-electric-teal" />
                  </div>
                  <span className="text-lg md:text-xl text-gray-300 font-bold group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button 
                onClick={onExplore}
                className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 rounded-[24px] text-electric-teal font-black text-xl hover:bg-electric-teal/10 hover:shadow-[0_0_40px_rgba(100,255,218,0.1)] transition-all font-plex active:scale-95"
              >
                <span>استعرض الحلول المخصصة</span>
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
