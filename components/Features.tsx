
import React from 'react';
import { FEATURES } from '../constants';
import { Share2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '../App';

interface FeaturesProps {
  onExploreProduct?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onExploreProduct }) => {
  const { addToast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'StageMind AI | تشغيل ذكي للمسرح',
      text: 'اكتشف مستقبلاً يُدار بالبيانات مع StageMind AI. حلول ذكية لإدارة المسارح وتعظيم الأرباح.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        addToast('تمت المشاركة بنجاح!', 'success');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          addToast('حدث خطأ أثناء المشاركة.', 'error');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        addToast('تم نسخ الرابط إلى الحافظة.', 'success');
      } catch (err) {
        addToast('فشل نسخ الرابط.', 'error');
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-900/30 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 relative">
          {/* Share Button Floating */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:top-0 md:translate-x-0">
            <button 
              onClick={handleShare}
              className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-electric-teal/50 hover:bg-electric-teal/5 px-6 py-3 rounded-2xl text-gray-400 hover:text-electric-teal transition-all group font-plex text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-sm"
            >
              <span>مشاركة الصفحة</span>
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-6">الميزات الرئيسية (The Big 5)</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            وداعاً لمدير التشغيل الذي يحمل اللاسلكي بيد.. وجدول الإكسل باليد الأخرى! 😄
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-[#112240] rounded-3xl border border-slate-800 hover:border-electric-teal/30 transition-all cursor-pointer relative overflow-hidden"
              onClick={onExploreProduct}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-electric-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal mb-8 group-hover:scale-110 transition-transform relative z-10 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{feature.name}</h3>
              <p className="text-gray-400 leading-relaxed mb-6 relative z-10">{feature.benefit}</p>
              <div className="w-12 h-1 bg-slate-800 group-hover:w-full transition-all duration-500 group-hover:bg-electric-teal relative z-10" />
            </div>
          ))}
          
          <div className="p-8 bg-amber-gold/5 rounded-3xl border border-amber-gold/20 flex flex-col justify-center items-center text-center group hover:bg-amber-gold/10 transition-all">
            <h3 className="text-xl font-bold text-amber-gold mb-4">هل تحتاج ميزات مخصصة؟</h3>
            <p className="text-gray-400 mb-8">نحن نطور حلولاً مخصصة لكبرى دور الأوبرا والمسارح الحكومية.</p>
            <button 
              onClick={onExploreProduct}
              className="text-amber-gold font-black border-b-2 border-amber-gold/30 hover:border-amber-gold transition-all text-sm uppercase tracking-widest pb-1"
            >
              استعرض التفاصيل التقنية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
