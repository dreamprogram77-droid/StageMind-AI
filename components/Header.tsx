
import React, { useEffect, useState, useRef } from 'react';
import { Brain, Activity, Menu, X, Radio, Search, Command, Package, Lightbulb, Zap, DollarSign, Share2, Ticket } from 'lucide-react';
import { ViewType, useToast } from '../App';

interface HeaderProps {
  onBookDemo: () => void;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ onBookDemo, onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems: { label: string; view: ViewType; icon: React.ReactNode }[] = [
    { label: 'المنتج', view: 'product', icon: <Package className="w-4 h-4" /> },
    { label: 'الحلول', view: 'solutions', icon: <Lightbulb className="w-4 h-4" /> },
    { label: 'الميزات', view: 'features', icon: <Zap className="w-4 h-4" /> },
    { label: 'الأسعار', view: 'pricing', icon: <DollarSign className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToast(`جاري البحث عن: ${searchQuery}`, 'info');
    }
  };

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

  const handleShowDetails = () => {
    addToast('العرض الحالي: أوبرا عايدة - القاعة الكبرى (معدل الإشغال: 88%)', 'info');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] border-b ${
        isScrolled 
          ? 'bg-[#0A192F]/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 shrink-0">
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-4 group"
          >
            <div className={`p-3 rounded-[22px] transition-all duration-500 ${isScrolled ? 'bg-indigo-500/10' : 'bg-indigo-500/20'} group-hover:scale-110 group-hover:bg-indigo-500/30 shadow-lg group-hover:shadow-indigo-500/30 border border-white/5 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Brain className="text-indigo-400 w-8 h-8 relative z-10" />
            </div>
            <div className="flex flex-col items-start justify-center hidden sm:flex">
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-white font-plex">StageMind</span>
                <div className="relative flex items-center">
                   <div className="absolute -inset-2 bg-indigo-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                   <span className="text-[12px] font-black text-indigo-400 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:scale-110 group-hover:border-indigo-500/50 font-plex flex items-center justify-center tracking-widest uppercase">AI</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 shrink-0">
          {navItems.map((item) => (
            <button 
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`flex items-center gap-2 text-sm font-bold transition-all relative py-2 px-1 hover:text-white group font-plex ${
                currentView === item.view ? 'text-indigo-400' : 'text-gray-400'
              }`}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110 ${currentView === item.view ? 'text-indigo-400' : 'text-gray-500 group-hover:text-indigo-300'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full transition-all duration-500 ${
                currentView === item.view ? 'opacity-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
          
          {/* View Show Details Button */}
          <button 
            onClick={handleShowDetails}
            className="flex items-center gap-2 px-5 py-2.5 bg-electric-teal/10 text-electric-teal text-xs font-black rounded-xl border border-electric-teal/20 hover:bg-electric-teal/20 transition-all font-plex group shadow-lg active:scale-95"
          >
            <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>تفاصيل العرض</span>
          </button>
        </nav>

        {/* Search Bar - Center/Right Integration */}
        <div className="flex-1 max-w-lg hidden lg:block mx-4">
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative group flex-1">
              <div className={`absolute inset-0 bg-white/5 rounded-2xl transition-all duration-500 group-hover:bg-white/10 ${isSearchFocused ? 'ring-2 ring-indigo-500/50 bg-white/10' : ''}`} />
              <Search className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isSearchFocused ? 'text-indigo-400' : 'text-gray-500'}`} />
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="البحث عن عروض، تذاكر، أو عملاء..."
                className="w-full bg-transparent border-none py-3 pr-12 pl-16 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-0 font-plex text-right"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <Command className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 font-plex">K</span>
              </div>
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-10 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </form>
            <button 
              onClick={handleShare}
              title="مشاركة الصفحة"
              className="p-3 bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl text-gray-400 hover:text-indigo-400 transition-all duration-300 group shadow-lg"
            >
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button 
            onClick={() => handleNavClick('login')}
            className={`hidden sm:block text-sm font-black transition-colors py-2 font-plex ${isScrolled ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'}`}
          >
            دخول الأعضاء
          </button>
          <button 
            onClick={onBookDemo}
            className={`relative overflow-hidden px-4 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all active:scale-95 group font-plex shrink-0 ${
              isScrolled 
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10 shadow-lg' 
                : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]'
            }`}
          >
            <span className="relative z-10">احجز تجربة حية</span>
            {!isScrolled && <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />}
          </button>
          
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-[#0A192F]/98 backdrop-blur-3xl z-[200] md:hidden animate-in fade-in slide-in-from-top-4 duration-500 overflow-y-auto">
           <div className="p-8 flex flex-col gap-8 text-right">
              {/* Mobile Search & Share */}
              <div className="flex items-center gap-3 lg:hidden">
                <form onSubmit={handleSearchSubmit} className="relative group flex-1">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث..."
                    className="w-full bg-transparent border-none py-5 pr-14 pl-6 text-lg text-white placeholder:text-gray-500 focus:outline-none font-plex text-right"
                  />
                </form>
                <button 
                  onClick={handleShare}
                  className="p-5 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-indigo-400 transition-all"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <button 
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    className={`flex items-center justify-end gap-4 text-3xl font-black font-plex transition-colors ${currentView === item.view ? 'text-indigo-400' : 'text-white'}`}
                  >
                    <span>{item.label}</span>
                    <span className={`${currentView === item.view ? 'text-indigo-400' : 'text-gray-500'}`}>
                      {/* Fix: Cast item.icon to React.ReactElement<any> to allow className prop in cloneElement */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                    </span>
                  </button>
                ))}
                
                {/* Mobile Current Show Details Button */}
                <button 
                  onClick={() => { handleShowDetails(); setIsMobileMenuOpen(false); }}
                  className="flex items-center justify-end gap-4 text-3xl font-black font-plex text-electric-teal transition-colors"
                >
                  <span>العرض الحالي</span>
                  <Ticket className="w-8 h-8" />
                </button>
              </div>
              
              <div className="h-px bg-white/5 my-4" />
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleNavClick('login')}
                  className="text-xl font-black text-gray-500 font-plex text-right"
                >
                  دخول الأعضاء
                </button>
                <button 
                  onClick={onBookDemo}
                  className="bg-indigo-500 text-white py-6 rounded-[28px] text-xl font-black shadow-2xl shadow-indigo-500/20 font-plex active:scale-95 transition-all text-center"
                >
                  احجز عرض تجريبي
                </button>
              </div>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
