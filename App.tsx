
import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainStrip from './components/PainStrip';
import Solution from './components/Solution';
import Features from './components/Features';
import DashboardPreview from './components/DashboardPreview';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import SolutionsPage from './components/SolutionsPage';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import AuthPage from './components/AuthPage';
import AIAssistant from './components/AIAssistant';
import DashboardPage from './components/DashboardPage';
import InfoPage from './components/InfoPage';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export type ViewType = 'home' | 'product' | 'solutions' | 'features' | 'pricing' | 'login' | 'signup' | 'dashboard' | 'about' | 'blog' | 'jobs' | 'contact' | 'privacy' | 'terms' | 'security';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContext = createContext<{
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

const App: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [view, setView] = useState<ViewType>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('dashboard');
    addToast('تم تسجيل الدخول بنجاح. أهلاً بك في لوحة التحكم.', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
    addToast('تم تسجيل الخروج بنجاح.', 'info');
  };

  const renderView = () => {
    if (isLoggedIn && view === 'dashboard') {
      return <DashboardPage onLogout={handleLogout} />;
    }

    switch (view) {
      case 'product':
        return <ProductPage onBack={() => setView('home')} onBookDemo={() => setIsDemoOpen(true)} />;
      case 'solutions':
        return <SolutionsPage onBookDemo={() => setIsDemoOpen(true)} />;
      case 'features':
        return <FeaturesPage onBookDemo={() => setIsDemoOpen(true)} />;
      case 'pricing':
        return <PricingPage onBookDemo={() => setIsDemoOpen(true)} />;
      case 'login':
        return <AuthPage mode="login" onSwitch={() => setView('signup')} onBack={() => setView('home')} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <AuthPage mode="signup" onSwitch={() => setView('login')} onBack={() => setView('home')} onLoginSuccess={handleLoginSuccess} />;
      case 'about':
        return <InfoPage type="about" onBack={() => setView('home')} />;
      case 'blog':
        return <InfoPage type="blog" onBack={() => setView('home')} />;
      case 'jobs':
        return <InfoPage type="jobs" onBack={() => setView('home')} />;
      case 'contact':
        return <InfoPage type="contact" onBack={() => setView('home')} onContact={() => setIsDemoOpen(true)} />;
      case 'privacy':
        return <InfoPage type="privacy" onBack={() => setView('home')} />;
      case 'terms':
        return <InfoPage type="terms" onBack={() => setView('home')} />;
      case 'security':
        return <InfoPage type="security" onBack={() => setView('home')} />;
      default:
        return (
          <>
            <Hero onBookDemo={() => setIsDemoOpen(true)} />
            <PainStrip />
            <Solution onExplore={() => setView('solutions')} />
            <Features onExploreProduct={() => setView('features')} />
            
            <section id="preview" className="py-24 bg-slate-900/50">
              <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-electric-teal">لمحة من داخل النظام</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  تصميم يقلل "الإدراك الذهني"؛ كل شيء متاح بضغطة واحدة لإدارة مسرحك باحترافية.
                </p>
              </div>
              <DashboardPreview />
            </section>
          </>
        );
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="min-h-screen font-amiri bg-[#0A192F] text-[#E6F1FF] selection:bg-electric-teal/30">
        {view !== 'login' && view !== 'signup' && view !== 'dashboard' && (
          <Header 
            onBookDemo={() => setIsDemoOpen(true)} 
            onNavigate={(v) => setView(v as ViewType)}
            currentView={view}
          />
        )}
        
        <main className={view === 'login' || view === 'signup' || view === 'dashboard' ? '' : 'pt-20'}>
          {renderView()}
          <ContactForm isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        </main>

        {view !== 'login' && view !== 'signup' && view !== 'dashboard' && (
          <Footer onNavigate={(v) => setView(v as ViewType)} />
        )}

        {/* Toasts Container */}
        <div className="fixed bottom-8 right-8 z-[200] space-y-4 max-w-sm w-full pointer-events-none">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 ${
                toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 flex-shrink-0" />}
              <p className="text-sm font-bold flex-1 text-right">{toast.message}</p>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* AI Assistant - Floating Component */}
        <AIAssistant />

        {/* Scroll To Top Button */}
        <ScrollToTop />
      </div>
    </ToastContext.Provider>
  );
};

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-28 left-8 z-50 w-12 h-12 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full flex items-center justify-center text-gray-400 hover:text-electric-teal hover:border-electric-teal transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <X className="w-6 h-6 rotate-45" />
    </button>
  );
};

export default App;
