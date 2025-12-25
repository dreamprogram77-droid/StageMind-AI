
import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, LucideIcon } from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ReactNode;
  variant?: 'teal' | 'gold' | 'blue' | 'purple';
  footerText?: string;
  isLoading?: boolean;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  subValue,
  trend,
  icon,
  variant = 'teal',
  footerText,
  isLoading = false
}) => {
  const variants = {
    teal: {
      accent: 'text-electric-teal',
      bg: 'bg-electric-teal/5',
      border: 'border-electric-teal/20',
      glow: 'shadow-[0_0_30px_rgba(100,255,218,0.1)]'
    },
    gold: {
      accent: 'text-amber-gold',
      bg: 'bg-amber-gold/5',
      border: 'border-amber-gold/20',
      glow: 'shadow-[0_0_30px_rgba(255,180,0,0.1)]'
    },
    blue: {
      accent: 'text-blue-400',
      bg: 'bg-blue-400/5',
      border: 'border-blue-400/20',
      glow: 'shadow-[0_0_30px_rgba(96,165,250,0.1)]'
    },
    purple: {
      accent: 'text-purple-400',
      bg: 'bg-purple-400/5',
      border: 'border-purple-400/20',
      glow: 'shadow-[0_0_30px_rgba(167,139,250,0.1)]'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`glass-card p-6 rounded-[32px] border transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden ${currentVariant.border} ${currentVariant.glow}`}>
      {/* Background Pulse Decorative */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${currentVariant.bg}`} />

      <div className="flex justify-between items-start mb-6 flex-row-reverse">
        <div className="flex flex-col items-end">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-plex mb-1">
            {title}
          </p>
          <div className="flex items-center gap-2 flex-row-reverse">
            <h3 className="text-3xl font-black text-white font-plex tracking-tighter">
              {isLoading ? '...' : value}
            </h3>
            {trend && (
              <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[9px] font-black border ${
                trend.isUp ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {trend.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-2xl border transition-all duration-500 group-hover:scale-110 ${currentVariant.bg} ${currentVariant.accent} ${currentVariant.border}`}>
          {icon}
        </div>
      </div>

      <div className="space-y-4">
        {subValue && (
          <p className="text-xs text-gray-500 font-medium text-right font-plex">
            {subValue}
          </p>
        )}

        {/* Mini Chart / Status Placeholder */}
        <div className="h-12 w-full flex items-end gap-1 px-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-t-sm transition-all duration-1000 ${currentVariant.bg.replace('/5', '/20')} group-hover:${currentVariant.accent.replace('text-', 'bg-')}`}
              style={{ 
                height: `${20 + Math.random() * 80}%`,
                transitionDelay: `${i * 40}ms`
              }}
            />
          ))}
        </div>

        {footerText && (
          <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-row-reverse">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest font-plex">
              {footerText}
            </span>
            <button className="p-1 hover:bg-white/5 rounded-lg transition-colors text-gray-600 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
          <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${currentVariant.accent}`} />
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;
