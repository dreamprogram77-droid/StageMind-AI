
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  CreditCard,
  Target,
  ShieldCheck,
  FileDown,
  Plus,
  MoreVertical,
  X,
  Loader2,
  Globe,
  Command,
  HelpCircle,
  BrainCircuit,
  Radio,
  GripVertical,
  Wallet,
  CheckCircle2,
  Download,
  Maximize2,
  Activity,
  Cpu,
  Layout,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Sparkle,
  Layers,
  Map as MapIcon,
  Navigation,
  Focus,
  DollarSign,
  PieChart,
  ArrowUp,
  History,
  PlusCircle,
  ShieldAlert,
  FileText,
  Lock,
  Monitor,
  Video,
  Play,
  Share2,
  AlertTriangle,
  Heart,
  Smartphone,
  EyeOff,
  Scan,
  Gauge,
  Timer,
  User,
  Tags,
  BarChart3,
  Rocket,
  Wand2,
  LineChart as LineChartIcon,
  MousePointer2,
  Settings2,
  Radar,
  Info,
  Layers3,
  Camera,
  SmartphoneNfc,
  Globe2,
  QrCode,
  ArrowRightLeft,
  RotateCcw,
  Ban,
  MonitorPlay,
  Flame,
  ZapOff,
  Database,
  RefreshCw,
  Waves,
  Mic2,
  Volume2,
  Wind,
  Smile,
  Navigation2,
  Star
} from 'lucide-react';
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
  PieChart as RePieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import DashboardPreview from './DashboardPreview';
import { useToast } from '../App';

interface DashboardPageProps {
  onLogout: () => void;
}

interface ExternalDataItem {
  id: string | number;
  name: string;
  value: string | number;
  status: string;
  lastUpdated: string;
}

interface EngagementMetrics {
  totalAudience: number;
  applauseIntensity: number;
  sentimentScore: number;
  focusLevel: number;
  energyVolatility: number[];
  sentimentHistory: { time: string; score: number }[];
}

interface SeatData {
  id: string;
  heat: number;
  occupied: boolean;
  status: 'available' | 'booked' | 'premium';
}

interface ClickedSeatInfo {
  seat: SeatData;
  x: number;
  y: number;
  zoneName: string;
  row: number;
  col: number;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'surge' | 'sales' | 'system';
  isRead: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A]/95 border border-white/10 p-6 rounded-[32px] shadow-2xl backdrop-blur-3xl text-right min-w-[200px]">
        <p className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] font-plex">{label}</p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-xs font-black text-gray-300 font-plex">
                  {entry.name === 'score' ? 'المؤشر' : entry.name}
                </span>
              </div>
              <span className="text-sm font-black text-white tracking-tight font-plex">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const KPICard: React.FC<{ 
  label: string; 
  val: string; 
  target: string;
  change: string; 
  icon: React.ReactNode; 
  themeColor: 'teal' | 'gold' | 'blue' | 'purple';
  data: { v: number }[];
  highlight?: boolean;
}> = ({ label, val, target, change, icon, themeColor, data, highlight }) => {
  const themes = {
    teal: { text: 'text-electric-teal', bg: 'bg-electric-teal/10', border: 'border-electric-teal/20', accent: '#64FFDA' },
    gold: { text: 'text-amber-gold', bg: 'bg-amber-gold/10', border: 'border-amber-gold/20', accent: '#FFB400' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', accent: '#60A5FA' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', accent: '#A78BFA' }
  };
  const theme = themes[themeColor];
  const isUp = change.includes('+');

  return (
    <div className={`glass-card p-8 rounded-[48px] border flex flex-col group hover:border-white/10 transition-all duration-700 shadow-3xl relative overflow-hidden h-full cursor-default text-right ${highlight ? 'border-amber-gold/30 shadow-[0_0_40px_rgba(255,180,0,0.1)]' : 'border-white/5'}`}>
      <div className="absolute inset-x-0 bottom-0 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={4} fill={theme.accent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-start justify-between mb-8 flex-row-reverse relative z-10">
        <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-all group-hover:scale-110 border shadow-2xl ${theme.bg} ${theme.text} ${theme.border}`}>{icon}</div>
        <div className={`px-3 py-1 rounded-full border border-white/5 font-black text-[10px] font-plex flex items-center gap-2 ${isUp ? 'text-green-400 bg-green-500/5' : 'text-blue-400 bg-blue-500/5'}`}>{isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{change}</div>
      </div>
      <div className="relative z-10 mb-6">
        <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-plex">{label}</p>
        <h3 className={`text-3xl md:text-5xl font-black tracking-tighter font-plex group-hover:scale-105 transition-all duration-500 origin-right whitespace-nowrap ${highlight ? 'text-amber-gold animate-pulse' : 'text-white'}`}>{val}</h3>
      </div>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between flex-row-reverse relative z-10">
        <div className="text-right">
          <p className="text-[9px] text-slate-400 font-bold font-plex uppercase tracking-widest">المستهدف اليومي</p>
          <p className="text-sm font-black text-white/80 font-plex">{target}</p>
        </div>
        {highlight && (
          <div className="flex items-center gap-2 bg-amber-gold/10 px-2 py-0.5 rounded-full border border-amber-gold/20">
             <Star className="w-2.5 h-2.5 text-amber-gold fill-amber-gold" />
             <span className="text-[8px] font-black text-amber-gold font-plex uppercase">AI Optimized</span>
          </div>
        )}
        {!highlight && <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-[9px] font-black text-gray-600 font-plex">LIVE</span></div>}
      </div>
    </div>
  );
};

interface TheatreZone {
  id: string;
  name: string;
  occupancy: number;
  revenue: string;
  heat: number; // 0 to 1
  capacity: number;
  seats: SeatData[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('الرئيسية');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedZone, setSelectedZone] = useState<TheatreZone | null>(null);
  const [clickedSeat, setClickedSeat] = useState<ClickedSeatInfo | null>(null);

  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(false);
  const [isActivatingPricing, setIsActivatingPricing] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: 'تحذير تدفق', message: 'ارتفاع مفاجئ في كثافة الجمهور عند البوابة 4.', time: 'منذ دقيقتين', type: 'surge', isRead: false },
    { id: 2, title: 'تنبيه مبيعات', message: 'معدل حجز عرض "أوبرا عايدة" أقل من المتوقع بنسبة 12%.', time: 'منذ ساعة', type: 'sales', isRead: true },
  ]);

  const [engagement, setEngagement] = useState<EngagementMetrics>({
    totalAudience: 2842,
    applauseIntensity: 84,
    sentimentScore: 78,
    focusLevel: 92,
    energyVolatility: [40, 65, 30, 85, 45, 90, 70],
    sentimentHistory: Array.from({ length: 10 }).map((_, i) => ({ time: `${19}:${10 + i}`, score: 70 + Math.random() * 15 }))
  });

  const [externalData, setExternalData] = useState<ExternalDataItem[]>([]);
  const [isFetchingExternal, setIsFetchingExternal] = useState(false);
  const [isAutoPolling, setIsAutoPolling] = useState(false);

  const { addToast } = useToast();

  const handleToggleDynamicPricing = async () => {
    if (isDynamicPricingActive) {
      setIsDynamicPricingActive(false);
      addToast('تم إيقاف التسعير الديناميكي.', 'info');
      return;
    }
    
    setIsActivatingPricing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsActivatingPricing(false);
    setIsDynamicPricingActive(true);
    addToast('تم تفعيل التسعير الديناميكي. الخوارزمية تراقب الطلب الآن.', 'success');
  };

  const handleFetchExternalData = async () => {
    setIsFetchingExternal(true);
    addToast('جاري استدعاء البيانات من المصدر الخارجي (API)...', 'info');
    
    try {
      await new Promise(r => setTimeout(r, 1500));
      const fallbackData: ExternalDataItem[] = [
        { id: "API-910", name: "نظام التذاكر (GCP)", value: "2,482 Sales", status: "متصل", lastUpdated: "الآن" },
        { id: "API-911", name: "حساسات البوابة الغربية", value: "94/min", status: "نشط", lastUpdated: "منذ دقيقتين" },
        { id: "API-912", name: "رادار المشاعر (Edge)", value: "78% Happy", status: "نشط", lastUpdated: "الآن" },
      ];
      setExternalData(fallbackData);
      addToast('تمت مزامنة البيانات الخارجية بنجاح.', 'success');
      setActiveTab('تكامل البيانات');
    } finally {
      setIsFetchingExternal(false);
    }
  };

  const menuItems = [
    { label: 'الرئيسية', icon: <Monitor className="w-5 h-5" /> },
    { label: 'تفاعل الجمهور', icon: <Activity className="w-5 h-5" /> },
    { label: 'إدارة العروض', icon: <Ticket className="w-5 h-5" /> },
    { label: 'إدارة التذاكر', icon: <Tags className="w-5 h-5" /> },
    { label: 'تكامل البيانات', icon: <Database className="w-5 h-5" /> },
    { label: 'الجمهور', icon: <Users className="w-5 h-5" /> },
    { label: 'العملاء', icon: <User className="w-5 h-5" /> },
    { label: 'التنبؤ بالإقبال', icon: <Target className="w-5 h-5" /> },
    { label: 'التسعير الديناميكي', icon: <Rocket className="w-5 h-5" /> },
    { label: 'مركز الأرباح', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const generateSeats = (count: number, baseHeat: number, zoneId: string) => {
    return Array.from({ length: count }).map((_, i) => {
      const heat = Math.min(1, baseHeat + (Math.random() * 0.4 - 0.2));
      const occupied = Math.random() < baseHeat;
      let status: 'available' | 'booked' | 'premium' = occupied ? 'booked' : 'available';
      if (!occupied && (zoneId.startsWith('v') || (zoneId === 'o1' && i < 20))) {
        status = 'premium';
      }
      return { id: `${zoneId}-s-${i}`, heat, occupied, status };
    });
  };

  const theatreZones: TheatreZone[] = useMemo(() => [
    { id: 'v1', name: 'جناح ملكي - يمين', occupancy: 100, revenue: '$12,400', heat: 0.95, capacity: 12, seats: generateSeats(12, 0.95, 'v1') },
    { id: 'v2', name: 'جناح ملكي - يسار', occupancy: 92, revenue: '$11,200', heat: 0.88, capacity: 12, seats: generateSeats(12, 0.92, 'v2') },
    { id: 'o1', name: 'الأوركسترا - مقدمة', occupancy: 98, revenue: '$45,000', heat: 0.98, capacity: 64, seats: generateSeats(64, 0.98, 'o1') },
    { id: 'o2', name: 'الأوركسترا - وسط', occupancy: 84, revenue: '$38,500', heat: 0.72, capacity: 96, seats: generateSeats(96, 0.84, 'o2') },
    { id: 'o3', name: 'الأوركسترا - خلفية', occupancy: 70, revenue: '$22,000', heat: 0.55, capacity: 120, seats: generateSeats(120, 0.70, 'o3') },
    { id: 'b1', name: 'الشرفة الأولى', occupancy: 88, revenue: '$28,400', heat: 0.82, capacity: 80, seats: generateSeats(80, 0.88, 'b1') },
    { id: 'b2', name: 'الشرفة الثانية', occupancy: 62, revenue: '$12,500', heat: 0.40, capacity: 100, seats: generateSeats(100, 0.62, 'b2') },
  ], []);

  const handleSeatClick = (seat: SeatData, x: number, y: number, zoneName: string, row: number, col: number) => {
    if (clickedSeat?.seat.id === seat.id) {
      setClickedSeat(null);
    } else {
      setClickedSeat({ seat, x, y, zoneName, row, col });
    }
  };

  const SeatGrid: React.FC<{ 
    seats: SeatData[]; 
    cols: number; 
    size?: 'sm' | 'md'; 
    zoneName: string;
    onSeatClick?: (seat: SeatData, x: number, y: number, zoneName: string, row: number, col: number) => void;
  }> = ({ seats, cols, size = 'md', zoneName, onSeatClick }) => {
    return (
      <div className={`grid p-1 ${size === 'sm' ? 'gap-0.5' : 'gap-1.5'}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {seats.map((seat, index) => {
          const intensity = Math.floor(seat.heat * 10) * 10;
          let colorClass = "bg-slate-400/20";
          if (seat.occupied) {
            if (intensity >= 90) colorClass = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
            else if (intensity >= 70) colorClass = "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.4)]";
            else if (intensity >= 40) colorClass = "bg-amber-400";
            else colorClass = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]";
          } else if (seat.status === 'premium') {
            colorClass = "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]";
          }
          
          const isSelected = clickedSeat?.seat.id === seat.id;
          const rowNum = Math.floor(index / cols) + 1;
          const colNum = (index % cols) + 1;

          return (
            <button 
              key={seat.id} 
              onClick={(e) => {
                e.stopPropagation();
                if (onSeatClick) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  // For the global positioning to work with fixed coordinates:
                  onSeatClick(seat, rect.left + rect.width / 2, rect.top, zoneName, rowNum, colNum);
                }
              }}
              className={`${size === 'sm' ? 'w-1.5 h-1.5' : 'w-3 h-3 md:w-4 md:h-4'} rounded-full transition-all duration-700 ${colorClass} ${isSelected ? 'scale-[2.5] z-20 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse' : 'hover:scale-[1.8] hover:z-10'} active:scale-90 cursor-pointer focus:outline-none focus:ring-1 focus:ring-electric-teal`}
            />
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setClickedSeat(null);
      setIsNotificationsOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const sparklineData = Array.from({ length: 10 }).map(() => ({ v: 30 + Math.random() * 40 }));

  const renderAudienceView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 glass-card p-8 md:p-12 rounded-[56px] border border-white/5 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-12 flex-row-reverse relative z-10">
              <div className="text-right">
                <h3 className="text-3xl font-black text-white font-plex">خريطة الإشغال والحرارة التفاعلية</h3>
                <p className="text-gray-500 text-xs font-bold font-plex mt-1 uppercase tracking-widest">Real-time Seat Heatmap & Analysis</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-plex">Live Hall Sensors</span>
                 </div>
                 <div className="hidden sm:flex items-center gap-4 bg-black/20 px-6 py-2 rounded-full border border-white/5">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-600" /><span className="text-[9px] font-bold text-gray-500 font-plex">ذروة</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500" /><span className="text-[9px] font-bold text-gray-500 font-plex">عالٍ</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[9px] font-bold text-gray-500 font-plex">طبيعي</span></div>
                 </div>
              </div>
           </div>

           <div className="relative bg-[#1E293B]/40 rounded-[48px] border border-white/5 p-8 md:p-16 aspect-[16/11] flex flex-col items-center justify-start overflow-hidden shadow-inner custom-scrollbar overflow-y-auto">
              <div className="w-3/4 h-12 bg-gradient-to-b from-slate-700/40 to-transparent rounded-b-[80px] mb-16 relative flex items-center justify-center border-t border-slate-600/30 flex-shrink-0">
                 <div className="absolute top-0 w-full h-px bg-electric-teal/40 blur-sm shadow-[0_0_20px_rgba(100,255,218,0.3)]" />
                 <span className="text-[12px] font-black text-slate-300 uppercase tracking-[1em] font-plex translate-y-[-2px]">THE STAGE / الخشبة</span>
              </div>
              
              <div className="flex-1 w-full space-y-16 max-w-5xl">
                 <div className="flex justify-between px-16">
                    {theatreZones.slice(0, 2).map((zone) => (
                      <div key={zone.id} className="p-4 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col items-center gap-3">
                         <span className="text-[9px] font-black text-amber-gold font-plex uppercase tracking-widest">{zone.name}</span>
                         <SeatGrid seats={zone.seats} cols={4} zoneName={zone.name} onSeatClick={handleSeatClick} />
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-4 w-full">
                       {theatreZones.slice(2, 5).map((zone) => (
                         <div key={zone.id} className="rounded-[40px] border border-white/5 bg-white/[0.01] flex flex-col items-center p-6 relative overflow-hidden">
                            <span className="text-[10px] font-black text-slate-400 font-plex text-center mb-6 uppercase tracking-widest">{zone.name}</span>
                            <SeatGrid seats={zone.seats} cols={zone.id === 'o1' ? 8 : zone.id === 'o2' ? 12 : 15} zoneName={zone.name} onSeatClick={handleSeatClick} />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
           <div className="p-10 bg-[#1E293B]/40 border border-white/5 rounded-[44px]">
              <h4 className="text-xl font-black text-white font-plex mb-10">التركيبة الديموغرافية</h4>
              <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                       <Pie data={[{v:45, name: 'شباب'},{v:30, name: 'عائلات'},{v:25, name: 'سياح'}]} dataKey="v" innerRadius={70} outerRadius={90} paddingAngle={8}>
                          <Cell fill="#64FFDA" /><Cell fill="#A78BFA" /><Cell fill="#FFB400" />
                       </Pie>
                       <Tooltip content={<CustomTooltip />} />
                    </RePieChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-row overflow-hidden font-cairo selection:bg-electric-teal/30">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed lg:relative inset-y-0 right-0 w-72 md:w-80 bg-[#070D17] border-l border-white/5 flex flex-col z-50 transition-all duration-500 shadow-[-60px_0_120px_rgba(0,0,0,0.8)] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 md:p-12 flex items-center gap-4 md:gap-5 border-b border-white/5 mb-6 md:mb-10 justify-end group cursor-pointer transition-all relative z-10 text-right">
          <div><span className="text-xl md:text-2xl font-black text-white tracking-tighter group-hover:text-electric-teal transition-colors font-plex">StageMind <span className="text-electric-teal">AI</span></span><p className="text-[8px] md:text-[9px] text-gray-500 font-black uppercase tracking-[0.4em] mt-1.5 opacity-40 font-plex">ENTERPRISE OS 3.1</p></div>
          <div className="bg-electric-teal/5 p-3 rounded-2xl border border-electric-teal/10 group-hover:bg-electric-teal group-hover:text-[#0A192F] transition-all duration-700 shadow-2xl"><Zap className="w-6 h-6 fill-current" /></div>
        </div>
        <nav className="flex-1 px-4 md:px-8 space-y-2 relative z-10 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => { setActiveTab(item.label); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center justify-start gap-4 md:gap-5 px-4 md:px-6 py-4 rounded-2xl transition-all duration-500 relative group overflow-hidden flex-row-reverse text-right active:scale-95 ${activeTab === item.label ? 'bg-white/5 text-electric-teal font-black shadow-inner border border-white/5' : 'text-gray-500 hover:bg-white/5 hover:text-white font-bold opacity-60'}`}>
              <span className="text-sm md:text-base tracking-wide font-plex flex-1">{item.label}</span>
              <div className={`transition-all duration-500 ${activeTab === item.label ? 'scale-125 text-electric-teal drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]' : 'group-hover:scale-110 opacity-40 group-hover:opacity-100'}`}>{item.icon}</div>
              {activeTab === item.label && <div className="absolute right-0 top-3 bottom-3 w-1 bg-electric-teal rounded-full animate-pulse" />}
            </button>
          ))}
        </nav>
        <div className="p-6 md:p-10 space-y-4 border-t border-white/5 bg-black/30 relative z-10">
           <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-3 md:py-5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all font-black text-xs font-plex group shadow-inner">إنهاء الجلسة الآمنة<LogOut className="w-4 h-4" /></button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#0F223D_0%,#0A192F_100%)] relative">
        <header className="h-20 md:h-28 bg-[#0A192F]/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 md:px-16 z-40 relative shadow-2xl">
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }} className="lg:hidden p-3 text-gray-400 hover:text-white transition-all bg-white/5 border border-white/10 rounded-xl active:scale-95"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 rounded-xl border border-green-500/10 backdrop-blur-3xl shadow-inner group cursor-help">
              <span className="text-[8px] md:text-[11px] text-green-500 font-black uppercase tracking-[0.2em] font-plex">Engine Live</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-row relative z-10">
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }}
                className={`p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative group ${isNotificationsOpen ? 'text-electric-teal border-electric-teal/30' : 'text-gray-400'}`}
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0A192F] shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer bg-white/5 pl-3 pr-4 py-2 rounded-[16px] border border-white/5 hover:bg-white/10 transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white font-plex">محمد آل علي</p>
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.1em] opacity-40 font-plex">Ops Conductor</p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-electric-teal to-blue-600 flex items-center justify-center font-black text-[#0A192F] shadow-2xl text-[10px] md:sm font-plex">MA</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 xl:p-16 space-y-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
             <div className="flex gap-4 w-full lg:w-auto justify-center lg:justify-start">
               <button onClick={() => setIsExporting(true)} className="relative bg-white text-[#0A192F] px-8 py-4 rounded-[20px] font-black text-sm md:text-base hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all flex items-center gap-3 active:scale-95">
                 <span className="relative z-10 flex items-center gap-3">{isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />} {isExporting ? `جاري التصدير...` : 'تصدير التقارير الاستراتيجية'}</span>
               </button>
             </div>
             <div className="text-right space-y-3 relative z-10 w-full lg:w-auto">
               <div className="flex items-center gap-3 justify-end text-gray-500 font-black text-[9px] uppercase tracking-[0.2em] mb-2 opacity-50 font-plex">
                  <span className="text-electric-teal bg-electric-teal/5 px-3 py-1 rounded-full border border-electric-teal/10">{activeTab}</span>
                  <ChevronLeft className="w-3 h-3 translate-x-1" />
                  <span>مركز التحكم التشغيلي</span>
               </div>
               <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-white tracking-tighter flex items-center gap-4 justify-end font-plex drop-shadow-2xl">{activeTab === 'الرئيسية' ? 'غرفة العمليات المركزية' : activeTab}</h1>
             </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {activeTab === 'الرئيسية' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <div className="md:col-span-2 xl:col-span-4"><div className="flex flex-col md:flex-row-reverse p-10 lg:p-14 items-center justify-between gap-8 bg-[#112240]/40 rounded-[56px] border border-white/5 relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-electric-teal/20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(100,255,218,0.08),transparent)] pointer-events-none" /><div className="flex items-center gap-8 flex-row relative z-10 flex-col md:flex-row"><div className="relative"><div className="w-24 h-24 bg-electric-teal rounded-[36px] flex items-center justify-center text-[#0A192F] shadow-[0_0_80px_rgba(100,255,218,0.4)] transition-transform group-hover:scale-110 duration-700 relative overflow-hidden"><BrainCircuit className="w-12 h-12" /></div></div><div className="text-right"><h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-plex drop-shadow-2xl">StageMind Conductor™</h2><p className="text-gray-400 text-sm md:text-xl font-medium leading-relaxed max-w-xl font-plex italic">"أهلاً بك يا محمد. القاعة جاهزة للعرض القادم، يمكنك الآن تفعيل التسعير الذكي لرفع كفاءة العوائد."</p></div></div><div className="flex flex-wrap gap-6 relative z-10 flex-row-reverse justify-center"><button onClick={handleToggleDynamicPricing} className={`px-10 py-5 rounded-[24px] text-sm font-black transition-all flex items-center gap-4 font-plex shadow-xl relative overflow-hidden active:scale-95 border ${isDynamicPricingActive ? 'bg-amber-gold text-[#0A192F] border-amber-gold/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>{isDynamicPricingActive ? <Zap className="w-5 h-5 fill-current animate-pulse" /> : <Zap className="w-5 h-5 text-amber-gold group-hover:scale-125 transition-transform" />}<span>{isDynamicPricingActive ? 'التسعير الديناميكي نشط' : 'تفعيل التسعير الذكي'}</span></button></div></div></div>
                <div className="md:col-span-1 h-full"><KPICard label="صافي العائد لكل مقعد" val="$242" target="$210" change="+14.2%" icon={<TrendingUp className="w-7 h-7" />} themeColor="gold" data={sparklineData} /></div>
                <div className="md:col-span-1 h-full"><KPICard label="معدل الإشغال اللحظي" val="88.4%" target="85.0%" change="+5.1%" icon={<Users className="w-7 h-7" />} themeColor="teal" data={sparklineData} /></div>
                <div className="md:col-span-1 h-full"><KPICard label="دقة التنبؤ اللحظي" val="96.4%" target="94.0%" change="مستقر" icon={<Target className="w-7 h-7" />} themeColor="purple" data={sparklineData} /></div>
                <div className="md:col-span-1 h-full"><KPICard label="حالة أمان النظام" val="محصن" target="Secure" change="Active" icon={<ShieldCheck className="w-7 h-7" />} themeColor="blue" data={sparklineData} /></div>
                <div className="md:col-span-2 xl:col-span-1 glass-card p-10 rounded-[56px] border border-white/5 shadow-2xl relative overflow-hidden group/seats"><div className="flex items-center justify-between mb-8 flex-row-reverse relative z-10"><h4 className="text-lg font-black text-white font-plex">كثافة المقاعد</h4><Navigation2 className="w-5 h-5 text-electric-teal -rotate-45" /></div><div className="flex flex-col gap-6"><div className="bg-black/20 rounded-[32px] p-4 flex flex-col items-center justify-center border border-white/5"><div className="w-full h-4 bg-slate-700/30 rounded-b-2xl mb-6 flex items-center justify-center"><span className="text-[7px] text-slate-500 font-black tracking-[0.5em] uppercase font-plex">Stage</span></div><div className="flex flex-col gap-2 scale-90 origin-top"><div className="flex justify-between w-full gap-4"><SeatGrid seats={theatreZones[0].seats} cols={4} size="sm" zoneName={theatreZones[0].name} onSeatClick={handleSeatClick} /><SeatGrid seats={theatreZones[1].seats} cols={4} size="sm" zoneName={theatreZones[1].name} onSeatClick={handleSeatClick} /></div><SeatGrid seats={theatreZones[2].seats} cols={8} size="sm" zoneName={theatreZones[2].name} onSeatClick={handleSeatClick} /><SeatGrid seats={theatreZones[3].seats} cols={12} size="sm" zoneName={theatreZones[3].name} onSeatClick={handleSeatClick} /></div></div><button onClick={() => setActiveTab('الجمهور')} className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all font-plex">عرض الخريطة الكاملة</button></div></div>
                <div className="md:col-span-2 xl:col-span-3 glass-card p-10 rounded-[56px] border border-white/5 shadow-3xl text-right relative overflow-hidden"><div className="flex items-center justify-between mb-12 flex-row relative z-10"><div className="bg-electric-teal/10 px-4 py-2 rounded-xl border border-electric-teal/20 text-electric-teal flex items-center gap-2"><div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,218,0.5)]" /><span className="text-[10px] font-black uppercase tracking-widest font-plex">AI Monitoring Live</span></div><h3 className="text-2xl font-black text-white font-plex tracking-tight">لوحة المؤشرات التشغيلية</h3></div><DashboardPreview /></div>
              </div>
            ) : activeTab === 'الجمهور' ? (
              renderAudienceView()
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-12 animate-in fade-in zoom-in duration-1000">
                <div className="relative p-16 bg-[#112240]/40 rounded-[64px] border border-white/10 backdrop-blur-3xl shadow-3xl group cursor-help"><Loader2 className="w-28 h-28 text-electric-teal animate-spin" /></div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-5xl font-black text-white tracking-tight font-plex">{activeTab}</h2>
                  <p className="text-gray-400 max-w-2xl text-xl font-medium leading-relaxed opacity-70 font-plex">نظام الحوسبة اللحظية يقوم الآن بمعالجة البيانات الضخمة لهذا القسم. <br /><span className="text-electric-teal/60 text-sm font-bold tracking-widest uppercase mt-4 block">Analyzing Operational Nodes...</span></p>
                </div>
              </div>
            )}

            {/* SEAT INSPECTOR TOOLTIP - Enhanced with context and stopPropagation */}
            {clickedSeat && (
              <div 
                className="fixed z-[100] -translate-x-1/2 -translate-y-[115%] mb-4 animate-in zoom-in-95 duration-200 pointer-events-none"
                style={{ left: clickedSeat.x, top: clickedSeat.y }}
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0A192F]/95 backdrop-blur-3xl border border-white/20 p-6 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] min-w-[280px] text-right pointer-events-auto border-b-electric-teal/40 border-b-4 relative"
                >
                  <div className="flex items-center justify-between mb-5 flex-row-reverse border-b border-white/10 pb-4">
                    <div className="flex flex-col items-end">
                      <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-plex leading-none mb-1">{clickedSeat.zoneName}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-black text-white font-plex">صف {clickedSeat.row}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-lg font-black text-electric-teal font-plex">مقعد {clickedSeat.col}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setClickedSeat(null); }}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-500 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                      <div className="flex items-center justify-between flex-row-reverse bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold font-plex">الحالة التشغيلية</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border flex items-center gap-2 ${clickedSeat.seat.status === 'booked' ? 'text-red-400 bg-red-400/10 border-red-400/20' : clickedSeat.seat.status === 'premium' ? 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' : 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'}`}>
                            {clickedSeat.seat.status === 'booked' ? 'محجوز' : clickedSeat.seat.status === 'premium' ? 'مقعد مميز' : 'متاح'}
                            {clickedSeat.seat.status === 'booked' ? <Lock className="w-3 h-3" /> : clickedSeat.seat.status === 'premium' ? <Star className="w-3 h-3 fill-current" /> : <CheckCircle2 className="w-3 h-3" />}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 px-1">
                        <div className="flex items-center justify-between flex-row-reverse">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-bold font-plex">مؤشر الطلب (Demand)</span>
                            <Flame className={`w-3 h-3 ${clickedSeat.seat.heat > 0.7 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
                          </div>
                          <span className={`text-xs font-black font-plex ${clickedSeat.seat.heat > 0.8 ? 'text-red-500' : clickedSeat.seat.heat > 0.4 ? 'text-amber-gold' : 'text-electric-teal'}`}>
                            {Math.round(clickedSeat.seat.heat * 100)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div 
                            className={`h-full transition-all duration-1000 ${clickedSeat.seat.heat > 0.8 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : clickedSeat.seat.heat > 0.4 ? 'bg-amber-gold shadow-[0_0_10px_rgba(255,180,0,0.5)]' : 'bg-electric-teal shadow-[0_0_10px_rgba(100,255,218,0.5)]'}`} 
                            style={{ width: `${clickedSeat.seat.heat * 100}%` }} 
                           />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="bg-amber-gold/5 border border-amber-gold/10 p-4 rounded-2xl">
                          <div className="flex items-center gap-2 justify-end mb-2">
                            <span className="text-[9px] font-black text-amber-gold font-plex uppercase tracking-widest">تحليل الذكاء الاصطناعي</span>
                            <BrainCircuit className="w-3.5 h-3.5 text-amber-gold" />
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                            {clickedSeat.seat.status === 'booked' 
                              ? 'تم حجز المقعد لعميل مخلص. العائد التشغيلي المحقق مستدام.' 
                              : clickedSeat.seat.heat > 0.6 
                                ? 'يتوقع النظام حجز هذا المقعد بنسبة 85% خلال الساعة القادمة.' 
                                : 'كثافة الطلب منخفضة حالياً لهذا الموقع. يُنصح بالانتظار.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between flex-row-reverse">
                         <div className="text-right">
                           <p className="text-[9px] text-gray-500 font-bold font-plex">السعر المقترح</p>
                           <p className="text-2xl font-black text-white font-plex tracking-tight">${Math.round(50 + clickedSeat.seat.heat * 100)}</p>
                         </div>
                         <div className="flex gap-2">
                           <button className="px-5 py-3 bg-white text-[#0A192F] font-black text-[11px] rounded-xl transition-all hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)] active:scale-95 font-plex">تعديل الفئة</button>
                         </div>
                      </div>
                  </div>
                  <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-electric-teal/40" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
