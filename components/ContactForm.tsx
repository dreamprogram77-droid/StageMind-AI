
import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  organization: string;
  seats: string;
  email: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    organization: 'دار أوبرا',
    seats: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'يرجى إدخال الاسم بالكامل';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }

    if (formData.seats && parseInt(formData.seats) <= 0) {
      newErrors.seats = 'سعة المسرح يجب أن تكون رقماً موجباً';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // محاكاة إرسال البيانات للـ API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // إغلاق بعد نجاح العملية
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({ fullName: '', organization: 'دار أوبرا', seats: '', email: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // مسح الخطأ عند الكتابة
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name as keyof FormState];
        return newErrs;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-[#0A192F]/95 backdrop-blur-2xl" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-electric-teal/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-electric-teal" />
            </div>
            <h3 className="text-3xl font-black mb-4">تم استلام طلبك!</h3>
            <p className="text-gray-400">سيتواصل معك فريق مهندسي الحلول لدينا خلال 24 ساعة لجدولة العرض المباشر.</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-electric-teal/10 rounded-2xl mb-6">
            <Loader2 className={`w-6 h-6 text-electric-teal ${isSubmitting ? 'animate-spin' : ''}`} />
          </div>
          <h2 className="text-3xl font-black mb-4">احجز عرض تجريبي مخصص</h2>
          <p className="text-gray-400">انضم لأكثر المسارح ذكاءً في العالم العربي وابدأ رحلة التحول الرقمي.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">الاسم بالكامل</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full bg-slate-800/50 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-electric-teal/20 focus:border-electric-teal text-white transition-all`} 
                  placeholder="أحمد علي"
                />
                {errors.fullName && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-[10px] font-bold">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">الجهة / المؤسسة</label>
              <div className="relative">
                <select 
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-electric-teal/20 focus:border-electric-teal text-white appearance-none cursor-pointer"
                >
                  <option>دار أوبرا</option>
                  <option>مسرح خاص</option>
                  <option>جهة حكومية</option>
                  <option>مهرجان ثقافي</option>
                  <option>أخرى</option>
                </select>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">سعة المسرح (مقعد)</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className={`w-full bg-slate-800/50 border ${errors.seats ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-electric-teal/20 focus:border-electric-teal text-white transition-all`} 
                  placeholder="مثلاً: 500"
                />
                {errors.seats && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-[10px] font-bold">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.seats}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-electric-teal/20 focus:border-electric-teal text-white transition-all`} 
                  placeholder="name@theatre.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-[10px] font-bold">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            disabled={isSubmitting}
            className={`w-full bg-electric-teal text-[#0A192F] font-black py-5 rounded-3xl hover:shadow-[0_0_40px_rgba(100,255,218,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري معالجة الطلب...</span>
              </>
            ) : (
              'أريد تحويل مسرحي إلى مسرح ذكي'
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            بياناتك مشفرة وفق معايير AES-256
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
