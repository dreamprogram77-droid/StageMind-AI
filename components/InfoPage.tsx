
import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Mail, 
  Globe, 
  Users, 
  Briefcase, 
  BookOpen, 
  Clock, 
  Heart,
  ShieldCheck,
  Lock,
  Server,
  FileText,
  TrendingUp
} from 'lucide-react';

interface InfoPageProps {
  type: 'about' | 'blog' | 'jobs' | 'contact' | 'privacy' | 'terms' | 'security';
  onBack: () => void;
  onContact?: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ type, onBack, onContact }) => {
  const contentMap = {
    about: {
      title: "عن StageMind AI",
      subtitle: "نحن نبني الجسر بين فن المسرح العريق وتكنولوجيا المستقبل.",
      icon: <Users className="w-12 h-12 text-electric-teal" />,
      text: "ولدت StageMind AI من رحم شغف مزدوج: سحر خشبة المسرح وقوة البيانات الصامتة. نحن لسنا مجرد شركة برمجيات، بل شريك استراتيجي للمؤسسات الثقافية. فريقنا يجمع بين مهندسي ذكاء اصطناعي ومديري مسارح عالميين لضمان أن التكنولوجيا تخدم الفن ولا تطغى عليه. نؤمن بأن كل مقعد شاغر هو قصة لم تروَ، وهدفنا هو ضمان أن يصل كل عرض مسرحي إلى جمهوره المثالي بأقصى كفاءة ممكنة."
    },
    blog: {
      title: "المدونة التقنية",
      subtitle: "رؤى، أخبار، وتحليلات حول مستقبل صناعة المسرح الذكي.",
      icon: <BookOpen className="w-12 h-12 text-blue-400" />,
      text: "اكتشف كيف يغير الذكاء الاصطناعي وجه الثقافة. في مدونتنا، نشارك دراسات حالة من مسارح حقيقية، أحدث اتجاهات التسعير الديناميكي، وكيفية استخدام تحليلات الجمهور لبناء مواسم مسرحية ناجحة. ابقَ على اطلاع بآخر التحديثات في نظام Conductor OS."
    },
    jobs: {
      title: "انضم إلى الفريق",
      subtitle: "ساهم في صياغة مستقبل الفن العربي بمهاراتك التقنية.",
      icon: <Briefcase className="w-12 h-12 text-amber-gold" />,
      text: "في StageMind، نحن لا نبحث عن موظفين، بل عن 'قادة تحول'. إذا كان لديك شغف بالخوارزميات المعقدة أو بتصميم واجهات المستخدم المذهلة، وتريد أن ترى أثر عملك في كبرى دور الأوبرا والمهرجانات، فنحن نريد سماع صوتك. بيئة عملنا مرنة، طموحة، وتتمحور حول الابتكار المستمر."
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدة مؤسستك على البدء في رحلة التحول.",
      icon: <Mail className="w-12 h-12 text-purple-400" />,
      text: "لديك استفسار حول كيفية دمج نظامنا مع بنيتك التحتية؟ أو ترغب في استشارة تشغيلية متخصصة؟ فريق مهندسي الحلول لدينا متاح دائماً للإجابة على تساؤلاتك التقنية والتجارية. تواصل معنا اليوم لتحويل مسرحك إلى مسرح ذكي."
    },
    privacy: {
      title: "سياسة الخصوصية",
      subtitle: "خصوصية بياناتك وبيانات جمهورك هي أولويتنا القصوى.",
      icon: <Shield className="w-12 h-12 text-green-400" />,
      text: "نحن في StageMind AI ندرك حساسية البيانات في القطاع الثقافي. نلتزم بحماية كافة المعلومات الشخصية لجمهورك وشركائك وفقاً لأعلى المعايير العالمية (GDPR). بياناتك مشفرة بالكامل، ولا يتم بيعها أو مشاركتها مع أطراف ثالثة لأغراض تسويقية. أنت تملك بياناتك، ونحن نوفر لك الأدوات لتحليلها بأمان."
    },
    terms: {
      title: "شروط الاستخدام",
      subtitle: "الاتفاقية التي تضمن جودة الخدمة لجميع شركائنا.",
      icon: <FileText className="w-12 h-12 text-gray-400" />,
      text: "استخدام منصة StageMind يخضع لاتفاقية مستوى الخدمة (SLA) التي تضمن استمرارية التشغيل بنسبة 99.9%. تحدد هذه الشروط مسؤولياتنا تجاه حماية بياناتك، وآلية التحديثات المستمرة للنظام، وحقوق الملكية الفكرية للخوارزميات المطورة خصيصاً لمؤسستك."
    },
    security: {
      title: "أمن البيانات التقني",
      subtitle: "بنية تحتية محصنة ضد كافة التهديدات.",
      icon: <Lock className="w-12 h-12 text-red-400" />,
      text: "نظامنا مبني على هندسة أمنية صارمة. نستخدم تشفير AES-256 للبيانات الساكنة وTLS 1.3 للبيانات المتحركة. يتم استضافة بياناتنا في مراكز بيانات فائقة الأمان مع إجراء نسخ احتياطي لحظي وتلقائي. نقوم بإجراء اختبارات اختراق دورية لضمان أن حصوننا الرقمية لا تُخترق."
    }
  };

  const activeContent = contentMap[type];

  return (
    <div className="animate-in fade-in duration-1000 bg-[#0A192F] min-h-screen">
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-500 hover:text-electric-teal transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-electric-teal group-hover:bg-electric-teal/10 transition-all">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest font-plex">العودة للرئيسية</span>
          </button>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(100,255,218,0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-block p-6 bg-white/5 rounded-[32px] border border-white/5 shadow-2xl animate-bounce duration-[3000ms]">
              {activeContent.icon}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight font-plex">{activeContent.title}</h1>
            <p className="text-2xl md:text-3xl text-electric-teal font-bold leading-tight opacity-90 font-plex">{activeContent.subtitle}</p>
            
            <div className="bg-white/5 backdrop-blur-3xl p-12 md:p-16 rounded-[56px] border border-white/5 text-right relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-electric-teal to-transparent" />
               <p className="text-xl md:text-2xl text-gray-300 leading-[1.8] font-medium opacity-80">
                 {activeContent.text}
               </p>
               
               {type === 'contact' && (
                 <button 
                   onClick={onContact}
                   className="mt-12 bg-white text-[#0A192F] px-12 py-5 rounded-[22px] font-black text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all font-plex"
                 >
                   تواصل مع المبيعات الآن
                 </button>
               )}

               {type === 'blog' && (
                 <div className="grid md:grid-cols-2 gap-8 mt-16 text-right">
                    {[
                      { t: "كيف غير الذكاء الاصطناعي أوبرا دبي؟", d: "دراسة حالة شاملة حول تحسين التدفق الحركي وزيادة الأرباح.", c: <Activity className="w-4 h-4" /> },
                      /* Fix: Added TrendingUp to lucide-react imports */
                      { t: "أسرار التسعير الديناميكي للمسارح", d: "دليل عملي لمديري المسارح التجارية لتعظيم مبيعات التذاكر.", c: <TrendingUp className="w-4 h-4" /> }
                    ].map((blog, i) => (
                      <div key={i} className="bg-black/20 p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-2 justify-end text-gray-500 mb-4 group-hover:text-electric-teal transition-colors">
                           <span className="text-[10px] font-black font-plex">دراسة حالة</span>
                           {blog.c}
                        </div>
                        <h4 className="text-xl font-black text-white group-hover:text-electric-teal transition-colors mb-4 font-plex">{blog.t}</h4>
                        <p className="text-gray-500 text-sm font-plex">{blog.d}</p>
                      </div>
                    ))}
                 </div>
               )}

               {type === 'security' && (
                 <div className="grid md:grid-cols-3 gap-6 mt-16 text-center">
                    {[
                      { t: "تشفير AES-256", i: <Lock className="text-red-400" /> },
                      { t: "استضافة Tier 4", i: <Server className="text-blue-400" /> },
                      { t: "تحديثات لحظية", i: <ShieldCheck className="text-green-400" /> }
                    ].map((sec, i) => (
                      <div key={i} className="bg-black/20 p-8 rounded-[32px] border border-white/5">
                        <div className="flex justify-center mb-4">{sec.i}</div>
                        <p className="text-white font-black text-sm font-plex">{sec.t}</p>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="pt-20 flex flex-wrap justify-center gap-12 opacity-40">
               <div className="flex items-center gap-3">
                 <Globe className="w-5 h-5" />
                 <span className="text-xs font-black uppercase tracking-widest font-plex">نطاق عالمي</span>
               </div>
               <div className="flex items-center gap-3">
                 <Heart className="w-5 h-5" />
                 <span className="text-xs font-black uppercase tracking-widest font-plex">بكل فخر من دبي</span>
               </div>
               <div className="flex items-center gap-3">
                 <Sparkles className="w-5 h-5" />
                 <span className="text-xs font-black uppercase tracking-widest font-plex">أحدث التقنيات</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
);

export default InfoPage;
