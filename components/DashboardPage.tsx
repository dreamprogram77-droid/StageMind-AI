
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
  Star,
  Coins,
  Settings as SettingsIcon,
  Move,
  Sliders
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
import DashboardWidget from './DashboardWidget';
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

interface SeatData {
  id: string;
  heat: number;
  occupied: boolean;
  status: 'available' | 'booked' | 'premium';
}

interface TheatreZone {
  id: string;
  name: string;
  occupancy: number;
  revenue: string;
  heat: number;
  capacity: number;
  seats: SeatData[];
}

interface ClickedSeatInfo {
  seat: SeatData;
  x: number;
  y: number;
  zoneName: string;
  row: number;
  col: number;
}

interface WidgetConfig {
  id: string;
  title: string;
  visible: boolean;
  showTrend?: boolean;
  showChart?: boolean;
  showFooter?: boolean;
}

const STORAGE_KEY = 'stagemind_dashboard_v3_state';

const DEFAULT_LAYOUT: WidgetConfig[] = [
  { id: 'revenue', title: 'العائد المتوقع', visible: true, showTrend: true, showChart: true, showFooter: true },
  { id: 'booking', title: 'معدل الحجز', visible: true, showTrend: true, showChart: true, showFooter: true },
  { id: 'gates', title: 'ضغط التدفق', visible: true, showTrend: true, showChart: true, showFooter: true },
  { id: 'accuracy', title: 'دقة التنبؤ', visible: true, showTrend: true, showChart: true, showFooter: true },
  { id: 'seats', title: 'كثافة المقاعد', visible: true },
  { id: 'indicators', title: 'المؤشرات التشغيلية', visible: true },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('الرئيسية');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [clickedSeat, setClickedSeat] = useState<ClickedSeatInfo | null>(null);
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
  
  const [widgetLayout, setWidgetLayout] = useState<WidgetConfig[]>(DEFAULT_LAYOUT);

  const { addToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setWidgetLayout(parsed);
      } catch (e) { console.error('Layout state load failed', e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgetLayout));
  }, [widgetLayout]);

  const toggleWidgetVisibility = (id: string) => {
    setWidgetLayout(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
  };

  const updateWidgetConfig = (id: string, updates: Partial<WidgetConfig>) => {
    setWidgetLayout(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const handleResetLayout = () => {
    if (window.confirm('إعادة تعيين الواجهة للإعدادات الافتراضية الموصى بها؟')) {
      setWidgetLayout(DEFAULT_LAYOUT);
      addToast('تمت استعادة التخطيط القياسي.', 'info');
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedWidgetId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedWidgetId === id) return;

    const newLayout = [...widgetLayout];
    const draggedIndex = newLayout.findIndex(w => w.id === draggedWidgetId);
    const targetIndex = newLayout.findIndex(w => w.id === id);

    const [draggedItem] = newLayout.splice(draggedIndex, 1);
    newLayout.splice(targetIndex, 0, draggedItem);
    setWidgetLayout(newLayout);
  };

  const handleDragEnd = () => setDraggedWidgetId(null);

  const menuItems = [
    { label: 'الرئيسية', icon: <Monitor className="w-5 h-5" /> },
    { label: 'تفاعل الجمهور', icon: <Activity className="w-5 h-5" /> },
    { label: 'إدارة العروض', icon: <Ticket className="w-5 h-5" /> },
    { label: 'تكامل البيانات', icon: <Database className="w-5 h-5" /> },
    { label: 'الجمهور', icon: <Users className="w-5 h-5" /> },
    { label: 'التسعير الديناميكي', icon: <Rocket className="w-5 h-5" /> },
  ];

  const generateSeats = (count: number, baseHeat: number, zoneId: string) => {
    return Array.from({ length: count }).map((_, i) => {
      const heat = Math.min(1, baseHeat + (Math.random() * 0.4 - 0.2));
      const occupied = Math.random() < baseHeat;
      let status: 'available' | 'booked' | 'premium' = occupied ? 'booked' : 'available';
      if (!occupied && (zoneId.startsWith('v') || (zoneId === 'o1' && i < 20))) status = 'premium';
      return { id: `${zoneId}-s-${i}`, heat, occupied, status };
    });
  };

  const theatreZones: TheatreZone[] = useMemo(() => [
    { id: 'v1', name: 'جناح ملكي - يمين', occupancy: 100, revenue: '$12,400', heat: 0.95, capacity: 12, seats: generateSeats(12, 0.95, 'v1') },
    { id: 'v2', name: 'جناح ملكي - يسار', occupancy: 92, revenue: '$11,200', heat: 0.88, capacity: 12, seats: generateSeats(12, 0.92, 'v2') },
    { id: 'o1', name: 'الأوركسترا - مقدمة', occupancy: 98, revenue: '$45,000', heat: 0.98, capacity: 64, seats: generateSeats(64, 0.98, 'o1') },
    { id: 'o2', name: 'الأوركسترا - وسط', occupancy: 84, revenue: '$38,500', heat: 0.72, capacity: 96, seats: generateSeats(96, 0.84, 'o2') },
    { id: 'o3', name: 'الأوركسترا - خلفية', occupancy: 70, revenue: '$22,000', heat: 0.55, capacity: 120, seats: generateSeats(120, 0.70, 'o3') },
  ], []);

  const handleSeatClick = (seat: SeatData, x: number, y: number, zoneName: string, row: number, col: number) => {
    setClickedSeat(clickedSeat?.seat.id === seat.id ? null : { seat, x, y, zoneName, row, col });
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
          const isSelected = clickedSeat?.seat.id === seat.id;
          let colorClass = "bg-slate-400/20";
          if (seat.occupied) {
            if (seat.heat > 0.9) colorClass = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
            else if (seat.heat > 0.7) colorClass = "bg-orange-500";
            else colorClass = "bg-emerald-400";
          } else if (seat.status === 'premium') colorClass = "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]";
          
          return (
            <button key={seat.id} onClick={(e) => { e.stopPropagation(); if (onSeatClick) { const rect = e.currentTarget.getBoundingClientRect(); onSeatClick(seat, rect.left + rect.width / 2, rect.top, zoneName, Math.floor(index / cols) + 1, (index % cols) + 1); } }} className={`${size === 'sm' ? 'w-1.5 h-1.5' : 'w-3 h-3 md:w-4 md:h-4'} rounded-full transition-all duration-700 ${colorClass} ${isSelected ? 'scale-[2.5] z-20 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse' : 'hover:scale-[1.8] hover:z-10'} active:scale-90 cursor-pointer focus:outline-none`} />
          );
        })}
      </div>
    );
  };

  const renderWidget = (widget: WidgetConfig) => {
    if (!widget.visible && !isEditMode) return null;

    const editOverlay = isEditMode && (
      <div 
        draggable
        onDragStart={(e) => handleDragStart(e, widget.id)}
        onDragOver={(e) => handleDragOver(e, widget.id)}
        onDragEnd={handleDragEnd}
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[32px] md:rounded-[56px] transition-all cursor-move border-2 border-dashed ${draggedWidgetId === widget.id ? 'opacity-20 scale-95 border-electric-teal' : 'opacity-100 border-white/10 hover:border-white/30'}`}
      >
        <div className="bg-[#0A192F] p-5 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center gap-4">
          <div className="p-3 bg-electric-teal/10 rounded-2xl text-electric-teal"><Move className="w-8 h-8 animate-pulse" /></div>
          <div className="flex flex-col gap-2 w-full min-w-[120px]">
            <button onClick={() => toggleWidgetVisibility(widget.id)} className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${widget.visible ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
              {widget.visible ? 'إخفاء' : 'إظهار'}
            </button>
            <button onClick={() => setIsConfigOpen(true)} className="w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 text-white border border-white/10">التفاصيل</button>
          </div>
        </div>
      </div>
    );

    const containerClass = `relative h-full transition-all duration-500 ${!widget.visible ? 'opacity-20 grayscale' : ''}`;

    switch (widget.id) {
      case 'revenue':
        return (
          <div key={widget.id} className={containerClass}>
            {editOverlay}
            <DashboardWidget title="العائد المتوقع" value="$42,150" trend={{ value: "+18%", isUp: true }} icon={<Coins className="w-6 h-6" />} variant="gold" subValue="المتبقي للهدف: $8,000" footerText="Dynamic Pricing V3" showTrend={widget.showTrend} showChart={widget.showChart} showFooter={widget.showFooter} />
          </div>
        );
      case 'booking':
        return (
          <div key={widget.id} className={containerClass}>
            {editOverlay}
            <DashboardWidget title="معدل الحجز" value="84%" trend={{ value: "+5.4%", isUp: true }} icon={<Ticket className="w-6 h-6" />} variant="teal" subValue="زيادة في فئة VIP" footerText="Sales Engine Live" showTrend={widget.showTrend} showChart={widget.showChart} showFooter={widget.showFooter} />
          </div>
        );
      case 'gates':
        return (
          <div key={widget.id} className={containerClass}>
            {editOverlay}
            <DashboardWidget title="ضغط التدفق" value="Low" icon={<Activity className="w-6 h-6" />} variant="blue" subValue="البوابات مستقرة" footerText="Gate Monitor" showTrend={widget.showTrend} showChart={widget.showChart} showFooter={widget.showFooter} />
          </div>
        );
      case 'accuracy':
        return (
          <div key={widget.id} className={containerClass}>
            {editOverlay}
            <DashboardWidget title="دقة التنبؤ AI" value="96.8%" icon={<Target className="w-6 h-6" />} variant="purple" subValue="تحديث مستمر" footerText="Neural Model" showTrend={widget.showTrend} showChart={widget.showChart} showFooter={widget.showFooter} />
          </div>
        );
      case 'seats':
        return (
          <div key={widget.id} className={`${containerClass} md:col-span-2 xl:col-span-1`}>
            {editOverlay}
            <div className="glass-card p-10 rounded-[56px] border border-white/5 shadow-2xl relative overflow-hidden group/seats h-full">
              <div className="flex items-center justify-between mb-8 flex-row-reverse relative z-10 text-right">
                <h4 className="text-lg font-black text-white font-plex">كثافة المقاعد</h4>
                <Navigation2 className="w-5 h-5 text-electric-teal -rotate-45" />
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-black/20 rounded-[32px] p-4 flex flex-col items-center justify-center border border-white/5">
                  <div className="w-full h-4 bg-slate-700/30 rounded-b-2xl mb-6 flex items-center justify-center"><span className="text-[7px] text-slate-500 font-black tracking-[0.5em] uppercase">Stage</span></div>
                  <div className="flex flex-col gap-2 scale-90 origin-top overflow-hidden">
                    <div className="flex justify-between w-full gap-4">
                      <SeatGrid seats={theatreZones[0].seats} cols={4} size="sm" zoneName={theatreZones[0].name} onSeatClick={handleSeatClick} />
                      <SeatGrid seats={theatreZones[1].seats} cols={4} size="sm" zoneName={theatreZones[1].name} onSeatClick={handleSeatClick} />
                    </div>
                    <SeatGrid seats={theatreZones[2].seats} cols={8} size="sm" zoneName={theatreZones[2].name} onSeatClick={handleSeatClick} />
                  </div>
                </div>
                <button onClick={() => setActiveTab('الجمهور')} className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 font-plex">الخريطة الكاملة</button>
              </div>
            </div>
          </div>
        );
      case 'indicators':
        return (
          <div key={widget.id} className={`${containerClass} md:col-span-2 xl:col-span-3`}>
            {editOverlay}
            <div className="glass-card p-10 rounded-[56px] border border-white/5 shadow-3xl text-right relative overflow-hidden h-full">
              <div className="flex items-center justify-between mb-12 flex-row relative z-10">
                <div className="bg-electric-teal/10 px-4 py-2 rounded-xl border border-electric-teal/20 text-electric-teal flex items-center gap-2">
                  <div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,218,0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Monitoring Live</span>
                </div>
                <h3 className="text-2xl font-black text-white font-plex tracking-tight">المؤشرات التشغيلية</h3>
              </div>
              <DashboardPreview />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-row overflow-hidden font-cairo selection:bg-electric-teal/30">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed lg:relative inset-y-0 right-0 w-80 bg-[#070D17] border-l border-white/5 flex flex-col z-50 transition-all duration-500 shadow-[-60px_0_120px_rgba(0,0,0,0.8)] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-12 flex items-center gap-5 border-b border-white/5 mb-10 justify-end text-right">
          <div><span className="text-2xl font-black text-white font-plex">StageMind <span className="text-electric-teal">AI</span></span><p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.4em] mt-1.5 opacity-40">ENTERPRISE OS 3.1</p></div>
          <div className="bg-electric-teal/5 p-3 rounded-2xl border border-electric-teal/10"><Zap className="w-6 h-6 fill-current text-electric-teal" /></div>
        </div>
        <nav className="flex-1 px-8 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => { setActiveTab(item.label); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center justify-start gap-5 px-6 py-4 rounded-2xl transition-all flex-row-reverse text-right active:scale-95 ${activeTab === item.label ? 'bg-white/5 text-electric-teal font-black border border-white/5' : 'text-gray-500 hover:bg-white/5 font-bold opacity-60'}`}>
              <span className="text-base font-plex flex-1">{item.label}</span>
              <div className={`${activeTab === item.label ? 'scale-125 text-electric-teal' : ''}`}>{item.icon}</div>
            </button>
          ))}
        </nav>
        <div className="p-10 border-t border-white/5 bg-black/30"><button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-5 rounded-xl text-gray-500 hover:text-red-400 transition-all font-black text-xs font-plex">إنهاء الجلسة الآمنة<LogOut className="w-4 h-4" /></button></div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#0F223D_0%,#0A192F_100%)]">
        <header className="h-28 bg-[#0A192F]/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-16 z-40 shadow-2xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 text-gray-400 bg-white/5 border border-white/10 rounded-xl"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 rounded-xl border border-green-500/10">
              <span className="text-[11px] text-green-500 font-black uppercase tracking-[0.2em]">Engine Live</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-row relative z-10">
            <button className="p-4 rounded-xl bg-white/5 border border-white/10 relative text-gray-400">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 bg-white/5 pl-3 pr-4 py-2 rounded-[16px] border border-white/5 text-right">
              <div className="hidden sm:block">
                <p className="text-xs font-black text-white">محمد آل علي</p>
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.1em]">Ops Conductor</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-teal to-blue-600 flex items-center justify-center font-black text-[#0A192F]">MA</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-12 xl:p-16 space-y-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
             <div className="flex gap-4 w-full lg:w-auto justify-center lg:justify-start">
               <div className="flex items-center gap-2">
                 <button onClick={() => setIsEditMode(!isEditMode)} className={`relative px-8 py-4 rounded-[20px] font-black text-sm transition-all flex items-center gap-3 active:scale-95 border ${isEditMode ? 'bg-electric-teal text-[#0A192F] border-electric-teal' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                   {isEditMode ? <CheckCircle2 className="w-5 h-5" /> : <SettingsIcon className="w-5 h-5" />}
                   <span>{isEditMode ? 'حفظ التخطيط' : 'تخصيص الواجهة'}</span>
                 </button>
                 {isEditMode && (
                   <div className="flex gap-2 animate-in slide-in-from-left duration-300">
                     <button onClick={() => setIsConfigOpen(true)} className="p-4 bg-white/5 border border-white/10 text-white rounded-[20px] hover:bg-white/10 transition-all"><Sliders className="w-5 h-5" /></button>
                     <button onClick={handleResetLayout} className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[20px] hover:bg-red-500/20 transition-all"><RefreshCcw className="w-5 h-5" /></button>
                   </div>
                 )}
               </div>
               <button onClick={() => setIsExporting(true)} className="relative bg-white text-[#0A192F] px-8 py-4 rounded-[20px] font-black text-sm active:scale-95 flex items-center gap-3">
                 {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />}
                 <span>{isExporting ? `جاري التصدير...` : 'تصدير التقارير'}</span>
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
              <div className="space-y-8">
                <div className="w-full">
                  <div className="flex flex-col md:flex-row-reverse p-10 lg:p-14 items-center justify-between gap-8 bg-[#112240]/40 rounded-[56px] border border-white/5 relative overflow-hidden group shadow-2xl">
                    <div className="flex items-center gap-8 flex-row relative z-10 flex-col md:flex-row">
                      <div className="w-24 h-24 bg-electric-teal rounded-[36px] flex items-center justify-center text-[#0A192F] shadow-[0_0_80px_rgba(100,255,218,0.4)]"><BrainCircuit className="w-12 h-12" /></div>
                      <div className="text-right">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-plex">StageMind Conductor™</h2>
                        <p className="text-gray-400 text-sm md:text-xl font-medium max-w-xl font-plex italic">"أهلاً بك يا محمد. القاعة جاهزة للعرض القادم، يمكنك الآن تفعيل التسعير الذكي لرفع كفاءة العوائد."</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">{widgetLayout.map((widget) => renderWidget(widget))}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-12 animate-in fade-in duration-1000">
                <div className="p-16 bg-[#112240]/40 rounded-[64px] border border-white/10 backdrop-blur-3xl"><Loader2 className="w-28 h-28 text-electric-teal animate-spin" /></div>
                <div className="space-y-6"><h2 className="text-5xl font-black text-white font-plex">{activeTab}</h2><p className="text-gray-400 text-xl font-plex">جاري معالجة البيانات الضخمة...</p></div>
              </div>
            )}
          </div>
        </div>
      </main>

      {isConfigOpen && (
        <div