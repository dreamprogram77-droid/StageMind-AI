
import React, { useState } from 'react';
import { Brain, ArrowRight, Mail, Lock, Building2, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onSwitch: () => void;
  onBack: () => void;
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onSwitch, onBack, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    theatreName: '',
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.includes('@')) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 رموز على الأقل';
    if (mode === 'signup' && !formData.theatreName) newErrors.theatreName = 'اسم المسرح مطلوب';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // محاكاة الاتصال والتحقق من البيانات
    await new Promise(r => setTimeout(r, 1500)); 
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0A192F] animate-in fade-in duration-500">
      {/* Form Section */}
      <div className="flex items-center justify-center p-8 md:p-12 order-2 lg:order-1 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-electric-teal/5 rounded-full blur-[80px]" />
        
        <div className="w-full max-w-md relative z-10 text-right">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors group flex-row-reverse"
          >
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
            <span className="text-xs font-black uppercase tracking-widest">العودة للرئيسية</span>
          </button>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6 justify-end">
              <h1 className="text-2xl font-black">StageMind <span className="text-electric-teal">AI</span></h1>
              <div className="bg-electric-teal/10 p-3 rounded-2xl">
                <Brain className="text-electric-teal w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-2">
              {mode === 'login' ? 'دخول الأعضاء' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-gray-400">
              {mode === 'login' 
                ? 'مرحباً بعودتك! ادخل لمتابعة أداء مسرحك لحظياً.' 
                : 'ابدأ رحلة التحول الرقمي لمسرحك اليوم.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2 block">الاسم بالكامل</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text"
                      className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl pr-12 pl-4 py-4 focus:outline-none focus:border-electric-teal text-white transition-all text-right"
                      placeholder="أحمد علي"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2 block">اسم المسرح / المؤسسة</label>
                  <div className="relative">
                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text"
                      className={`w-full bg-slate-800/40 border ${errors.theatreName ? 'border-red-500' : 'border-slate-700'} rounded-2xl pr-12 pl-4 py-4 focus:outline-none focus:border-electric-teal text-white transition-all text-right`}
                      placeholder="دار الأوبرا الوطنية"
                      value={formData.theatreName}
                      onChange={(e) => setFormData({...formData, theatreName: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2 block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email"
                  className={`w-full bg-slate-800/40 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-2xl pr-12 pl-4 py-4 focus:outline-none focus:border-electric-teal text-white transition-all text-right`}
                  placeholder="name@theatre.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {errors.email && <div className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1 justify-end"><AlertCircle className="w-3 h-3" />{errors.email}</div>}
            </div>

            <div className="space-y-2 text-right">
              <div className="flex justify-between items-center mb-1 flex-row-reverse">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">كلمة المرور</label>
                {mode === 'login' && <button type="button" className="text-[10px] text-electric-teal hover:underline font-bold">نسيت كلمة المرور؟</button>}
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full bg-slate-800/40 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-2xl pr-12 pl-12 py-4 focus:outline-none focus:border-electric-teal text-white transition-all text-right`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-electric-teal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <div className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1 justify-end"><AlertCircle className="w-3 h-3" />{errors.password}</div>}
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-electric-teal text-[#0A192F] font-black py-5 rounded-2xl hover:shadow-[0_0_40px_rgba(100,255,218,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 mt-10"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'login' ? 'تسجيل الدخول' : 'بدء الاشتراك'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-8">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button 
                type="button"
                onClick={onSwitch}
                className="text-electric-teal font-black mr-2 hover:underline"
              >
                {mode === 'login' ? 'سجل مؤسستك الآن' : 'سجل دخولك'}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Visual Section */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/20 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1469&auto=format&fit=crop" 
          alt="Theatre Hall" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        />
        
        <div className="relative z-20 flex flex-col justify-end p-20 text-right">
           <blockquote className="max-w-xl">
             <p className="text-4xl font-black text-white leading-tight mb-8">
               "البيانات هي النص البرمجي الذي يوجه عرضك نحو النجاح."
             </p>
             <footer className="text-electric-teal font-bold text-xl">
               — مهندس تشغيل، أوبرا دبي
             </footer>
           </blockquote>
           
           <div className="mt-20 flex gap-8 flex-row-reverse">
              <div className="text-right">
                <p className="text-3xl font-black text-white">99.9%</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">وقت التشغيل</p>
              </div>
              <div className="w-px h-12 bg-slate-800" />
              <div className="text-right">
                <p className="text-3xl font-black text-white">256-bit</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">تشفير البيانات</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
