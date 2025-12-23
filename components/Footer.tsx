
import React from 'react';
import { Brain, Twitter, Linkedin, Github } from 'lucide-react';
import { ViewType } from '../App';

interface FooterProps {
  onNavigate?: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A192F] pt-24 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-electric-teal/10 rounded-xl">
                <Brain className="text-electric-teal w-8 h-8" />
              </div>
              <span className="text-2xl font-black text-white">StageMind AI</span>
            </button>
            <p className="text-gray-400 leading-relaxed mb-8">
              من الحدس إلى البيانات.. الذكاء الاصطناعي في خدمة المسرح العربي والعالمي لتقديم تجارب لا تُنسى.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-electric-teal hover:text-[#0A192F] transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-electric-teal hover:text-[#0A192F] transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-electric-teal hover:text-[#0A192F] transition-all"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-6 text-white uppercase text-xs tracking-[0.3em] opacity-50">المنتج</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><button onClick={() => onNavigate?.('product')} className="hover:text-electric-teal transition-colors text-right">كيف يعمل؟</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-electric-teal transition-colors text-right">التسعير الديناميكي</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-electric-teal transition-colors text-right">توقعات الجمهور</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-electric-teal transition-colors text-right">إدارة الحشود</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 text-white uppercase text-xs tracking-[0.3em] opacity-50">المؤسسة</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><button onClick={() => onNavigate?.('about')} className="hover:text-electric-teal transition-colors text-right">من نحن</button></li>
              <li><button onClick={() => onNavigate?.('blog')} className="hover:text-electric-teal transition-colors text-right">المدونة</button></li>
              <li><button onClick={() => onNavigate?.('jobs')} className="hover:text-electric-teal transition-colors text-right">الوظائف</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-electric-teal transition-colors text-right">اتصل بنا</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 text-white uppercase text-xs tracking-[0.3em] opacity-50">قانوني</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><button onClick={() => onNavigate?.('privacy')} className="hover:text-electric-teal transition-colors text-right">سياسة الخصوصية</button></li>
              <li><button onClick={() => onNavigate?.('terms')} className="hover:text-electric-teal transition-colors text-right">شروط الاستخدام</button></li>
              <li><button onClick={() => onNavigate?.('security')} className="hover:text-electric-teal transition-colors text-right">أمن البيانات</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} STAGEMIND AI ENTERPRISE. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
             تم التطوير بكل ❤️ لخدمة الفن والمسرح العربي.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
