
import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, X, MessageSquare, Sparkles, Loader2, Minimize2, User, ChevronLeft } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'مرحباً بك! أنا مساعد StageMind الذكي. كيف يمكنني مساعدتك في تحسين عمليات مسرحك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customMsg?: string) => {
    const userMessage = (customMsg || input).trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `أنت مساعد StageMind AI، خبير تقني وتشغيلي متخصص في إدارة المسارح ودور الأوبرا.
          مهمتك هي مساعدة مديري المسارح في:
          1. تحسين الإيرادات عبر التسعير الديناميكي.
          2. إدارة الحشود ومنع التكدس.
          3. تحليل سلوك الجمهور.
          أجب بلغة مهنية، عربية فصحى حديثة، وكن مختصراً وعملياً.
          إذا سألك المستخدم عن ميزات StageMind، ركز على (Audience Intelligence, Dynamic Pricing, Demand Forecasting, Crowd Ops).
          استخدم الرموز التعبيرية بشكل طفيف لتعزيز الودية.`,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || 'عذراً، واجهت مشكلة في معالجة طلبك. حاول مرة أخرى.';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'حدث خطأ في الاتصال بالدماغ الصناعي. يرجى التأكد من اتصالك بالإنترنت.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "كيف أزيد مبيعات التذاكر؟",
    "نصائح لتجنب زحام المداخل",
    "شرح التسعير الديناميكي",
    "تحليل سلوك الجمهور"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[200] w-20 h-20 bg-gradient-to-br from-electric-teal to-blue-500 text-[#0A192F] rounded-[32px] shadow-[0_20px_50px_rgba(100,255,218,0.4)] flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-all group animate-bounce duration-[2000ms]"
      >
        <div className="absolute inset-0 rounded-[32px] bg-electric-teal animate-ping opacity-20" />
        <Brain className="w-10 h-10 relative z-10" />
        <span className="absolute -top-14 right-0 bg-slate-900 text-electric-teal text-[10px] font-black py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-electric-teal/30 shadow-2xl">اسأل المساعد الذكي 🧠</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 left-8 z-[200] w-[420px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMinimized ? 'h-20 translate-y-12' : 'h-[650px]'} flex flex-col bg-[#0F172A]/90 backdrop-blur-2xl border border-slate-800 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden animate-in slide-in-from-bottom-20`}>
      {/* Dynamic Header */}
      <div className="p-6 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-electric-teal to-blue-400 p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-5 h-5 text-[#0A192F]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0F172A] animate-pulse" />
          </div>
          <div className="text-right">
            <h4 className="text-sm font-black text-white leading-none mb-1">عقل StageMind</h4>
            <span className="text-[10px] text-electric-teal font-black uppercase tracking-widest">محرك Gemini 3 نشط</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-gray-500 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all">
            <Minimize2 className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white hover:bg-red-500/20 rounded-xl transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Interface */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[85%] group relative ${
                  msg.role === 'user' 
                    ? 'order-1' 
                    : 'order-2'
                }`}>
                  <div className={`px-5 py-4 rounded-[28px] text-sm leading-relaxed shadow-xl ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-electric-teal to-blue-500 text-[#0A192F] font-bold rounded-tl-none' 
                      : 'bg-slate-800/60 text-gray-200 border border-slate-800 rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black uppercase tracking-widest text-gray-500 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'user' ? 'تم الإرسال' : 'استجابة ذكية'}
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/40 px-6 py-4 rounded-[28px] border border-slate-800 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">يفكر الآن...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions / Suggestions */}
          {messages.length < 5 && (
            <div className="px-6 pb-4">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3 text-right">استفسارات شائعة</p>
              <div className="flex flex-wrap gap-2 justify-end">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSendMessage(s)}
                    className="text-[11px] font-bold bg-slate-800/50 hover:bg-electric-teal hover:text-[#0A192F] border border-slate-800 text-gray-400 px-4 py-2 rounded-2xl transition-all duration-300 flex items-center gap-2 flex-row-reverse group"
                  >
                    <span>{s}</span>
                    <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input Area */}
          <div className="p-6 bg-slate-900/50 border-t border-slate-800 backdrop-blur-3xl">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اسأل خبير StageMind..."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-3xl pr-6 pl-14 py-5 text-sm focus:outline-none focus:border-electric-teal focus:ring-4 focus:ring-electric-teal/5 text-white transition-all placeholder:text-gray-500 text-right"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-gradient-to-r from-electric-teal to-blue-500 text-[#0A192F] rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-30 disabled:grayscale disabled:hover:scale-100"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 -rotate-45 ml-0.5" />}
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
              <div className="h-px flex-1 bg-slate-800" />
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">StageMind AI Security Tier 1</p>
              <div className="h-px flex-1 bg-slate-800" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
