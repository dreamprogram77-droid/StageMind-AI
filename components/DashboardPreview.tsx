
import React, { useState, useEffect, useCallback } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Users, 
  CheckCircle2, 
  BarChart3,
  Loader2,
  Zap,
  FileDown,
  ChevronLeft,
  Settings2,
  Info,
  Maximize2,
  MousePointer2,
  Radar,
  RefreshCw,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '../App';

type VisMode = 'overview' | 'revenue' | 'crowd';

const INITIAL_OVERVIEW_DATA = [
  { name: '10:00', actual: 400, forecast: 450 },
  { name: '12:00', actual: 600, forecast: 580 },
  { name: '14:00', actual: 500, forecast: 520 },
  { name: '16:00', actual: 900, forecast: 850 },
  { name: '18:00', actual: 1200, forecast: 1100 },
  { name: '20:00', actual: 1800, forecast: 1750 },
  { name: '22:00', actual: 1400, forecast: 1500 },
];

const REVENUE_DATA = [
  { category: 'VIP', amount: 4500, lift: 15 },
  { category: 'ذهبية', amount: 3200, lift: 10 },
  { category: 'فضية', amount: 2100, lift: 8 },
  { category: 'شرفة', amount: 1800, lift: 12 },
  { category: 'عادية', amount: 1200, lift: 5 },
];

const CROWD_FLOW_DATA = [
  { name: 'بوابة 1', flow: 120, capacity: 150 },
  { name: 'بوابة 2', flow: 85, capacity: 100 },
  { name: 'بوابة 3', flow: 40, capacity: 100 },
  { name: 'بوابة 4', flow: 110, capacity: 120 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A]/95 border border-white/10 p-6 rounded-[32px] shadow-2xl backdrop-blur-3xl text-right min-w-[200px] ring-1 ring-white/10">
        <p className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] font-plex">{label}</p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-xs font-black text-gray-300 font-plex">
                  {entry.name === 'actual' ? 'الفعلي' : entry.name === 'forecast' ? 'المتوقع' : entry.name === 'flow' ? 'التدفق' : entry.name === 'capacity' ? 'السعة' : entry.payload.category || entry.name}
                </span>
              </div>
              <span className="text-sm font-black text-white tracking-tight font-plex">
                {entry.dataKey === 'amount' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
                {entry.dataKey === 'lift' ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const DashboardPreview: React.FC = () => {
  const [visMode, setVisMode] = useState<VisMode>('overview');
  const [isActivating, setIsActivating] = useState(false);
  const [isDynamicActive, setIsDynamicActive] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [overviewData, setOverviewData] = useState(INITIAL_OVERVIEW_DATA);
  const { addToast } = useToast();

  // Simulate Live Data updates
  useEffect(() => {
    let interval: number;
    if (isLive) {
      interval = window.setInterval(() => {
        setOverviewData(prev => 
          prev.map(d => ({
            ...d,
            actual: Math.max(0, d.actual + (Math.random() * 40 - 20))
          }))
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const handleActivateDynamic = async () => {
    if (isDynamicActive) {
      setIsDynamicActive(false);
      addToast('تم إيقاف التسعير الديناميكي.', 'info');
      return;
    }
    setIsActivating(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsActivating(false);
    setIsDynamicActive(true);
    addToast('تم تفعيل التسعير الديناميكي. الخوارزمية تراقب الطلب الآن.', 'success');
    setVisMode('revenue');
  };

  const handleLiveToggle = () => {
    setIsLive(!isLive);
    addToast(isLive ? 'تم إيقاف البث المباشر.' : 'تم تفعيل وضع البيانات الحية.', isLive ? 'info' : 'success');
  };

  const stats = [
    { id: 'crowd', label: 'تذاكر مباعة', val: '2,840', sub: 'سعة القاعة 3000', color: 'text-white', icon: <Activity className="w-5 h-5" />, details: 'زيادة 15% منذ الأمس', targetMode: 'overview' as VisMode },
    { id: 'revenue', label: 'عائد اليوم', val: '+$4,210', sub: 'نمو بنسبة 12%', color: 'text-electric-teal', icon: <DollarSign className="w-5 h-5" />, details: 'أعلى عائد للفئة VIP', targetMode: 'revenue' as VisMode },
    { id: 'occupancy', label: 'إشغال اللحظة', val: '88%', sub: 'مستقر تقنياً', color: 'text-white', icon: <Users className="w-5 h-5" />, details: 'توزيع متوازن للمقاعد', targetMode: 'crowd' as VisMode },
  ];

  return (
    <div className="space-y-12">
      {/* Interactive Mode Switcher & Live Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-full">
            <button 
                onClick={handleLiveToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black transition-all ${isLive ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-gray-500 hover:text-white border border-transparent'}`}
            >
                <RefreshCw className={`w-3 h-3 ${isLive ? 'animate-spin' : ''}`} />
                <span>{isLive ? 'LIVE STREAM' : 'STATIC MODE'}</span>
            </button>
            <div className="w-px h-4 bg-white/10" />
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">Data Engine V3.1</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-1.5 rounded-[32px] flex gap-2">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: <Activity className="w-4 h-4" /> },
            { id: 'revenue', label: 'استراتيجية الربح', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'crowd', label: 'ديناميكيات الحشود', icon: <Users className="w-4 h-4" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setVisMode(mode.id as VisMode)}
              className={`px-8 py-3 rounded-[24px] font-black text-xs font-plex flex items-center gap-3 transition-all duration-500 relative ${
                visMode === mode.id 
                  ? 'bg-electric-teal text-[#0A192F] shadow-[0_10px_30px_rgba(100,255,218,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-plex relative z-10">{mode.label}</span>
              <span className="relative z-10">{mode.icon}</span>
              {visMode === mode.id && <span className="absolute inset-0 bg-white/20 rounded-[24px] animate-pulse pointer-events-none" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex items-center justify-center">
           <button 
            onClick={handleActivateDynamic} 
            disabled={isActivating} 
            className={`group w-full h-full font-black rounded-[56px] text-sm transition-all py-10 flex flex-col items-center justify-center gap-4 shadow-2xl relative overflow-hidden active:scale-[0.97] border border-white/5 ${
              isDynamicActive 
                ? 'bg-green-500/5 border-green-500/20 text-green-500' 
                : 'bg-gradient-to-br from-electric-teal to-blue-600 text-[#0A192F] hover:shadow-[0_20px_60px_rgba(100,255,218,0.3)]'
            }`}
           >
             {isActivating ? <Loader2 className="w-12 h-12 animate-spin" /> : isDynamicActive ? (
               <> 
                <CheckCircle2 className="w-12 h-12 animate-bounce" /> 
                <span className="tracking-[0.2em] font-black uppercase text-[10px] font-plex">AI Dynamic Active</span> 
               </>
             ) : (
               <>
                <Zap className="w-12 h-12 group-hover:scale-125 transition-all duration-700 drop-shadow-2xl" />
                <span className="tracking-[0.1em] font-black text-lg font-plex">تفعيل التسعير الذكي</span>
               </>
             )}
             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-10" />
           </button>
        </div>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setVisMode(stat.targetMode)}
            className={`glass-card p-12 rounded-[56px] border shadow-2xl group transition-all duration-700 hover:-translate-y-2 text-right relative overflow-hidden cursor-pointer ${visMode === stat.targetMode ? 'border-electric-teal/30 bg-electric-teal/5' : 'border-white/5'}`}
          >
            {/* Reveal detail on hover */}
            <div className={`absolute inset-0 bg-[#0A192F]/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 transition-all duration-500 text-center z-20 ${hoveredCard === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
               <Info className="w-8 h-8 text-electric-teal mb-4 animate-pulse" />
               <p className="text-white font-black font-plex text-lg">{stat.details}</p>
               <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">انقر للتحليل التفصيلي</span>
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`p-4 bg-white/5 rounded-[22px] transition-all group-hover:scale-110 border border-white/5 shadow-xl ${visMode === stat.targetMode ? 'text-electric-teal' : 'text-gray-500'}`}>{stat.icon}</div>
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em] font-plex">{stat.label}</p>
            </div>
            <div className="flex items-end gap-4 justify-start flex-row-reverse relative z-10">
              <span className={`text-6xl font-black ${stat.color} tracking-tighter font-plex`}>{isLive && i === 0 ? Math.floor(parseInt(stat.val.replace(',','')) + Math.random()*10).toLocaleString() : stat.val}</span>
              <span className="text-[10px] text-green-500 font-black mb-3 flex items-center gap-2 flex-row-reverse bg-green-500/10 px-3 py-1 rounded-full font-plex">
                <TrendingUp className="w-4 h-4" />
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
        {/* Dynamic Chart Left */}
        <div className="glass-card p-14 rounded-[60px] border border-white/5 relative overflow-hidden group/chart shadow-3xl text-right animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="flex items-center justify-between mb-12 flex-row relative z-10">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-electric-teal shadow-[0_0_8px_rgba(100,255,218,1)]" /><span className="text-[10px] text-gray-500 font-black font-plex">الحالي</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600 border border-dashed border-white/20" /><span className="text-[10px] text-gray-500 font-black font-plex">المتوقع</span></div>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 opacity-60 font-plex">
                  {visMode === 'overview' ? 'محرك التنبؤ اللحظي' : visMode === 'revenue' ? 'نمذجة تحسين العائد' : 'تحليل حركة البوابات'}
                </h5>
                <h4 className="text-3xl font-black text-white tracking-tight font-plex">
                  {visMode === 'overview' ? 'توقعات الإقبال والطلب' : visMode === 'revenue' ? 'أداء التسعير اللحظي' : 'سرعة التدفق (Gate Velocity)'}
                </h4>
              </div>
           </div>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {visMode === 'overview' ? (
                  <AreaChart data={overviewData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area name="actual" type="monotone" dataKey="actual" stroke="#64FFDA" strokeWidth={5} fillOpacity={1} fill="url(#colorActual)" animationDuration={1000} isAnimationActive={!isLive} />
                    <Area name="forecast" type="monotone" dataKey="forecast" stroke="#475569" strokeWidth={2} strokeDasharray="10 10" fill="transparent" animationDuration={2000} />
                  </AreaChart>
                ) : visMode === 'revenue' ? (
                  <LineChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="stepAfter" dataKey="actual" stroke="#FFB400" strokeWidth={4} dot={{ r: 6, fill: '#FFB400', strokeWidth: 0 }} activeDot={{ r: 8, fill: '#FFB400', stroke: '#0A192F', strokeWidth: 4 }} name="العائد" />
                  </LineChart>
                ) : (
                  <BarChart data={CROWD_FLOW_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="flow" fill="#64FFDA" radius={[10, 10, 0, 0]} name="تدفق" animationDuration={1000} />
                    <Bar dataKey="capacity" fill="#1E293B" radius={[10, 10, 0, 0]} name="سعة" animationDuration={1500} />
                  </BarChart>
                )}
              </ResponsiveContainer>
           </div>
        </div>

        {/* Dynamic Insight Right */}
        <div className="glass-card p-14 rounded-[60px] border border-white/5 relative overflow-hidden group/chart shadow-3xl text-right animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
           <div className="flex items-center justify-between mb-12 flex-row relative z-10">
              <div className="bg-amber-gold/5 p-4 rounded-2xl border border-amber-gold/15">
                {visMode === 'overview' ? <BarChart3 className="w-8 h-8 text-amber-gold" /> : visMode === 'revenue' ? <Radar className="w-8 h-8 text-amber-gold animate-spin-slow" /> : <MapPin className="w-8 h-8 text-amber-gold" />}
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 opacity-60 font-plex">
                  {visMode === 'overview' ? 'توزيع العوائد اللحظية' : visMode === 'revenue' ? 'مصفوفة ذكاء الأسعار' : 'تحليل مناطق الضغط'}
                </h5>
                <h4 className="text-3xl font-black text-white tracking-tight font-plex">
                  {visMode === 'overview' ? 'الإيرادات حسب الفئة' : visMode === 'revenue' ? 'تحليل الرفع الربحي (Lift)' : 'إشغال المناطق (Live Map)'}
                </h4>
              </div>
           </div>
           <div className="h-[400px]">
              {visMode === 'crowd' ? (
                <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
                  {[
                    { zone: 'البوابة أ', occupancy: 92, status: 'خطر', color: 'bg-red-500' },
                    { zone: 'البوابة ب', occupancy: 45, status: 'مستقر', color: 'bg-green-500' },
                    { zone: 'منطقة المطاعم', occupancy: 78, status: 'تنبيه', color: 'bg-amber-500' },
                    { zone: 'الردهة الرئيسية', occupancy: 65, status: 'مستقر', color: 'bg-green-500' },
                  ].map((zone, idx) => (
                    <div key={idx} className="bg-white/5 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer group/zone">
                      <div className="flex justify-between items-center flex-row-reverse">
                        <span className="text-sm font-black text-white font-plex">{zone.zone}</span>
                        {zone.status === 'خطر' && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black flex-row-reverse">
                          <span className="text-gray-500">الإشغال اللحظي</span>
                          <span className={zone.occupancy > 80 ? 'text-red-500' : 'text-electric-teal'}>{zone.occupancy}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${zone.color} transition-all duration-1000 group-hover/zone:scale-x-105 origin-right`} style={{ width: `${zone.occupancy}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {visMode === 'overview' ? (
                    <BarChart data={REVENUE_DATA} layout="vertical" margin={{ right: 40, left: 40 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="category" type="category" stroke="#475569" fontSize={13} fontWeight="900" tickLine={false} axisLine={false} width={100} orientation="right" />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 255, 218, 0.03)' }} />
                      <Bar dataKey="amount" radius={[20, 0, 0, 20]} animationDuration={2500}>
                        {REVENUE_DATA.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={idx === 0 ? '#FFB400' : '#64FFDA'} fillOpacity={1 - (idx * 0.15)} />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <BarChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                      <XAxis dataKey="category" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                      <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="lift" fill="#FFB400" radius={[15, 15, 0, 0]} name="النمو المتوقع %" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              )}
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between pt-16 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <div className="flex gap-12 flex-row">
          <button className="text-[11px] font-black text-gray-600 hover:text-white transition-colors font-plex">إدارة أذونات العرض</button>
          <button onClick={() => addToast('جاري توليد التقرير...', 'info')} className="text-[11px] font-black text-electric-teal hover:text-white transition-all flex items-center gap-4 flex-row group font-plex">
            <FileDown className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            <span>تحميل تقرير الحالة اللحظي</span>
            <ChevronLeft className="w-4 h-4 translate-x-[-2px]" />
          </button>
        </div>
        <div className="flex items-center gap-6 text-[10px] text-gray-500 font-black uppercase tracking-[0.5em] flex-row font-plex">
          <span>StageMind Mission Control OS • Security Active</span>
          <Settings2 className="w-5 h-5 text-electric-teal" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
