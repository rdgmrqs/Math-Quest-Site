import React from 'react';
import { UserStats } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Star, Target } from 'lucide-react';

interface StatsCardProps {
  stats: UserStats;
  lang?: 'en' | 'pt';
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats, lang = 'en' }) => {
  const t = lang === 'pt' ? {
    level: 'NÍVEL',
    xp: 'PONTOS',
    streak: 'SÉRIE',
    solved: 'RESOLVIDOS'
  } : {
    level: 'LEVEL',
    xp: 'POINTS',
    streak: 'STREAK',
    solved: 'SOLVED'
  };

  // Calculate XP progress to next level (500 XP per level for visualization)
  const POINTS_PER_LEVEL = 500;
  const xpInLevel = stats.points % POINTS_PER_LEVEL;
  const progress = (xpInLevel / POINTS_PER_LEVEL) * 100;
  const xpToNext = POINTS_PER_LEVEL - xpInLevel;

  return (
    <div className="flex flex-wrap gap-5 items-center">
      <StatBadge 
        label={t.level} 
        value={stats.level} 
        icon={<Star size={16} fill="currentColor" />}
        className="bg-neo-purple text-white"
        showProgress={true}
        progress={progress}
        progressLabel={`${xpInLevel}/${POINTS_PER_LEVEL} XP`}
        glowColor="rgba(157,126,254,0.4)"
      />
      <StatBadge 
        label={t.xp} 
        value={stats.points} 
        icon={<Trophy size={16} fill="currentColor" />}
        className="bg-neo-yellow text-[#1A1A1A]"
        glowColor="rgba(255,233,0,0.3)"
      />
      <StatBadge 
        label={t.streak} 
        value={stats.streak} 
        icon={<Zap size={16} fill="currentColor" />}
        className="bg-neo-pink text-white"
        pulse={stats.streak > 5}
        glowColor="rgba(255,128,102,0.4)"
      />
      <StatBadge 
        label={t.solved} 
        value={stats.problemsSolved} 
        icon={<Target size={16} fill="currentColor" />}
        className="bg-neo-green text-[#1A1A1A]"
        glowColor="rgba(107,203,119,0.4)"
      />
    </div>
  );
};

const StatBadge = ({ 
  label, 
  value, 
  className, 
  icon, 
  showProgress = false, 
  progress = 0,
  progressLabel,
  pulse = false,
  glowColor
}: { 
  label: string, 
  value: number, 
  className: string, 
  icon: React.ReactNode,
  showProgress?: boolean,
  progress?: number,
  progressLabel?: string,
  pulse?: boolean,
  glowColor?: string
}) => (
  <motion.div 
    layout
    whileHover={{ scale: 1.05, y: -4 }}
    className="relative group active:scale-95 transition-all"
  >
    {/* Background Glow */}
    <div 
      className="absolute inset-2 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" 
      style={{ backgroundColor: glowColor }}
    />
    
    <div 
      className={`${className} relative z-10 px-6 py-4 rounded-[32px] border-[5px] border-[#1A1A1A] flex flex-col font-display font-black shadow-neo-sm transition-all group-hover:shadow-neo overflow-hidden ${pulse ? 'animate-pulse' : ''}`}
    >
      {showProgress && (
        <div className="absolute bottom-0 left-0 w-full p-2 bg-black/5 flex flex-col gap-1">
          <div className="flex justify-between items-center text-[7px] font-black tracking-widest opacity-60">
            <span>PROGRESS</span>
            <span>{progressLabel}</span>
          </div>
          <div className="h-2 bg-[#1A1A1A]/10 rounded-full w-full overflow-hidden border-[1px] border-[#1A1A1A]/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="h-full bg-gradient-to-r from-white/40 via-white to-white/40 relative"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      )}

      <div className={`flex items-center gap-4 ${showProgress ? 'mb-4' : ''}`}>
        <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-black/20 transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
             <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
             <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em] leading-none">{label}</span>
          </div>
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={value}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              className="text-2xl leading-none tracking-tighter italic"
            >
              {value.toLocaleString()}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.div>
);
