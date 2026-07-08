import React from 'react';
import { getRandomProblem } from './MathService.ts';
import { ProblemCard } from './components/ProblemCard.tsx';
import { StatsCard } from './components/StatsCard.tsx';
import { GameThumbnail } from './components/GameThumbnail.tsx';
import { MathProblem, UserStats, MathMode } from './types.ts';
import { RefreshCw, Users, Settings, X, Volume2, VolumeX, Trash2, ChevronLeft, ChevronRight, Dices, Target, Trophy, Zap, Brain, Clock, HelpCircle, BookOpen, Play, Star, CheckCircle2, Heart, Hash, Search, ArrowRight, ArrowLeft, Lightbulb, ArrowUpRight, Quote, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LEAD_AVATARS = ['🧠', '🦉', '🦊', '🚀', '🧙', '🦄', '🦖', '🤖', '🦁', '👾', '🧭', '🔮'];
const LEAD_COLORS = [
  'bg-neo-blue', 
  'bg-neo-pink', 
  'bg-neo-green', 
  'bg-neo-purple', 
  'bg-neo-orange', 
  'bg-neo-yellow',
];

const getDeterministicAvatar = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LEAD_AVATARS[Math.abs(hash) % LEAD_AVATARS.length];
};

const getDeterministicColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LEAD_COLORS[Math.abs(hash) % LEAD_COLORS.length];
};

const AVATAR_OPTIONS = [
  { emoji: '🧠', labelPt: 'Gênio', labelEn: 'Genius' },
  { emoji: '🦉', labelPt: 'Coruja Sábia', labelEn: 'Wise Owl' },
  { emoji: '🦊', labelPt: 'Raposa', labelEn: 'Fox Planner' },
  { emoji: '🚀', labelPt: 'Explorador', labelEn: 'Explorer' },
  { emoji: '🧙', labelPt: 'Feiticeiro', labelEn: 'Math Wizard' },
  { emoji: '🦄', labelPt: 'Criativo', labelEn: 'Creative' },
  { emoji: '🦖', labelPt: 'Dino Lógico', labelEn: 'Logic Dino' },
  { emoji: '🤖', labelPt: 'Robô Solver', labelEn: 'Robo Solver' },
];

const COLOR_OPTIONS = [
  { class: 'bg-neo-blue', hex: '#4D96FF', namePt: 'Azul', nameEn: 'Blue' },
  { class: 'bg-neo-pink', hex: '#FF6B6B', namePt: 'Rosa', nameEn: 'Pink' },
  { class: 'bg-neo-green', hex: '#6BCB77', namePt: 'Verde', nameEn: 'Green' },
  { class: 'bg-neo-purple', hex: '#9254FF', namePt: 'Roxo', nameEn: 'Purple' },
  { class: 'bg-neo-orange', hex: '#FF8066', namePt: 'Laranja', nameEn: 'Coral' },
  { class: 'bg-neo-yellow', hex: '#FFD93D', namePt: 'Amarelo', nameEn: 'Yellow' },
];

const getEmblemSuggestions = (avatar: string, isPt: boolean): string[] => {
  const dict: Record<string, { pt: string[]; en: string[] }> = {
    '🧠': {
      pt: ['NEURO_GENIO', 'PENSADOR_X', 'MENTE_ESTRELA', 'ALFA_SABIO'],
      en: ['NEURO_MIND', 'BRAINY_BOSS', 'HYPER_COGN', 'THINK_PRO']
    },
    '🦉': {
      pt: ['SABIO_OLHO', 'CORUJA_COGN', 'NOITE_LOGICA', 'CORUJA_X'],
      en: ['WISE_OWL', 'NIGHT_SAGE', 'SOPHIA_WISE', 'LOGIC_NEST']
    },
    '🦊': {
      pt: ['RAPOSA_ASTU', 'PLANEADOR_F', 'LINCE_ALFA', 'RAPOSO_IQ'],
      en: ['CUNNING_FOX', 'FOX_PLANNER', 'TACTICAL_FOX', 'SLY_SOLVER']
    },
    '🚀': {
      pt: ['ASTRO_HEROI', 'ORBITA_ZERO', 'COSMO_VORT', 'VELOCIDADE_X'],
      en: ['COSMIC_ROCKET', 'ASTRO_HERO', 'ZERO_GRAVITY', 'WARP_DRIVE']
    },
    '🧙': {
      pt: ['MAGO_MAT', 'WIZARD_PRIME', 'ALQUIMISTA_X', 'FIBONACCI_M'],
      en: ['MATH_WIZARD', 'PRIME_ALCH', 'FIBO_MAGE', 'LOGIC_SPELL']
    },
    '🦄': {
      pt: ['UNICORN_PRO', 'MAGICO_MAT', 'ESTRELA_UNI', 'BRILHO_LOGIC'],
      en: ['UNI_CRUNCH', 'STAR_MATH', 'NEO_PEGASU', 'SPARK_SOLVER']
    },
    '🦖': {
      pt: ['DINO_LOGICO', 'T_REX_SOLVE', 'RAPTOR_PRIME', 'MEGA_SAURUS'],
      en: ['REX_SOLVER', 'LOGIC_SAUR', 'CYBER_DINO', 'MEGATRON']
    },
    '🤖': {
      pt: ['BOT_GENIO', 'CYBER_REI', 'METAL_MATH', 'SOLVER_V3'],
      en: ['BOT_SOLVER', 'CYBER_BRAIN', 'ROBO_INTELL', 'SIGMA_BOT']
    }
  };
  return (dict[avatar] || dict['🧠'])[isPt ? 'pt' : 'en'];
};

const INITIAL_STATS: UserStats = {
  nickname: '',
  points: 0,
  problemsSolved: 0,
  level: 1,
  streak: 0,
};

const ALL_GAMES = [
  { 
    name: "Ouri", 
    origin: "Mancala", 
    type: "Seeds", 
    description: "An ancestral sowing game from the Mancala family played in West Africa.",
    objective: "Capture more than half of the total seeds (25 or more).",
    strategy: "Build up large groups of seeds to create multiple capture opportunities in one move.",
    rules: [
      "Sow seeds from one of your pits into subsequent pits in a counter-clockwise direction.",
      "If the last seed falls into an opponent's pit and results in 2 or 3 seeds, you capture them.",
      "The goal is to capture more seeds than your opponent."
    ]
  },
  { 
    name: "Senet", 
    origin: "Egypt", 
    type: "Board", 
    description: "One of the oldest known board games, originating from Ancient Egypt.",
    objective: "Bear all your pieces off the board first.",
    strategy: "Use the protected squares (Ankh, Water, etc.) to shield your pieces from being swapped back.",
    rules: [
      "Move your pieces across the 30 squares in an S-shaped pattern.",
      "Throw casting sticks to determine movement distance.",
      "Some squares offer protection, while others are traps ('House of Water')."
    ]
  },
  { 
    name: "15 Puzzle", 
    origin: "Sliding", 
    type: "Classic", 
    description: "The classic sliding tile challenge where you reorder numbers in a 4x4 grid.",
    objective: "Arrange tiles in numerical order from top-left.",
    strategy: "Solve row by row, then the last two rows together column by column.",
    rules: [
      "Slide tiles into the empty space to reorder them.",
      "Organize the tiles from 1 to 15 in sequential order.",
      "The empty space should end up in the bottom-right corner."
    ]
  },
  { 
    name: "Magic Squares", 
    origin: "Numbers", 
    type: "Logic", 
    description: "A numerical grid where columns, rows, and diagonals sum to the same magic constant.",
    objective: "Fill the grid so every row, column and diagonal has the same sum.",
    strategy: "For odd-sized squares, the Siamese method (placing 1 in the top-middle) works every time.",
    rules: [
      "Place integers into the grid so that every row and column sums to the same value.",
      "Include the diagonals in this requirement.",
      "Each number must be used exactly once."
    ]
  },
  { 
    name: "Sudoku",  
    origin: "Japan", 
    type: "Numbers", 
    description: "The world-famous Japanese number placement puzzle based on logic.",
    objective: "Fill all empty cells with numbers 1-9 following grid constraints.",
    strategy: "Use 'Pencil Marks' to track possibilities in each cell. Look for 'Naked Pairs' (two cells in a row with the same two possibilities).",
    rules: [
      "Fill the 9x9 grid so that every row and column contains digits 1-9.",
      "Each of the nine 3x3 subgrids must also contain digits 1-9.",
      "No digit can be repeated in any row, column, or subgrid."
    ],
    guideSteps: [
      {
        title: "Scanning Rows/Cols",
        desc: "Look at a single number (e.g., 5). Follow its row and column to see where it *cannot* be in a 3x3 box.",
        visual: "scanning"
      },
      {
        title: "The Lone Ranger",
        desc: "If only one cell in a 3x3 box can contain a specific number after scanning, that's where it goes!",
        visual: "lone_placement"
      },
      {
        title: "Naked Pairs",
        desc: "If two cells in a row only have two possible numbers (e.g., 2 and 7), you can remove 2 and 7 from all other cells in that row.",
        visual: "naked_pair"
      },
      {
        title: "The 3x3 Restriction",
        desc: "A number must appear exactly once in each 3x3 block. Use this to cross-reference with rows and columns.",
        visual: "box_logic"
      }
    ]
  },
  { 
    name: "Game of 24", 
    origin: "Quick Math", 
    type: "Numbers", 
    description: "A mental math challenge: reach exactly 24 using four numbers and basic operations.",
    objective: "Create an expression that equals 24 using all four numbers.",
    strategy: "Work backward from 24. Think of factors like 8x3, 6x4, or 12x2.",
    rules: [
      "Use all four given numbers exactly once.",
      "Apply addition, subtraction, multiplication, or division.",
      "Parentheses can be used to reorder operations."
    ]
  },
  { 
    name: "Hex", 
    origin: "Connection", 
    type: "Topology", 
    description: "A deep strategic game of connection where players attempt to complete a path across the board.",
    objective: "Connect your two color-coded sides of the hexagonal board.",
    strategy: "Create 'virtual connections' (two empty spaces that can connect in one move regardless of opponent response).",
    rules: [
      "Red attempts to connect top to bottom; Blue attempts to connect left to right.",
      "The first player to complete a continuous path of their color wins.",
      "Hex cannot end in a draw; one path will always be possible."
    ]
  }
];

interface LeaderboardEntry {
  nickname: string;
  points: number;
  problemsSolved: number;
  streak: number;
  level: number;
}

// Floating FX Components
const LevelUpOverlay: React.FC<{ level: number }> = ({ level }) => {
  const rankInfo = React.useMemo(() => {
    if (level <= 5) return { title: "Novice", color: "bg-neo-blue", icon: "🌱", next: "Arithmetic Patterns" };
    if (level <= 10) return { title: "Apprentice", color: "bg-neo-green", icon: "📜", next: "Geometric Logic" };
    if (level <= 15) return { title: "Adept", color: "bg-neo-yellow", icon: "🛡️", next: "Complex Puzzles" };
    if (level <= 20) return { title: "Scholar", color: "bg-neo-orange", icon: "🏛️", next: "Theory of Nim" };
    if (level <= 25) return { title: "Sage", color: "bg-neo-purple", icon: "🔮", next: "Archimedes' Secrets" };
    return { title: "Grandmaster", color: "bg-neo-pink", icon: "👑", next: "The Infinite Quest" };
  }, [level]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2D3436]/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -20, y: 100 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        exit={{ scale: 1.2, opacity: 0, y: -100 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative"
      >
        {/* Background Flare */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
          className="absolute -inset-20 bg-gradient-to-r from-neo-purple/20 via-white/10 to-neo-blue/20 blur-3xl rounded-full"
        />

        <div className="relative bg-white p-12 rounded-[48px] border-[8px] border-[#2D3436] shadow-neo text-center space-y-6 max-w-sm overflow-hidden">
          {/* Confetti Particles */}
          <div className="absolute inset-0 pointer-events-none">
             {[...Array(16)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ scale: 0, x: 0, y: 0 }}
                 animate={{ 
                   scale: [0, 1, 0],
                   x: (Math.random() - 0.5) * 600,
                   y: (Math.random() - 0.5) * 600,
                   rotate: Math.random() * 360
                 }}
                 transition={{ 
                   duration: 2, 
                   delay: (i * 0.1),
                   repeat: Infinity,
                   repeatDelay: 0.5
                 }}
                 className={`absolute left-1/2 top-1/2 w-4 h-4 rounded-sm transform -translate-x-1/2 -translate-y-1/2 ${
                   ['bg-neo-purple', 'bg-neo-pink', 'bg-neo-yellow', 'bg-neo-blue', 'bg-neo-green'][i % 5]
                 } border-2 border-[#2D3436]`}
               />
             ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-28 h-28 ${rankInfo.color} rounded-[32px] mx-auto flex items-center justify-center border-[6px] border-[#2D3436] shadow-neo-sm -mt-24 mb-6 relative z-10 overflow-hidden group`}
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl drop-shadow-sm select-none"
            >
              {rankInfo.icon}
            </motion.div>
          </motion.div>

          <div className="space-y-4 relative z-10">
            <div>
              <motion.h2 
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                className="text-6xl font-black uppercase tracking-tighter italic text-[#2D3436] leading-none mb-1"
              >
                Level Up!
              </motion.h2>
              <div className={`inline-block ${rankInfo.color} text-[#2D3436] px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] border-2 border-[#2D3436] shadow-neo-sm`}>
                Rank: {rankInfo.title}
              </div>
            </div>

            <div className="py-2">
              <span className="text-9xl font-black text-neo-purple tracking-tighter tabular-nums block leading-none">
                {level}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-3xl border-3 border-dashed border-slate-200">
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Incoming Challenge</p>
               <p className="text-sm font-black text-[#2D3436] uppercase">{rankInfo.next}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingXP: React.FC<{ amount: number; onComplete: () => void }> = ({ amount, onComplete }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0, 1, 1, 0], 
      y: -250, 
      scale: [0.5, 1.5, 1.5, 1],
      rotate: [0, -5, 5, 0]
    }}
    transition={{ duration: 1, ease: "easeOut" }}
    onAnimationComplete={onComplete}
    className="fixed left-1/2 bottom-1/2 -translate-x-1/2 z-[100] pointer-events-none"
  >
    <div className="bg-neo-yellow text-[#2D3436] px-6 py-3 rounded-2xl border-[4px] border-[#2D3436] font-black shadow-neo flex items-center gap-2 text-2xl">
      <Zap size={24} className="fill-current" />
      +{amount} XP
    </div>
  </motion.div>
);

const FloatingCoin: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0], 
      scale: [0, 1.2, 1, 0.5],
      y: -500,
      x: (Math.random() - 0.5) * 600,
      rotate: Math.random() * 360
    }}
    transition={{ duration: 1.5, ease: "circOut" }}
    onAnimationComplete={onComplete}
    className="fixed left-1/2 bottom-[30%] -translate-x-1/2 z-[90] pointer-events-none"
  >
    <div className="w-10 h-10 bg-neo-yellow rounded-full border-[3px] border-[#2D3436] flex items-center justify-center shadow-neo-sm">
      <div className="w-5 h-5 border-2 border-[#2D3436] rounded-full flex items-center justify-center font-black text-[10px]">$</div>
    </div>
  </motion.div>
);

const GameCard: React.FC<{ 
  game: typeof ALL_GAMES[0]; 
  isSelected: boolean; 
  onSelect: () => void;
  onHelp: () => void;
  playSfx: (type: 'success' | 'error' | 'click' | 'level-up') => void;
}> = ({ game, isSelected, onSelect, onHelp, playSfx }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const showDetail = isSelected || isHovered;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playSfx('click');
        onSelect();
      }}
      className={`neo-card p-5 cursor-pointer transition-all border-[4px] h-full relative ${
        isSelected 
          ? 'bg-neo-purple text-white border-[#2D3436] shadow-[0_0_20px_rgba(155,126,255,0.4)] ring-4 ring-neo-purple/20' 
          : 'bg-white hover:bg-slate-50 border-[#2D3436]/10 hover:border-[#2D3436]/30'
      }`}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          playSfx('click');
          onHelp();
        }}
        className={`absolute top-4 right-4 p-2 rounded-xl border-2 transition-all z-10 ${
          isSelected 
            ? 'bg-white/20 border-white/40 hover:bg-white/30' 
            : 'bg-slate-50 border-slate-200 hover:border-neo-purple text-neo-purple'
        }`}
        title="View Rules"
      >
        <HelpCircle size={16} />
      </button>

      <div className="flex justify-between items-start mb-3">
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
          isSelected ? 'bg-white/20 border-white/40' : 'bg-[#2D3436]/5 border-[#2D3436]/10'
        }`}>
          {game.type}
        </span>
        <span className="text-[8px] font-bold opacity-40 uppercase mr-8">{game.origin}</span>
      </div>
      <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{game.name}</h4>
      
      {/* Clean Aesthetic Visual Thumbnail representing the game */}
      <div className="w-full h-32 rounded-xl overflow-hidden border border-[#2D3436]/15 mb-4 bg-[#F2F0E8] relative flex items-center justify-center">
        <GameThumbnail gameName={game.name} isSelected={isSelected} className="w-full h-full" />
      </div>

      <p className={`text-xs font-bold leading-relaxed mb-4 line-clamp-2 ${isSelected ? 'opacity-90' : 'opacity-60'}`}>
        {game.description}
      </p>

      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#2D3436]/5">
        <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-neo-purple'}`} />
        <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-500'}`}>
          {isSelected ? 'Currently Selected' : `Explore ${game.type}`}
        </span>
      </div>
    </motion.div>
  );
};

const GameInteractivePreview: React.FC<{ type: string; gameName: string }> = ({ type, gameName }) => {
  // A small interactive preview that shows the core "logic" of the game type
  const [step, setStep] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  if (type === '3-in-a-row' || type === 'Connection' || type === 'Topology') {
    return (
      <div className="w-full h-32 bg-slate-100 rounded-2xl border-2 border-[#2D3436] flex items-center justify-center gap-2 overflow-hidden relative group">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ 
              scale: step >= i ? 1 : 0.8,
              opacity: step >= i ? 1 : 0.2,
              backgroundColor: step === 3 && i === 2 ? '#B9FF33' : (i % 2 === 0 ? '#9D7EFE' : '#FF7EB6')
            }}
            className="w-12 h-12 rounded-xl border-4 border-[#2D3436] shadow-neo-sm"
          />
        ))}
        {step === 3 && (
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            className="absolute h-2 w-48 bg-[#2D3436] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full origin-left"
          />
        )}
      </div>
    );
  }

  if (type === 'Numbers' || type === 'Calculation') {
    return (
      <div className="w-full h-32 bg-slate-900 rounded-2xl border-2 border-[#2D3436] flex flex-col items-center justify-center p-4">
        <div className="flex gap-2">
           <motion.div animate={{ y: step === 0 ? -10 : 0 }} className="text-2xl font-black text-neo-blue">12</motion.div>
           <div className="text-2xl font-black text-white">×</div>
           <motion.div animate={{ y: step === 1 ? -10 : 0 }} className="text-2xl font-black text-neo-pink">?</motion.div>
           <div className="text-2xl font-black text-white">=</div>
           <motion.div animate={{ scale: step === 2 ? 1.2 : 1 }} className="text-2xl font-black text-neo-green">24</motion.div>
        </div>
        <div className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-[0.3em]">CALC.MODE.ACTIVE</div>
      </div>
    );
  }

  if (type === 'Sliding' || type === 'Movement') {
    return (
      <div className="w-full h-32 bg-slate-100 rounded-2xl border-2 border-[#2D3436] grid grid-cols-3 p-2 gap-1 overflow-hidden">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: i === 4 && step === 1 ? 40 : (i === 5 && step === 1 ? -40 : 0),
              backgroundColor: i === 8 ? 'transparent' : '#fff'
            }}
            className={`w-full h-full rounded border-2 border-[#2D3436] flex items-center justify-center ${i === 8 ? 'border-dashed opacity-20' : ''}`}
          >
            {i !== 8 && <span className="text-xs font-black">{i + 1}</span>}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-32 bg-slate-50 rounded-2xl border-2 border-[#2D3436] border-dashed flex flex-col items-center justify-center p-4">
      <div className="flex gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
           <Dices size={32} className="text-neo-purple" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
           <Brain size={32} className="text-neo-pink" />
        </motion.div>
      </div>
      <span className="text-[8px] font-black uppercase mt-3 opacity-30 italic">Interactive simulation of {gameName} logic</span>
    </div>
  );
};

const GameGuideVisual: React.FC<{ gameName: string; step: number; visualType: string }> = ({ gameName, step, visualType }) => {
  if (gameName === 'Sudoku') {
    return (
      <div className="relative w-full aspect-square max-w-[200px] grid grid-cols-3 grid-rows-3 gap-1 bg-[#2D3436] p-1 rounded-sm">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className={`bg-white rounded-[2px] flex items-center justify-center font-black text-xl relative ${
              visualType === 'scanning' && (i === 1 || i === 4 || i === 7 || i === 3 || i === 4 || i === 5) ? 'bg-rose-100' : ''
            }`}
          >
            {i === 4 && visualType === 'scanning' && <span className="text-[#2D3436] opacity-20">5?</span>}
            {i === 4 && visualType === 'lone_placement' && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-neo-pink">5</motion.span>
            )}
            {i === 0 && visualType === 'naked_pair' && <span className="text-[10px] text-slate-400">2,7</span>}
            {i === 1 && visualType === 'naked_pair' && <span className="text-[10px] text-slate-400">2,7</span>}
            {visualType === 'box_logic' && i === 8 && <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity }} className="w-full h-full bg-neo-yellow/30" />}
          </motion.div>
        ))}
        {visualType === 'scanning' && (
          <>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="absolute h-1 bg-neo-pink/40 top-1/2 left-0 right-0 -translate-y-1/2" />
            <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="absolute w-1 bg-neo-pink/40 top-0 bottom-0 left-1/2 -track-x-1/2" />
          </>
        )}
      </div>
    );
  }

  if (gameName === "Einstein's Riddle") {
    return (
      <div className="flex gap-2 items-end justify-center w-full max-w-sm h-32">
        {[1, 2, 3, 4, 5].map((h) => (
          <motion.div
            key={h}
            animate={{ 
              height: h === 1 && visualType === 'fixed_placement' ? '100%' : '60%',
              backgroundColor: h === 2 && visualType === 'neighbor_deduction' ? '#FF7EB6' : (h === 3 && visualType === 'neighbor_deduction' ? '#fff' : '#fff'),
              borderColor: (h === 1 && visualType === 'fixed_placement') || ((h === 2 || h === 3) && visualType === 'neighbor_deduction') ? '#2D3436' : '#2D343633'
            }}
            className="w-12 border-4 border-b-0 rounded-t-xl relative flex flex-col items-center justify-end p-2"
          >
            <span className="text-[8px] font-black opacity-20 absolute -top-4">H{h}</span>
            {h === 1 && visualType === 'houses_row' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs">🏠</motion.div>}
            {h === 1 && (visualType === 'fixed_placement' || visualType === 'clue_chain') && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[8px] font-black text-neo-purple text-center leading-tight">NORW.</motion.div>
            )}
            {h === 2 && visualType === 'clue_chain' && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-[8px] font-black text-neo-blue text-center leading-tight">BLUE</motion.div>
            )}
            {visualType === 'neighbor_deduction' && h === 2 && <span className="text-[8px] font-black text-white">GREEN</span>}
            {visualType === 'neighbor_deduction' && h === 3 && <span className="text-[8px] font-black">WHITE</span>}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
         <Dices size={32} className="text-neo-purple" />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
         <Brain size={32} className="text-neo-pink" />
      </motion.div>
    </div>
  );
};

const GameTutorialModal: React.FC<{ 
  game: typeof ALL_GAMES[0]; 
  onClose: () => void;
  onStart?: (game: typeof ALL_GAMES[0]) => void;
  playSfx: (type: 'success' | 'error' | 'click' | 'level-up') => void;
  t: any;
}> = ({ game, onClose, onStart, playSfx, t }) => {
  const [activeTab, setActiveTab] = React.useState<'rules' | 'strategy' | 'guide'>('rules');
  const [guideStep, setGuideStep] = React.useState(0);

  const hasGuide = !!(game as any).guideSteps;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2D3436]/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, rotate: 1 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        className="bg-white rounded-[48px] border-[10px] border-[#2D3436] shadow-neo-lg max-w-xl w-full relative h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Modal System Header */}
        <div className="bg-[#2D3436] px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neo-purple" />
              <div className="w-2 h-2 rounded-full bg-neo-pink" />
              <div className="w-2 h-2 rounded-full bg-neo-yellow" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] font-mono italic">Game.Guide_Module.v1</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-[9px] font-black text-neo-purple uppercase tracking-[0.3em] font-mono whitespace-nowrap">ID_{game.name.substring(0, 3).toUpperCase()}</div>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-8 pb-4 relative shrink-0">
          <button 
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="absolute top-6 right-8 p-3 hover:bg-slate-100 rounded-2xl transition-all hover:rotate-90 z-20 shadow-sm"
          >
            <X size={24} className="text-[#2D3436]" />
          </button>

          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ rotate: -5, scale: 1.05 }}
              className="w-20 h-20 bg-neo-purple rounded-3xl flex items-center justify-center border-[5px] border-[#2D3436] shadow-neo-sm shrink-0"
            >
              <BookOpen size={36} className="text-white" />
            </motion.div>
            <div className="flex flex-col">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none text-[#2D3436]">
                {game.name}
              </h2>
              <div className="flex gap-3 mt-3">
                <span className="text-[10px] font-black uppercase px-3 py-1 bg-neo-blue/10 text-neo-blue rounded-full border-2 border-neo-blue/20">{game.type}</span>
                <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-50 text-slate-500 rounded-full border-2 border-slate-200">{game.origin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-10 border-b-4 border-[#2D3436]/10 shrink-0 overflow-x-auto no-scrollbar gap-2">
          <button 
            onClick={() => { playSfx('click'); setActiveTab('rules'); }}
            className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap group ${activeTab === 'rules' ? 'text-neo-purple' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="relative z-10">{t.tutorial.howToPlay}</span>
            {activeTab === 'rules' && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-neo-purple/10 rounded-t-xl" />}
            {activeTab === 'rules' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-neo-purple rounded-full" />}
          </button>
          
          {hasGuide && (
            <button 
              onClick={() => { playSfx('click'); setActiveTab('guide'); }}
              className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap group ${activeTab === 'guide' ? 'text-neo-pink' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="relative z-10">Training Guide</span>
              {activeTab === 'guide' && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-neo-pink/10 rounded-t-xl" />}
              {activeTab === 'guide' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-neo-pink rounded-full" />}
            </button>
          )}

          <button 
            onClick={() => { playSfx('click'); setActiveTab('strategy'); }}
            className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap group ${activeTab === 'strategy' ? 'text-neo-purple' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="relative z-10">{t.tutorial.strategyTab}</span>
            {activeTab === 'strategy' && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-neo-purple/10 rounded-t-xl" />}
            {activeTab === 'strategy' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-neo-purple rounded-full" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar text-[#2D3436]">
          <AnimatePresence mode="wait">
            {activeTab === 'rules' ? (
              <motion.div 
                key="rules"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="p-8 bg-slate-50 rounded-[32px] border-[4px] border-dashed border-[#2D3436]/10 relative group overflow-hidden">
                  <Quote size={80} className="absolute -top-4 -right-4 text-[#2D3436]/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                  <p className="text-slate-600 font-bold text-xl md:text-2xl italic leading-tight relative z-10">
                    "{game.description}"
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-neo-pink rounded-full" />
                    <h3 className="text-xl font-black uppercase tracking-tight italic">
                      Logic Parameters
                    </h3>
                  </div>
                  <ul className="grid gap-4">
                    {(game as any).rules?.map((rule: string, i: number) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-white border-[4px] border-[#2D3436] rounded-3xl shadow-neo-sm flex gap-6 items-center group hover:bg-slate-50 transition-all hover:-translate-x-1"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-[#2D3436] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-neo-sm transform -rotate-3 group-hover:rotate-0 transition-transform">{i + 1}</div>
                        <span className="text-base font-black tracking-tight leading-tight">{rule}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : activeTab === 'guide' ? (
              <motion.div
                key="guide"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 space-y-10">
                  <div className="flex items-center justify-between bg-neo-pink/5 p-4 rounded-2xl border-2 border-dashed border-neo-pink/20">
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic text-neo-pink leading-none">
                      { (game as any).guideSteps[guideStep].title }
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black bg-[#2D3436] text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-neo-sm">
                        Step 0{guideStep + 1}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-[#2D3436] rounded-[48px] border-[8px] border-[#2D3436] overflow-hidden shadow-neo-lg min-h-[260px] flex items-center justify-center relative p-10 group">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[length:30px_30px] group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)' }} />
                    <GameGuideVisual 
                      gameName={game.name} 
                      step={guideStep} 
                      visualType={(game as any).guideSteps[guideStep].visual} 
                    />
                  </div>

                  <div className="p-8 bg-rose-50 border-[5px] border-[#2D3436] rounded-[32px] relative shadow-neo-sm">
                    <div className="absolute -top-5 left-8 w-12 h-12 bg-neo-pink border-[4px] border-[#2D3436] rounded-2xl flex items-center justify-center shadow-neo transform -rotate-12 group-hover:rotate-0 transition-transform">
                      <Lightbulb size={24} className="text-white" />
                    </div>
                    <p className="font-bold text-[#2D3436] text-lg md:text-xl leading-snug italic pt-2">
                      { (game as any).guideSteps[guideStep].desc }
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 mt-12 pt-8 border-t-4 border-slate-50 shrink-0">
                  <button
                    onClick={() => { playSfx('click'); setGuideStep(s => Math.max(0, s - 1)); }}
                    disabled={guideStep === 0}
                    className="p-6 bg-white border-[5px] border-[#2D3436] rounded-3xl shadow-neo hover:-translate-y-2 transition-all active:translate-y-0 disabled:opacity-30 disabled:hover:translate-y-0 disabled:shadow-none"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={() => {
                      playSfx('click');
                      if (guideStep < (game as any).guideSteps.length - 1) {
                        setGuideStep(s => s + 1);
                      } else {
                        setActiveTab('rules');
                      }
                    }}
                    className="flex-1 p-6 bg-neo-pink text-white border-[5px] border-[#2D3436] rounded-3xl shadow-neo font-black uppercase text-base tracking-widest hover:-translate-y-2 transition-all active:translate-y-0 flex items-center justify-center gap-4"
                  >
                    <span className="italic">{guideStep < (game as any).guideSteps.length - 1 ? 'Execute Next Phase' : 'Data Synchronized'}</span>
                    <ChevronRight size={28} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="strategy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-neo-yellow rounded-full" />
                    <h3 className="text-xl font-black uppercase tracking-tight italic">
                      Mission Objective
                    </h3>
                  </div>
                  <div className="p-8 bg-neo-yellow/10 border-[5px] border-[#2D3436] rounded-[40px] relative overflow-hidden group shadow-neo-sm hover:shadow-neo transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neo-yellow opacity-10 rounded-bl-full transform transition-transform group-hover:scale-125" />
                    <p className="text-xl md:text-2xl font-black tracking-tight text-[#2D3436] leading-tight flex gap-6 italic">
                       <span className="text-4xl">🎯</span>
                       {(game as any).objective || "Achieve the target state using strategic logic."}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-neo-purple rounded-full" />
                    <h3 className="text-xl font-black uppercase tracking-tight italic leading-tight">
                      System Simulation
                    </h3>
                  </div>
                  
                  {/* Real Interactive Preview */}
                  <div className="border-[6px] border-[#2D3436] rounded-[48px] overflow-hidden shadow-neo-sm transform hover:scale-[1.01] transition-transform">
                    <GameInteractivePreview type={game.type} gameName={game.name} />
                  </div>

                  <div className="p-8 bg-neo-purple/5 border-4 border-dashed border-neo-purple/20 rounded-[40px] mt-8 group">
                    <div className="flex gap-6">
                      <div className="w-16 h-16 bg-white border-[4px] border-[#2D3436] rounded-[24px] flex items-center justify-center shrink-0 shadow-neo-sm group-hover:rotate-6 transition-transform">
                         <Brain size={32} className="text-neo-purple" />
                      </div>
                      <p className="text-base md:text-lg font-bold text-slate-700 leading-snug pt-1 italic">
                        {(game as any).strategy || "Explore the mathematical patterns within the game to find the optimal path to victory."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-10 pt-0 shrink-0 text-[#2D3436]">
          <button
            onClick={() => {
              playSfx('click');
              if (onStart) {
                onStart(game);
              } else {
                onClose();
              }
            }}
            className="bg-neo-green text-[#2D3436] w-full py-6 rounded-[32px] border-[6px] border-[#2D3436] text-2xl font-black flex items-center justify-center gap-4 transition-all shadow-neo hover:-translate-y-2 active:translate-y-0 italic uppercase tracking-tighter"
          >
            <Play size={28} fill="currentColor" />
            <span>{t.tutorial.readyToPlay}</span>
          </button>
        </div>

        {/* Bottom Deco Bar */}
        <div className="h-4 flex shrink-0 mt-auto border-t-[4px] border-[#2D3436]">
          <div className="flex-1 bg-neo-purple" />
          <div className="flex-1 bg-neo-pink" />
          <div className="flex-1 bg-neo-yellow" />
          <div className="flex-1 bg-neo-green" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [stats, setStats] = React.useState<UserStats>(() => {
    const saved = localStorage.getItem('math-quest-stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard' | 'random'>('random');
  const [gameMode, setGameMode] = React.useState<MathMode>('mixed');
  const [currentProblem, setCurrentProblem] = React.useState<MathProblem>(() => {
    const saved = localStorage.getItem('math-quest-stats');
    const level = saved ? JSON.parse(saved).level : 1;
    return getRandomProblem(undefined, level, 'mixed');
  });
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showLevelUp, setShowLevelUp] = React.useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = React.useState(false);
  const [nicknameInput, setNicknameInput] = React.useState('');
  const [nicknameError, setNicknameError] = React.useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = React.useState('🧠');
  const [selectedAvatarColor, setSelectedAvatarColor] = React.useState('bg-neo-blue');
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [isStatsReady, setIsStatsReady] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<'landing' | 'game' | 'rankings' | 'library'>('landing');
  const [showSettings, setShowSettings] = React.useState(false);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [showGameTutorial, setShowGameTutorial] = React.useState<typeof ALL_GAMES[0] | null>(null);
  const [tutorialStep, setTutorialStep] = React.useState(0);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [libraryPage, setLibraryPage] = React.useState(0);
  const [leaderboardPage, setLeaderboardPage] = React.useState(0);
  const [selectedGame, setSelectedGame] = React.useState<typeof ALL_GAMES[0] | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('ALL');

  const [activeXP, setActiveXP] = React.useState<{ id: number; amount: number }[]>([]);
  const [activeCoins, setActiveCoins] = React.useState<number[]>([]);

  // New game mode states
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [sessionStats, setSessionStats] = React.useState({ solved: 0, points: 0 });
  const [lang, setLang] = React.useState<'en' | 'pt'>(() => (localStorage.getItem('math-quest-lang') as 'en' | 'pt') || 'en');

  React.useEffect(() => {
    let timer: any;
    if (gameMode === 'timed' && timeLeft > 0 && !isGameOver && currentView === 'game') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameMode, timeLeft, isGameOver, currentView]);

  const playSfx = React.useCallback((type: 'success' | 'error' | 'click' | 'level-up') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      const playTone = (freq: number, type: OscillatorType, duration: number, volume: number, ramp = true) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        if (ramp) {
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        }
        osc.start();
        osc.stop(ctx.currentTime + duration);
        return { osc, gain };
      };

      if (type === 'success') {
        playTone(523.25, 'sine', 0.15, 0.1); // C5
        setTimeout(() => playTone(659.25, 'sine', 0.2, 0.1), 100); // E5
      } else if (type === 'error') {
        playTone(220, 'sawtooth', 0.4, 0.08); // A3
        playTone(110, 'sawtooth', 0.4, 0.05); // A2
      } else if (type === 'click') {
        playTone(800, 'sine', 0.05, 0.05); 
      } else if (type === 'level-up') {
        const tones = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        tones.forEach((t, i) => {
          setTimeout(() => playTone(t, 'sine', 0.5, 0.1 - (i * 0.01)), i * 150);
        });
      }
    } catch (e) {
      console.warn("Audio Context not supported or blocked", e);
    }
  }, [soundEnabled]);

  const t = lang === 'pt' ? {
    settings: 'Configurações',
    sound: 'Efeitos Sonoros',
    language: 'Idioma',
    reset: 'Redefinir Progresso',
    danger: 'ZONA DE PERIGO',
    confirmReset: 'Tem certeza de que deseja redefinir todo o seu progresso? Isso não pode ser desfeito.',
    howToPlay: 'Como Jogar',
    guide: 'Guia de Jogo',
    rules: 'Regras',
    newProblem: 'Novo Problema',
    mixed: 'Todos Misturados',
    gameMode: 'Modo de Jogo',
    difficultyLabel: 'Dificuldade',
    timedOut: 'TEMPO ESGOTADO!',
    survivalEnded: 'QUEST OVER!',
    gameOver: 'Fim de Jogo',
    finalScore: 'Pontuação Final',
    tryAgain: 'Jogar Novamente',
    modes: {
      mixed: 'Todos Misturados',
      classic: 'Clássico',
      story: 'Histórias',
      puzzle: 'Quebra-cabeças',
      timed: 'Corrida Rápida',
      survival: 'Sobrevivência',
      custom: 'Desafio Customizado',
    },
    library: 'Biblioteca de Jogos de Matemática',
    exitGame: 'Escolher Outro Jogo',
    backToLibrary: 'Voltar para Biblioteca',
    randomGame: 'Escolher Jogo Aleatório',
    explore: 'Foque nos 7 melhores jogos antigos e modernos como Ouri, Senet, Jogo de 24, Quadrados Mágicos, Sudoku e Hex. Domine a lógica e matemática de forma interativa!',
    player: 'Jogador',
    editName: 'Editar Nome',
    tutorial: {
      title: 'Treinamento da Academia',
      next: 'Próximo',
      back: 'Voltar',
      finish: 'Entrar na Arena!',
      howToPlay: 'Como Jogar',
      strategyTab: 'Estratégia & Objetivo',
      objectiveTitle: 'Objetivo Primário',
      proHints: 'Dicas Táticas e Detalhes',
      readyToPlay: 'INICIAR JOGO',
      steps: [
        {
          title: 'Entre na Zenith',
          desc: 'Bem-vindo à sua odisseia intelectual. Esse é o ponto onde a lógica encontra a arte dos jogos matemáticos ancestrais e modernos. Sua missão é sincronizar seus padrões neurais com a simulação.',
          icon: '🧠'
        },
        {
          title: 'Decifre a Lógica',
          desc: 'Analise os desafios desde Nim até Hex. Use arquétipos visuais (grades, linhas e sequências) e sugestões precisas para desvendar segredos embutidos em cada tarefa.',
          icon: '🎯'
        },
        {
          title: 'Arquivo de Conhecimento',
          desc: 'Use a "Biblioteca de Missões" para engajar manualmente qualquer arquétipo de jogo. Filtre pela complexidade para aguçar suas habilidades em Topologia, Geometria e Dedução.',
          icon: '📚'
        },
        {
          title: 'Apoio Integrado',
          desc: 'Ganhe ajuda cirúrgica com explicações detalhadas em tempo real e guias táteis embutidos nos cartões de problema.',
          icon: '🧭'
        },
        {
          title: 'Evolução Mecânica',
          desc: 'Cada 5 acertos disparam uma evolução de nível. Níveis mais altos liberam novas e lendárias camadas de complexidade tática e desafios refinados.',
          icon: '⚡'
        },
        {
          title: 'Séries Neurais',
          desc: 'Mantenha sequências de acertos para ativar múltiplos bônus de XP. A precisão cirúrgica sem uso de pistas adicionais potencializa sua ascensão de nível.',
          icon: '🔥'
        },
        {
          title: 'Vários Modos de Jogo',
          desc: 'Utilize "Contra o Tempo" para testes velozes de raciocínio rápido ou "Sobrevivência" para precisão impecável de erro zero.',
          icon: '🕹️'
        },
        {
          title: 'Galeria da Fama',
          desc: 'Seu acúmulo de XP dita seu legado. Suba os degraus de Estudioso de Lógica Matemática até Grão-Mestre Supremo na arena global.',
          icon: '🏆'
        }
      ]
    }
  } : {
    settings: 'Settings',
    sound: 'Sound Effects',
    language: 'Language',
    reset: 'Reset Progress',
    danger: 'DANGEROUS ZONE',
    confirmReset: 'Are you sure you want to reset all your progress? This cannot be undone.',
    howToPlay: 'How to Play',
    guide: 'Guide',
    rules: 'Rules',
    newProblem: 'New Problem',
    mixed: 'Mixed',
    gameMode: 'Game Mode',
    difficultyLabel: 'Difficulty',
    timedOut: 'TIME EXPIRED!',
    survivalEnded: 'QUEST OVER!',
    gameOver: 'Game Over',
    finalScore: 'Final Score',
    tryAgain: 'Try Again',
    modes: {
      mixed: 'All Mixed',
      classic: 'Classic',
      story: 'Stories',
      puzzle: 'Puzzles',
      timed: 'Timed Run',
      survival: 'Survival',
      custom: 'Custom Challenge',
    },
    library: 'Logic & Games Library',
    exitGame: 'Choose Another Game',
    backToLibrary: 'Back to Library',
    randomGame: 'Random Game',
    explore: 'Focus on the 7 best ancient and modern games like Ouri, Senet, Game of 24, Magic Squares, Sudoku, and Hex. Master logic and math interactively!',
    player: 'Player',
    editName: 'Edit Name',
    tutorial: {
      title: 'Academy Training',
      next: 'Next',
      back: 'Back',
      finish: 'Let\'s Go!',
      howToPlay: 'How to Play',
      strategyTab: 'Strategy & Objective',
      objectiveTitle: 'Primary Objective',
      proHints: 'Pro Strategies & Hints',
      readyToPlay: 'START LEARNING',
      steps: [
        {
          title: 'Enter the Zenith',
          desc: 'Welcome to your intellectual odyssey. This is where logic meets the artistry of ancient and modern math games. Your mission is to synchronize your neural patterns with the simulation.',
          icon: '🧠'
        },
        {
          title: 'Decipher the Logic',
          desc: 'Analyze challenges from Nim to Hex. Use visual archetypes—grids, rows, and sequences—plus surgical hints to unlock the mathematical secrets embedded in every task.',
          icon: '🎯'
        },
        {
          title: 'The Knowledge Archive',
          desc: 'Use the "Quest Library" to manually engage any game archetype. Filter by complexity nodes to sharpen specific cognitive sectors like Topology, Deduction, or Geometry.',
          icon: '📚'
        },
        {
          title: 'Interactive Mastery',
          desc: 'Stuck in a logical loop? Use the System-Integrated Guide inside any game for real-time tactical simulations, step-by-step breakdowns, and expert strategy protocols.',
          icon: '🧭'
        },
        {
          title: 'Mechanical Evolution',
          desc: 'Every 5 successful solves triggers a level evolution. Higher levels unlock legendary paradoxes, deeper complexity layers, and high-frequency logic challenges.',
          icon: '⚡'
        },
        {
          title: 'Neural Streaks',
          desc: 'Maintain a solve streak to trigger XP multipliers. Precision is key: solving without auxiliary hints maximizes your XP efficiency and accelerates your rank ascension.',
          icon: '🔥'
        },
        {
          title: 'Combat Protocols',
          desc: 'Engage "Timed Run" for high-velocity logic or "Survival" for tactical zero-error precision. Master the "Mixed" stream to experience the full spectrum of the simulation.',
          icon: '🕹️'
        },
        {
          title: 'Global Hall of Fame',
          desc: 'Your accumulated XP defines your legacy. Standardize your skills to rise from a basic Logic Scholar to a supreme Grandmaster in the global architecture.',
          icon: '🏆'
        }
      ]
    }
  };

  React.useEffect(() => {
    setIsStatsReady(true);
  }, []);

  React.useEffect(() => {
    if (!isStatsReady) return;
    localStorage.setItem('math-quest-stats', JSON.stringify(stats));
    
    // Update server score if nickname exists
    if (stats.nickname) {
      fetch(`${window.location.origin}/api/scores`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nickname: stats.nickname,
          points: stats.points,
          problemsSolved: stats.problemsSolved,
          streak: stats.streak,
          level: stats.level
        })
      }).catch(err => console.warn("Could not sync score:", err));
    }
  }, [stats]);

  // Fetch leaderboard with retry
  const fetchLeaderboard = React.useCallback(async (retries = 3) => {
    try {
      console.log(`Fetching leaderboard (attempt ${4 - retries})...`);
      const res = await fetch(`${window.location.origin}/api/leaderboard`, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      console.log("Leaderboard data received:", data);
      setLeaderboard(data);
    } catch (err) {
      if (retries > 0) {
        console.warn(`Fetch failed, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, 1000));
        return fetchLeaderboard(retries - 1);
      }
      console.error("Detailed fetch error:", err);
      // Fallback with more realistic mock data
      setLeaderboard([
        { nickname: "MathMaster", points: 4450, problemsSolved: 180, streak: 25, level: 35 },
        { nickname: "Euler_Fan", points: 3980, problemsSolved: 145, streak: 12, level: 28 },
        { nickname: "LogicNinja", points: 3500, problemsSolved: 125, streak: 18, level: 22 },
        { nickname: "Pythagoras", points: 2800, problemsSolved: 90, streak: 8, level: 18 },
        { nickname: "Newtonian", points: 2400, problemsSolved: 75, streak: 10, level: 15 },
        { nickname: "Gauss_Ghost", points: 1900, problemsSolved: 60, streak: 3, level: 12 },
        { nickname: "Nightingale", points: 1500, problemsSolved: 45, streak: 5, level: 10 },
        { nickname: "Alcuin", points: 1200, problemsSolved: 35, streak: 4, level: 8 }
      ]);
    }
  }, []);

  React.useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // sync every 30s
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const handleSetNickname = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nicknameInput.trim();
    const error = validateNickname(trimmed);
    if (!error && trimmed) {
      playSfx('success');
      setStats(prev => ({ 
        ...prev, 
        nickname: trimmed, 
        avatar: selectedAvatar, 
        avatarColor: selectedAvatarColor 
      }));
    } else if (error) {
      playSfx('error');
      setNicknameError(error);
    }
  };

  const validateNickname = (name: string) => {
    if (name.length === 0) return null;
    if (name.length < 3) {
      return lang === 'pt' ? 'Muito curto (mínimo 3 caracteres)' : 'Too short (min 3 characters)';
    }
    if (name.length > 15) {
      return lang === 'pt' ? 'Muito longo (máximo 15 caracteres)' : 'Too long (max 15 characters)';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return lang === 'pt' ? 'Apenas letras, números e underscores' : 'Alphanumeric and underscores only';
    }
    return null;
  };

  const handleNicknameChange = (val: string) => {
    setNicknameInput(val);
    setNicknameError(validateNickname(val.trim()));
  };

  const generateRandomNickname = () => {
    const listPt = [
      'MESTRE_OURI', 'SUDOKU_REI', 'GENIO_HEX', 'EULER_X', 'GAUSS_COGNITO', 'ALQUERQUE_PRO', 
      'PENSADOR_X', 'X_MATEMATICO', 'STOMACHION_REI', 'SENET_CAMPEAO', 'NIM_MESTRE', 'PROFE_PRIME',
      'COGNITIVO_7', 'SABIO_SECTOR', 'VORTICE_MAT', 'FIBONACCI_X', 'CAMPEAO_MATH', 'ZERO_GRAVIDADE'
    ];
    const listEn = [
      'MATH_WIZARD', 'SUDOKU_CHAMP', 'OURI_KING', 'SENET_SAGE', 'HEX_MASTER', 'PRIME_THINKER',
      'LOGIC_NINJA', 'COMPASS_PRO', 'EULER_BEAST', 'GAUSS_VORTEX', 'COGNITO_ZERO', 'STOMA_GENIUS',
      'FIBO_KEEPER', 'MATRIX_HERO', 'TACTIC_BRAIN', 'SIGMA_FOX', 'OMEGA_OWL', 'ROBO_LOGIC'
    ];
    const pool = lang === 'pt' ? listPt : listEn;
    const rand = pool[Math.floor(Math.random() * pool.length)];
    setNicknameInput(rand);
    setNicknameError(validateNickname(rand));
    playSfx('click');
  };

  const handleNextProblem = (forcedDifficulty?: 'easy' | 'medium' | 'hard', forcedLevel?: number, isProgression = false, forcedMode?: MathMode, specificGame?: string) => {
    setIsRefreshing(true);
    const targetDiff = forcedDifficulty || (difficulty === 'random' ? undefined : difficulty);
    const targetLevel = forcedLevel || stats.level;
    const targetMode = forcedMode || gameMode;
    
    // Penalty for skipping a problem manually
    if (!isProgression && stats.streak > 0) {
      setStats(prev => ({ ...prev, streak: 0 }));
    }

    setTimeout(() => {
      setCurrentProblem(getRandomProblem(targetDiff, targetLevel, targetMode, specificGame || selectedGame?.name));
      setIsRefreshing(false);
    }, 400);
  };

  const changeDifficulty = (newDiff: 'easy' | 'medium' | 'hard' | 'random') => {
    playSfx('click');
    setDifficulty(newDiff);
    handleNextProblem(newDiff === 'random' ? undefined : newDiff);
  };

  const changeGameMode = (newMode: MathMode) => {
    playSfx('click');
    setGameMode(newMode);
    setIsGameOver(false);
    setSessionStats({ solved: 0, points: 0 });
    
    if (newMode === 'timed') {
      setTimeLeft(60);
    } else if (newMode === 'survival') {
      setLives(3);
    }

    handleNextProblem(undefined, undefined, false, newMode);
  };

  const handleSolve = (isCorrect: boolean) => {
    if (isCorrect) {
      playSfx('success');
      
      const multiplier = Math.min(3, 1 + Math.floor(stats.streak / 5) * 0.5);
      const earnedPoints = Math.round(currentProblem.points * multiplier);

      const animId = Date.now();
      setActiveXP(prev => [...prev, { id: animId, amount: earnedPoints }]);
      setActiveCoins(prev => [...prev, animId, animId + 1, animId + 2]);

      if (gameMode === 'timed' || gameMode === 'survival') {
        setSessionStats(prev => ({
          solved: prev.solved + 1,
          points: prev.points + earnedPoints
        }));
      }

      setStats(prev => {
        const newPoints = prev.points + earnedPoints;
        const newSolved = prev.problemsSolved + 1;
        const newLevel = Math.floor(newPoints / 500) + 1;
        const newStreak = prev.streak + 1;
        
        if (newLevel > prev.level) {
          setShowLevelUp(true);
          playSfx('level-up');
          setTimeout(() => setShowLevelUp(false), 3000);
        }

        return {
          ...prev,
          points: newPoints,
          problemsSolved: newSolved,
          level: newLevel,
          streak: newStreak
        };
      });
      
      handleNextProblem(undefined, undefined, true);
    } else {
      playSfx('error');
      setStats(prev => ({ ...prev, streak: 0 }));

      if (gameMode === 'survival') {
        setLives(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
        
        handleNextProblem(undefined, undefined, true); 
      }
    }
  };

  const handleEditNickname = () => {
    setNicknameInput(stats.nickname || '');
    if (stats.avatar) setSelectedAvatar(stats.avatar);
    if (stats.avatarColor) setSelectedAvatarColor(stats.avatarColor);
    setStats(prev => ({ ...prev, nickname: '' }));
  };

  const handleStartGame = () => {
    playSfx('click');
    localStorage.setItem('math-quest-intro-seen', 'true');
    setCurrentView('library');
  };

  const resetGame = () => {
    playSfx('error');
    localStorage.removeItem('math-quest-stats');
    localStorage.removeItem('math-quest-intro-seen');
    setStats(INITIAL_STATS);
    setDifficulty('random');
    setIsConfirmingReset(false);
    handleNextProblem(undefined, INITIAL_STATS.level);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen p-4 md:p-10 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed inset-0 z-[60] bg-gradient-to-br from-[#E6DAFC] via-[#F4EBFF] to-[#DBEAFF] overflow-y-auto overflow-x-hidden math-mono"
          >
            {/* Elegant Colorful Background with Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
               {/* Light dotted grid texture */}
               <div className="absolute inset-0 opacity-[0.07]" style={{ 
                 backgroundImage: 'radial-gradient(#2D3436 1.5px, transparent 1.5px)', 
                 backgroundSize: '24px 24px' 
               }} />
               {/* Clean elegant background gradient spheres to enrich visual tone */}
               <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#9254FF]/50 to-[#FF6B6B]/50 blur-[130px] opacity-30 mix-blend-multiply pointer-events-none" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#4D96FF]/50 to-[#6BCB77]/50 blur-[150px] opacity-30 mix-blend-multiply pointer-events-none" />
            </div>

            <div className="relative max-w-6xl mx-auto py-8 px-6 md:py-16 flex flex-col items-center">
              
              {/* TOP NAVIGATION BAR */}
              <div className="w-full flex justify-between items-center py-6 mb-16 border-b border-[#2D3436]/10 relative z-10 font-sans">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#2D3436] uppercase tracking-[0.3em] italic">
                    <span className="text-neo-purple">MATH</span> QUEST
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-neo-purple/10 border border-[#2D3436]/10 rounded text-neo-purple font-bold">LEGACY v2.5</span>
                </div>
                
                <div>
                  {stats.nickname ? (
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border-[3px] border-[#2D3436] shadow-neo-sm">
                      <div className={`w-8 h-8 rounded-lg border-2 border-[#2D3436] flex items-center justify-center text-base shrink-0 ${stats.avatarColor || 'bg-neo-blue'}`}>
                        {stats.avatar || '🧠'}
                      </div>
                      <span className="text-xs font-black text-[#2D3436] uppercase tracking-wider font-mono">
                        {stats.nickname}
                      </span>
                      <button 
                        onClick={handleEditNickname} 
                        title={lang === 'pt' ? 'Editar Perfil' : 'Edit Profile'}
                        className="p-1 text-[#2D3436]/40 hover:text-neo-pink rounded-lg transition-all cursor-pointer border border-transparent hover:bg-slate-50"
                      >
                        <Settings size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-[#2D3436]/40 tracking-wider">Awaiting User Login</span>
                  )}
                </div>
              </div>

              {/* HERO SECTION */}
              <div className="w-full flex flex-col lg:flex-row gap-16 mb-20 relative z-10 items-center font-sans">
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="mb-4 bg-neo-pink/15 text-neo-pink px-4 py-1.5 rounded-full border border-neo-pink/30 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                    Logic & Strategy Sandbox
                  </span>

                  <h1 className="text-6xl md:text-8xl font-black text-[#2D3436] uppercase tracking-tighter leading-none mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-purple via-neo-pink to-neo-orange">Math</span><br/>
                    Quest<span className="text-neo-yellow">.</span>
                  </h1>

                  <p className="text-base md:text-lg font-medium text-[#2D3436]/70 leading-relaxed max-w-xl mb-12 uppercase italic tracking-tight">
                    Explore a beautiful archive of ancestral mathematical logic games and strategic puzzles. Sharpen your induction, challenge interactive models, and master cognitive mechanics.
                  </p>

                  <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start w-full">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartGame}
                      className="bg-neo-yellow text-[#2D3436] px-10 py-5 rounded-2xl border-[3.5px] border-[#2D3436] shadow-neo font-black uppercase text-base tracking-wider flex items-center gap-4 group cursor-pointer hover:bg-neo-yellow/90"
                    >
                      Initialize Sandbox
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border-2 border-[#2D3436] shadow-neo-sm group-hover:rotate-12 transition-transform text-[#2D3436]">
                        <Play size={16} className="fill-current text-neo-purple" />
                      </div>
                    </motion.button>

                    <button 
                      onClick={() => setShowTutorial(true)}
                      className="bg-neo-blue text-white px-8 py-5 rounded-2xl border-[3.5px] border-[#2D3436] shadow-neo-sm font-black uppercase text-xs tracking-widest hover:bg-neo-blue/90 hover:shadow-neo hover:-translate-y-1 transition-all cursor-pointer"
                    >
                      Reference Manual
                    </button>
                  </div>
                </div>

                {/* VISUAL MATRIX DECK */}
                <div className="flex-1 max-w-lg min-h-[340px] bg-[#FAF9F5] border-[3.5px] border-[#2D3436] rounded-[32px] p-8 hidden lg:flex flex-col justify-center relative shadow-neo-sm overflow-hidden">
                  {/* Math coordinate system decoration */}
                  <div className="absolute top-4 left-4 text-[9px] font-mono text-neo-purple font-semibold opacity-50">[f(x, y) = sin(x) * cos(y)]</div>
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono text-neo-pink font-semibold opacity-50">GRID_REF: 0x77AF</div>
                  
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    <g stroke="rgba(45, 52, 54, 0.08)" strokeWidth="1">
                      <line x1="50" y1="0" x2="50" y2="300" />
                      <line x1="150" y1="0" x2="150" y2="300" />
                      <line x1="250" y1="0" x2="250" y2="300" />
                      <line x1="350" y1="0" x2="350" y2="300" />
                      <line x1="0" y1="75" x2="400" y2="75" />
                      <line x1="0" y1="150" x2="400" y2="150" />
                      <line x1="0" y1="225" x2="400" y2="225" />
                    </g>

                    <g stroke="#2D3436" strokeWidth="2" strokeDasharray="4 4" opacity="0.25">
                      <line x1="100" y1="80" x2="200" y2="180" />
                      <line x1="200" y1="180" x2="300" y2="100" />
                      <line x1="300" y1="100" x2="150" y2="240" />
                      <line x1="150" y1="240" x2="100" y2="80" />
                    </g>

                    <path 
                      d="M 50 200 Q 150 50, 250 220 T 350 120" 
                      fill="none" 
                      stroke="#9254FF" 
                      strokeWidth="3.5" 
                      opacity="0.8"
                    />
                    <path 
                      d="M 50 150 Q 150 250, 250 80 T 350 180" 
                      fill="none" 
                      stroke="#FF6B6B" 
                      strokeWidth="2.5" 
                      opacity="0.85"
                    />

                    {[
                      { cx: 100, cy: 80, val: "X", bg: "#9254FF" },
                      { cx: 200, cy: 180, val: "Y", bg: "#4D96FF" },
                      { cx: 300, cy: 100, val: "Z", bg: "#FFD93D" },
                      { cx: 150, cy: 240, val: "N", bg: "#FF6B6B" },
                    ].map((node, i) => (
                      <g key={i}>
                        <motion.circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r="14" 
                          fill="#FFFFFF" 
                          stroke="#2D3436" 
                          strokeWidth="2.5"
                          whileHover={{ r: 18 }}
                          className="cursor-pointer font-bold"
                        />
                        <circle 
                          cx={node.cx} 
                          cy={node.cy} 
                          r="5" 
                          fill={node.bg} 
                        />
                        <text 
                          x={node.cx} 
                          y={node.cy - 20} 
                          textAnchor="middle" 
                          className="font-mono text-[9px] font-black fill-[#2D3436] opacity-90 pb-2"
                        >
                          Node_{node.val}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* SECONDARY STATS BAR / QUICK INFO */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10 px-4 font-sans">
                 {[
                   { label: 'System Puzzles', value: '120+ Curated Challenges', icon: <Dices />, bg: 'bg-[#E3F2FD]', iconBg: 'bg-neo-blue text-white', action: () => setCurrentView('library') },
                   { label: 'Neural Ranks', value: 'Scholar to Master Degree', icon: <Trophy />, bg: 'bg-[#FFFDE7]', iconBg: 'bg-neo-yellow text-[#2D3436]', action: () => setCurrentView('rankings') },
                   { label: 'Deductive Logic', value: '5 Ancient Systems', icon: <Brain />, bg: 'bg-[#FFF0F4]', iconBg: 'bg-neo-pink text-white', action: () => setShowTutorial(true) }
                 ].map((stat, i) => (
                   <motion.div
                     key={i}
                     whileHover={{ y: -6, rotate: i % 2 === 0 ? 0.5 : -0.5 }}
                     onClick={stat.action}
                     className={`p-6 rounded-[24px] border-[3px] border-[#2D3436] ${stat.bg} flex items-center gap-6 group transition-all cursor-pointer shadow-neo-sm hover:shadow-neo`}
                   >
                     <div className={`w-12 h-12 rounded-xl border-2 border-[#2D3436] ${stat.iconBg} flex items-center justify-center font-bold shadow-neo-sm`}>
                       {React.cloneElement(stat.icon as any, { size: 20 })}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-[#2D3436]/60 uppercase tracking-[0.2em] font-medium leading-none mb-1.5">{stat.label}</span>
                        <span className="text-sm font-black text-[#2D3436] uppercase tracking-tight">{stat.value}</span>
                     </div>
                   </motion.div>
                 ))}
              </div>

              {/* OPERATIONAL NAVIGATION NODES */}
              <div className="w-full flex flex-wrap justify-center gap-4 mb-20 relative z-10 font-sans">
                {[
                  { label: 'Neural Archives', icon: <BookOpen size={14} />, bg: 'hover:bg-neo-purple hover:text-white', action: () => setCurrentView('library') },
                  { label: 'Random.Init()', icon: <RefreshCw size={14} />, bg: 'hover:bg-neo-pink hover:text-white', action: () => {
                    const randomGame = ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)];
                    setShowGameTutorial(randomGame);
                  }},
                  { label: 'Global Leaderboard', icon: <Trophy size={14} />, bg: 'hover:bg-neo-orange hover:text-white', action: () => setCurrentView('rankings') },
                  { label: 'System Preferences', icon: <Settings size={14} />, bg: 'hover:bg-neo-green hover:text-[#2D3436]', action: () => setShowSettings(true) },
                ].map((node, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={node.action}
                    className={`px-6 py-4 rounded-xl border-2 border-[#2D3436] bg-white text-[#2D3436] font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-neo-sm transition-all cursor-pointer ${node.bg}`}
                  >
                    {node.icon}
                    {node.label}
                  </motion.button>
                ))}
              </div>

              {/* Historical Math Wisdom Ticker */}
              <div className="w-full border-y border-[#2D3436]/10 bg-white overflow-hidden py-4 relative z-10 scale-[1.02]">
                <motion.div 
                  animate={{ x: [0, -1500] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap flex gap-12"
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex gap-12 items-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#2D3436]/60 italic font-medium">
                      <span>"Nature is written in mathematical characters" — Galileo</span>
                      <span className="w-1.5 h-1.5 bg-neo-purple rounded-full" />
                      <span>"Logic is the anatomy of thought" — Locke</span>
                      <span className="w-1.5 h-1.5 bg-neo-pink rounded-full" />
                      <span>"The art of proposing a question is above solving it" — Cantor</span>
                      <span className="w-1.5 h-1.5 bg-neo-green rounded-full" />
                      <span>"Numbers rule the universe" — Pythagoras</span>
                      <span className="w-1.5 h-1.5 bg-[#2D3436]/20 rounded-full" />
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Floating Effects */}
        <AnimatePresence>
          {activeXP.map(xp => (
            <FloatingXP 
              key={xp.id} 
              amount={xp.amount} 
              onComplete={() => setActiveXP(prev => prev.filter(f => f.id !== xp.id))} 
            />
          ))}
          {activeCoins.map(id => (
            <FloatingCoin 
              key={id} 
              onComplete={() => setActiveCoins(prev => prev.filter(cid => cid !== id))} 
            />
          ))}
        </AnimatePresence>

        {/* Nickname Modal */}
        <AnimatePresence mode="wait">
          {isStatsReady && !stats.nickname && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#2D3436]/90 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.8, y: 40, rotate: -1 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="bg-white p-1 md:p-2 rounded-[48px] border-[8px] border-[#2D3436] shadow-neo max-w-4xl w-full relative overflow-hidden my-auto"
              >
                {/* Decorative background stripes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 -rotate-45 translate-x-32 -translate-y-32 border-b-4 border-[#2D3436] pointer-events-none" />
                
                <div className="p-6 md:p-10 relative z-10 space-y-6">
                  {/* Title & Language Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-[#2D3436] pb-6 gap-4">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none">
                        {lang === 'pt' ? 'CONFIGURAR REGISTO' : 'SETUP PROFILE'}
                      </h2>
                      <p className="font-bold text-[#2D3436]/50 uppercase text-[10px] tracking-[0.3em] mt-1">
                        {lang === 'pt' ? 'Módulo 00: Identidade e Emblema' : 'Module 00: Identity and Emblem'}
                      </p>
                    </div>
                    
                    {/* Inline Language switcher */}
                    <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1.5 rounded-2xl border-2 border-[#2D3436] shrink-0">
                      <button
                        type="button"
                        onClick={() => { playSfx('click'); setLang('en'); localStorage.setItem('math-quest-lang', 'en'); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                          lang === 'en' 
                            ? 'bg-neo-purple text-white shadow-neo-sm border-2 border-[#2D3436]' 
                            : 'text-[#2D3436]/50 hover:bg-[#2D3436]/5'
                        }`}
                      >
                        EN 🇬🇧
                      </button>
                      <button
                        type="button"
                        onClick={() => { playSfx('click'); setLang('pt'); localStorage.setItem('math-quest-lang', 'pt'); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                          lang === 'pt' 
                            ? 'bg-neo-pink text-white shadow-neo-sm border-2 border-[#2D3436]' 
                            : 'text-[#2D3436]/50 hover:bg-[#2D3436]/5'
                        }`}
                      >
                        PT 🇵🇹
                      </button>
                    </div>
                  </div>

                  {/* Character Creator Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
                    
                    {/* Left Column: Live Card Preview */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="text-center mb-2">
                        <span className="font-black text-[10px] tracking-[0.35em] text-[#2D3436]/40 uppercase">
                          {lang === 'pt' ? 'PRÉ-VISUALIZAÇÃO DA CREDENCIAL' : 'LIVE PASSPORT PREVIEW'}
                        </span>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: 1 }}
                        className={`rounded-[32px] border-[5px] border-[#2D3436] p-6 text-center shadow-neo-sm relative overflow-hidden transition-colors ${selectedAvatarColor} max-w-sm mx-auto w-full`}
                      >
                        {/* Interactive decoration inside badge */}
                        <div className="absolute top-0 left-0 w-24 h-6 bg-[#2D3436]/10 -rotate-45 -translate-x-10 translate-y-4 font-mono text-[6px] tracking-widest font-bold">LEGACY</div>
                        <div className="absolute bottom-4 right-4 text-[10px] uppercase font-mono opacity-25 font-black">QUEST PASS</div>
                        
                        <div className="space-y-6">
                          <div className="bg-white/95 py-1.5 px-4 rounded-full border-2 border-[#2D3436] inline-block shadow-neo-sm text-[8px] font-black uppercase tracking-widest text-[#2D3436]">
                            🔬 {lang === 'pt' ? 'ACADEMISTA COGNITIVO' : 'COGNITIVE SCHOLAR'}
                          </div>

                          {/* Avatar Circle with Bobbing animation */}
                          <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-28 h-28 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-[#2D3436] shadow-neo-sm text-6xl relative"
                          >
                            {selectedAvatar}
                            <div className="absolute -bottom-2 -right-2 bg-neo-yellow text-[#2D3436] border-2 border-[#2D3436] rounded-md px-1.5 py-0.5 text-[9px] font-black italic shadow-neo-sm">
                              LVL {stats.level}
                            </div>
                          </motion.div>

                          {/* Nickname feedback */}
                          <div className="space-y-1">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter truncate text-[#2D3436] px-2 leading-none max-w-full">
                              {nicknameInput.trim() || 'CHALLENGER'}
                            </h3>
                            <p className="text-[10px] font-black uppercase text-[#2D3436]/40 tracking-widest">
                              {stats.problemsSolved} SOLVES • {stats.points} XP
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column: Profile Form Details */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      
                      {/* Section 1: Choose Avatar Emblem */}
                      <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-[#2D3436]/60">
                          {lang === 'pt' ? '1. ESCOLHA O SEU EMBLEMA:' : '1. CHOOSE YOUR EMBLAZON:'}
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                          {AVATAR_OPTIONS.map((av) => (
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              key={av.emoji}
                              title={lang === 'pt' ? av.labelPt : av.labelEn}
                              onClick={() => { playSfx('click'); setSelectedAvatar(av.emoji); }}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-3 shadow-neo-sm cursor-pointer transition-all ${
                                selectedAvatar === av.emoji 
                                  ? 'border-[#2D3436] bg-[#FFEAA7] scale-110 -rotate-3' 
                                  : 'border-[#2D3436]/30 bg-slate-50 hover:bg-[#FFEAA7]/30 hover:border-[#2D3436]'
                              }`}
                            >
                              {av.emoji}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Choose Badge Background Color */}
                      <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-[#2D3436]/60">
                          {lang === 'pt' ? '2. COR DE FUNDO:' : '2. BACKGROUND SHADE:'}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {COLOR_OPTIONS.map((col) => (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              type="button"
                              key={col.class}
                              title={lang === 'pt' ? col.namePt : col.nameEn}
                              onClick={() => { playSfx('click'); setSelectedAvatarColor(col.class); }}
                              className={`w-10 h-10 rounded-full border-3 border-[#2D3436] cursor-pointer transition-all ${col.class} ${
                                selectedAvatarColor === col.class 
                                  ? 'ring-4 ring-offset-2 ring-neo-purple scale-110 shadow-neo-sm' 
                                  : 'opacity-70 hover:opacity-100'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Input Nickname with suggesting engine */}
                      <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-[#2D3436]/60">
                          {lang === 'pt' ? '3. ESCREVA O SEU APELIDO:' : '3. ENTER YOUR SCHOLAR NAME:'}
                        </label>
                        <form onSubmit={handleSetNickname} className="space-y-5">
                          <div className="flex gap-3 items-stretch relative">
                            <div className="relative flex-1">
                              <input
                                autoFocus
                                type="text"
                                value={nicknameInput}
                                onChange={(e) => handleNicknameChange(e.target.value.toUpperCase())}
                                placeholder="E.G. MATH_PRO"
                                maxLength={15}
                                className={`w-full px-6 py-4 rounded-2xl border-[4px] text-xl font-black uppercase placeholder:text-slate-200 focus:outline-none focus:shadow-neo-sm transition-all ${
                                  nicknameError 
                                    ? 'border-neo-pink bg-neo-pink/5 text-neo-pink' 
                                    : 'border-[#2D3436] focus:border-neo-purple'
                                }`}
                              />
                            </div>
                            
                            {/* Autogenerate Dice Action Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={generateRandomNickname}
                              title={lang === 'pt' ? 'Sugerir Nome Aleatório' : 'Suggest Random Name'}
                              className="px-5 bg-neo-yellow hover:bg-[#FFEAA7] border-[4px] border-[#2D3436] rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-neo-sm"
                            >
                              <Dices size={24} className="text-[#2D3436]" />
                              <span className="hidden sm:inline font-black text-xs uppercase italic">{lang === 'pt' ? 'GERAR' : 'RANDOM'}</span>
                            </motion.button>
                          </div>

                          {/* Dynamic Validating Error Display */}
                          <div className="relative min-h-[24px]">
                            <AnimatePresence mode="wait">
                              {nicknameError ? (
                                <motion.p
                                  key="error"
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-xs font-black text-neo-pink uppercase leading-none"
                                >
                                  ⚠️ {nicknameError}
                                </motion.p>
                              ) : (
                                <motion.p
                                  key="help"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.4 }}
                                  className="text-[10px] font-black uppercase text-[#2D3436] tracking-[0.05em] leading-none"
                                >
                                  {lang === 'pt' 
                                    ? 'Apenas letras, números e underscores (3-15 caracteres).' 
                                    : 'Alphanumeric and underscores only (3-15 chars).'}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Prebuilt suggestion pills based on avatar */}
                          <div className="space-y-2 pt-2 pb-1 border-t border-[#2D3436]/10">
                            <div className="text-[10px] font-black uppercase tracking-wider text-[#2D3436]/50 flex items-center gap-1">
                              💡 {lang === 'pt' ? 'Sugestões com base no emblema:' : 'Suggestions for this emblem:'}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getEmblemSuggestions(selectedAvatar, lang === 'pt').map((suggestion) => (
                                <button
                                  key={suggestion}
                                  type="button"
                                  onClick={() => {
                                    playSfx('click');
                                    setNicknameInput(suggestion);
                                    setNicknameError(validateNickname(suggestion));
                                  }}
                                  className={`px-3 py-1.5 rounded-xl border-2 border-[#2D3436] text-[10px] font-mono font-black italic shadow-neo-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                    nicknameInput === suggestion 
                                      ? 'bg-neo-purple text-white shadow-none' 
                                      : 'bg-white text-[#2D3436] hover:bg-slate-100'
                                  }`}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Submission Trigger */}
                          <div className="pt-2">
                            <motion.button
                              whileHover={(!nicknameError && nicknameInput.trim()) ? { scale: 1.02 } : {}}
                              whileTap={(!nicknameError && nicknameInput.trim()) ? { scale: 0.98 } : {}}
                              type="submit"
                              disabled={!!nicknameError || !nicknameInput.trim()}
                              className={`neo-btn w-full py-5 text-xl font-black flex items-center justify-center gap-3 transition-all uppercase italic ${
                                !!nicknameError || !nicknameInput.trim()
                                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50 shadow-none'
                                  : 'bg-neo-green text-[#2D3436] hover:bg-[#58b764]'
                              }`}
                            >
                              <Zap size={22} className="fill-current" />
                              {lang === 'pt' ? 'INICIAR JORNADA' : 'ENTER SIMULATION'}
                            </motion.button>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                  
                  {/* Agreement law footer */}
                  <div className="border-t-2 border-[#2D3436]/10 pt-4 text-center">
                    <p className="text-[9px] font-black text-[#2D3436]/35 uppercase tracking-[0.2em] leading-relaxed max-w-xl mx-auto">
                      {lang === 'pt' 
                        ? 'Ao prosseguir, você compromete-se com as leis lógicas e estratégia intelectual do Campeonato de Jogos Matemáticos.' 
                        : 'By proceeding, you submit to the mathematical algorithms, game theory, and strategic pursuits of the Academy.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGameTutorial && (
            <GameTutorialModal 
              game={showGameTutorial} 
              onClose={() => setShowGameTutorial(null)} 
              onStart={(game) => {
                setShowGameTutorial(null);
                setSelectedGame(game);
                const problem = getRandomProblem('easy', stats.level, 'mixed', game.name);
                setCurrentProblem(problem);
                setCurrentView('game');
              }}
              playSfx={playSfx}
              t={t}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[#2D3436]/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, rotate: -1 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="bg-white rounded-[48px] border-[8px] border-[#2D3436] shadow-neo-lg max-w-xl w-full relative overflow-hidden flex flex-col"
              >
                {/* Modal System Header */}
                <div className="bg-[#2D3436] px-8 py-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-neo-purple" />
                      <div className="w-2 h-2 rounded-full bg-neo-pink" />
                      <div className="w-2 h-2 rounded-full bg-neo-yellow" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] font-mono italic">Tutorial.Module_OS.v1</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="text-[9px] font-black text-neo-purple uppercase tracking-[0.3em] font-mono">Step_0{tutorialStep + 1}</div>
                  </div>
                </div>

                <div className="absolute top-12 left-0 w-full h-1.5 bg-slate-100 shrink-0">
                  <motion.div 
                    className="h-full bg-neo-purple shadow-[0_0_15px_rgba(157,126,254,0.6)]"
                    animate={{ width: `${((tutorialStep + 1) / t.tutorial.steps.length) * 100}%` }}
                    transition={{ type: "spring", damping: 20 }}
                  />
                </div>

                <button 
                  onClick={() => {
                    playSfx('click');
                    setShowTutorial(false);
                    setTutorialStep(0);
                  }}
                  className="absolute top-16 right-8 p-3 hover:bg-slate-100 rounded-2xl transition-all hover:rotate-90 z-20"
                >
                  <X size={24} className="text-[#2D3436]" />
                </button>

                <div className="p-10 pt-20 flex flex-col items-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tutorialStep}
                      initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
                      className="w-32 h-32 bg-slate-50 rounded-[40px] mb-8 flex items-center justify-center border-[5px] border-[#2D3436] shadow-neo-sm relative group"
                    >
                      <div className="absolute inset-0 bg-neo-purple/5 rounded-[35px] animate-pulse" />
                      <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                        {t.tutorial.steps[tutorialStep].icon}
                      </span>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-10 h-10 bg-neo-yellow rounded-xl border-[3px] border-[#2D3436] flex items-center justify-center rotate-12 shadow-neo-sm">
                         <span className="text-xs font-black text-[#2D3436] italic">{tutorialStep + 1}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="space-y-6 max-w-sm mb-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tutorialStep}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                      >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none mb-4 text-[#2D3436]">
                          {t.tutorial.steps[tutorialStep].title}
                        </h2>
                        <p className="text-[#2D3436]/60 font-bold text-lg md:text-xl leading-snug italic">
                          {t.tutorial.steps[tutorialStep].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-6 w-full max-w-md pt-4">
                    {tutorialStep > 0 && (
                      <button
                        onClick={() => {
                          playSfx('click');
                          setTutorialStep(s => s - 1);
                        }}
                        className="bg-white px-8 py-5 rounded-3xl border-[4px] border-[#2D3436] font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all shadow-neo-sm active:shadow-none active:translate-y-1"
                      >
                        {t.tutorial.back}
                      </button>
                    )}
                    {tutorialStep < t.tutorial.steps.length - 1 ? (
                      <button
                        onClick={() => {
                          playSfx('click');
                          setTutorialStep(s => s + 1);
                        }}
                        className="bg-neo-purple text-white flex-1 py-5 rounded-3xl border-[4px] border-[#2D3436] font-black uppercase text-sm tracking-widest shadow-neo hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-neo-sm flex items-center justify-center gap-3"
                      >
                        <span>{t.tutorial.next}</span>
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          playSfx('click');
                          setShowTutorial(false);
                          setTutorialStep(0);
                        }}
                        className="bg-neo-green text-[#2D3436] flex-1 py-5 rounded-3xl border-[4px] border-[#2D3436] font-black uppercase text-sm tracking-widest shadow-neo hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-neo-sm flex items-center justify-center gap-3"
                      >
                        <span>{t.tutorial.finish}</span>
                        <Zap size={20} fill="currentColor" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Deco Bar */}
                <div className="h-4 flex shrink-0 mt-auto border-t-[4px] border-[#2D3436]">
                  <div className="flex-1 bg-neo-purple" />
                  <div className="flex-1 bg-neo-pink" />
                  <div className="flex-1 bg-neo-yellow" />
                  <div className="flex-1 bg-neo-green" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#2D3436]/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-8 rounded-[40px] border-[6px] border-[#2D3436] shadow-neo max-w-sm w-full relative"
              >
                <button 
                  onClick={() => setShowSettings(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-[#2D3436]" />
                </button>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-neo-yellow rounded-xl flex items-center justify-center border-[3px] border-[#2D3436]">
                    <span className="font-black text-[#2D3436]">#</span>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">{t.settings}</h2>
                </div>

                <div className="space-y-4">
                  {/* Tutorial Trigger */}
                  <button 
                    onClick={() => {
                      setShowSettings(false);
                      setShowTutorial(true);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-neo-blue/10 border-[3px] border-neo-blue rounded-2xl group transition-all hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="text-neo-blue" />
                      <span className="font-black uppercase text-sm tracking-tight">{t.howToPlay}</span>
                    </div>
                    <ChevronRight size={18} className="text-neo-blue" />
                  </button>

                  {/* Sound Toggle */}
                  <button 
                    onClick={() => {
                      const next = !soundEnabled;
                      setSoundEnabled(next);
                      if (next) {
                        // Play a brief success sound to confirm it's now ON
                        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                        if (AudioContext) {
                          const ctx = new AudioContext();
                          const osc = ctx.createOscillator();
                          const gain = ctx.createGain();
                          osc.connect(gain);
                          gain.connect(ctx.destination);
                          osc.frequency.setValueAtTime(880, ctx.currentTime);
                          gain.gain.setValueAtTime(0.05, ctx.currentTime);
                          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                          osc.start();
                          osc.stop(ctx.currentTime + 0.1);
                        }
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 border-[3px] border-[#2D3436] rounded-2xl group transition-all hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {soundEnabled ? <Volume2 className="text-neo-purple" /> : <VolumeX className="text-slate-400" />}
                      <span className="font-black uppercase text-sm tracking-tight">{t.sound}</span>
                    </div>
                    <div className={`w-12 h-6 rounded-full border-[3px] border-[#2D3436] relative transition-colors ${soundEnabled ? 'bg-neo-green' : 'bg-slate-200'}`}>
                      <div className={`absolute top-0.5 bottom-0.5 w-3.5 h-3.5 bg-white border-2 border-[#2D3436] rounded-full transition-all ${soundEnabled ? 'right-1' : 'left-1'}`} />
                    </div>
                  </button>

                  {/* Language Selector */}
                  <button 
                    onClick={() => {
                      const next = lang === 'en' ? 'pt' : 'en';
                      setLang(next);
                      localStorage.setItem('math-quest-lang', next);
                      playSfx('click');
                    }}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 border-[3px] border-[#2D3436] rounded-2xl group transition-all hover:bg-white cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="text-neo-blue animate-pulse" />
                      <span className="font-black uppercase text-sm tracking-tight">{t.language}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border-2 border-[#2D3436] transition-all ${lang === 'en' ? 'bg-neo-yellow text-[#2D3436]' : 'bg-white text-slate-400'}`}>EN</span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border-2 border-[#2D3436] transition-all ${lang === 'pt' ? 'bg-neo-purple text-white' : 'bg-white text-slate-400'}`}>PT</span>
                    </div>
                  </button>

                  <div className="pt-4 mt-4 border-t-4 border-slate-100 italic text-[10px] uppercase font-bold text-slate-400">
                    {t.danger}
                  </div>

                  {/* Reset Progress */}
                  <button 
                    onClick={() => {
                      if (confirm(t.confirmReset)) {
                        setStats(INITIAL_STATS);
                        localStorage.removeItem('math-quest-stats');
                        setShowSettings(false);
                        window.location.reload();
                      }
                    }}
                    className="w-full flex items-center gap-3 p-4 bg-rose-50 border-[3px] border-rose-500 rounded-2xl text-rose-500 hover:bg-rose-100 transition-all font-black uppercase text-sm tracking-tight"
                  >
                    <Trash2 size={20} />
                    {t.reset}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level Up Notification */}
        <AnimatePresence>
          {showLevelUp && (
            <LevelUpOverlay level={stats.level} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
          {currentView === 'rankings' && (
            <motion.div
              key="rankings"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 z-[70] bg-math-bg overflow-y-auto dotted-grid p-6 md:p-12"
            >
              {/* Soft decorative background colors */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                 <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#9254FF]/30 to-[#FFD93D]/30 blur-[120px] opacity-20 mixer-blend-multiply" />
                 <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF6B6B]/30 to-[#6BCB77]/30 blur-[120px] opacity-20 mixer-blend-multiply" />
              </div>

              <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <button 
                    onClick={() => {
                      playSfx('click');
                      setCurrentView('landing');
                    }}
                    className="neo-btn bg-white px-6 py-3 flex items-center gap-2 font-black uppercase text-sm tracking-widest"
                  >
                    <ChevronLeft size={20} />
                    Back to Home
                  </button>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-[#2D3436] text-white px-3 py-1 rounded">Live Rankings</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2D3436]/40 italic mt-1">Updated every 30s</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-[#2D3436] rounded-[24px] flex items-center justify-center border-[4px] border-[#2D3436] shadow-neo-sm">
                        <Trophy size={32} className="text-neo-yellow" />
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Global Hall of Fame</h2>
                    </div>
                    <p className="text-[#2D3436]/60 font-black uppercase text-xs tracking-[0.3em] ml-1">The greatest minds in logic history</p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => {
                          playSfx('click');
                          setLeaderboardPage(p => Math.max(0, p - 1));
                        }}
                        disabled={leaderboardPage === 0}
                        className="w-14 h-14 neo-btn bg-white flex items-center justify-center disabled:opacity-30 disabled:translate-y-0 disabled:shadow-none hover:bg-neo-purple hover:text-white transition-all shadow-neo-sm"
                      >
                        <ChevronLeft size={28} />
                      </button>
                      
                      <div className="flex items-center gap-3 px-8">
                        {Array.from({ length: Math.ceil(leaderboard.length / 5) }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              playSfx('click');
                              setLeaderboardPage(i);
                            }}
                            className={`w-4 h-4 rounded-full transition-all border-2 border-[#2D3436] shadow-sm ${
                              leaderboardPage === i 
                                ? 'bg-neo-purple scale-125' 
                                : 'bg-white hover:opacity-100 opacity-30 shadow-none'
                            }`}
                          />
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          playSfx('click');
                          setLeaderboardPage(p => Math.min(Math.max(0, Math.ceil(leaderboard.length / 5) - 1), p + 1));
                        }}
                        disabled={leaderboardPage >= Math.ceil(leaderboard.length / 5) - 1}
                        className="w-14 h-14 neo-btn bg-white flex items-center justify-center disabled:opacity-30 disabled:translate-y-0 disabled:shadow-none hover:bg-neo-purple hover:text-white transition-all shadow-neo-sm"
                      >
                        <ChevronRight size={28} />
                      </button>
                    </div>
                    <div className="bg-[#2D3436] text-white px-5 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest shadow-neo-sm drop-shadow-sm">
                      Page {leaderboardPage + 1} of {Math.max(1, Math.ceil(leaderboard.length / 5))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-20">
                  {leaderboard.slice(leaderboardPage * 5, (leaderboardPage + 1) * 5).map((entry, idx) => {
                    const rank = leaderboardPage * 5 + idx + 1;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={`${entry.nickname}-${idx}`}
                        className={`mini-neo-card flex items-center gap-6 p-6 border-[4px] border-[#2D3436] transition-all hover:-translate-y-1 ${
                          entry.nickname === stats.nickname ? 'bg-neo-blue/10' : 'bg-white'
                        } rounded-[32px]`}
                      >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl border-[4px] border-[#2D3436] shadow-neo-sm shrink-0 ${
                          rank === 1 ? 'bg-neo-yellow scale-110 -rotate-3' : rank === 2 ? 'bg-slate-100' : rank === 3 ? 'bg-neo-orange/40 text-[#2D3436]/70' : 'bg-slate-50 text-[#2D3436]/20'
                        }`}>
                          {rank === 1 ? '👑' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                        </div>

                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-[3px] border-[#2D3436] shadow-neo-sm shrink-0 ${
                          entry.nickname === stats.nickname ? (stats.avatarColor || 'bg-neo-blue') : getDeterministicColor(entry.nickname)
                        }`}>
                          {entry.nickname === stats.nickname ? (stats.avatar || '🧠') : getDeterministicAvatar(entry.nickname)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-black text-2xl uppercase italic tracking-tight truncate">{entry.nickname}</span>
                            {entry.nickname === stats.nickname && (
                              <span className="bg-neo-purple text-white text-[10px] font-black px-3 py-1 rounded italic shadow-neo-sm shrink-0">CHAMPION</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none italic">
                            <span>LVL {entry.level}</span>
                            <span>{entry.problemsSolved} Solved</span>
                            <span className="text-neo-pink">🔥 {entry.streak} Max Streak</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-4xl font-black text-neo-purple block leading-[0.8] mb-1">{entry.points.toLocaleString()}</span>
                          <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Mastery XP</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {leaderboard.length === 0 && (
                    <div className="neo-card p-24 text-center bg-white/50 border-dashed border-[#2D3436]/20 border-[4px] rounded-[48px]">
                      <span className="text-6xl block mb-6">🏜️</span>
                      <p className="font-black text-[#2D3436]/30 uppercase tracking-[0.3em]">The records consist of nothing but dust... for now.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentView === 'library' && (
          <motion.div
            key="library-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[60] bg-math-bg overflow-y-auto overflow-x-hidden dotted-grid pt-12 pb-24"
          >
            {/* Soft decorative background colors */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
               <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF8066]/30 to-[#FFD93D]/30 blur-[120px] opacity-20 mix-blend-multiply pointer-events-none" />
               <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#9254FF]/30 to-[#4D96FF]/30 blur-[130px] opacity-20 mix-blend-multiply pointer-events-none" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col min-h-screen">
              <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 px-4">
                <div 
                  className="flex items-center gap-6 cursor-pointer group"
                  onClick={() => {
                    playSfx('click');
                    setCurrentView('landing');
                  }}
                >
                  <div className="w-14 h-14 bg-neo-purple rounded-2xl flex items-center justify-center border-[4px] border-[#2D3436] shadow-neo-sm group-hover:-translate-y-1 group-hover:bg-neo-purple/90 transition-all overflow-hidden relative">
                    <ChevronLeft size={32} className="text-white relative z-10 font-black" />
                  </div>
                  <div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">{t.library}</h2>
                    <div className="text-neo-purple font-black uppercase text-[10px] tracking-[0.4em] mt-2 italic flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-neo-purple" />
                       Archive of Ancestral Logic Systems
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:max-w-2xl">
                  <div className="relative flex-1 group w-full">
                    <div className="absolute -inset-1 bg-neo-purple opacity-5 blur-xl group-focus-within:opacity-20 transition-opacity" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2D3436]/30 group-focus-within:text-neo-purple transition-colors" size={20} />
                    <input 
                      type="text"
                      placeholder="Search by name, type or math concept..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                      className="w-full pl-14 pr-6 py-5 bg-white border-[4px] border-[#2D3436] rounded-3xl font-black uppercase text-xs tracking-widest focus:outline-none focus:shadow-neo transition-all placeholder:text-[#2D3436]/10"
                    />
                  </div>
                </div>
              </header>

              {/* System Protocol Specs - Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4 italic">
                {[
                  { label: 'Solve Protocol', value: 'Decode 100+ Logic Archetypes', icon: <Brain size={20} />, color: 'bg-neo-purple' },
                  { label: 'Efficiency Gain', value: 'XP Multipliers active at Level 5+', icon: <Zap size={20} />, color: 'bg-neo-pink' },
                  { label: 'Rank Structure', value: 'From Scholar to Apex Grandmaster', icon: <Trophy size={20} />, color: 'bg-neo-yellow text-[#2D3436]' }
                ].map((spec, i) => (
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     key={i} 
                     className="flex items-center gap-5 p-6 bg-white border-[4px] border-[#2D3436] rounded-[32px] shadow-neo-sm group hover:-translate-y-1 transition-all"
                  >
                    <div className={`w-14 h-14 ${spec.color} rounded-2xl flex items-center justify-center border-[3px] border-[#2D3436] shadow-neo-sm shrink-0 group-hover:rotate-6 transition-transform`}>
                      <div className="font-bold">{spec.icon}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#2D3436]/40 leading-none mb-1.5 italic">{spec.label}</div>
                      <div className="text-sm font-black uppercase tracking-tight text-[#2D3436] italic">{spec.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-12 px-4">
                {['ALL', 'LOGIC', 'MATH', 'PATTERN'].map((cat) => {
                  const catClasses: Record<string, { active: string, hover: string }> = {
                    'ALL': { active: 'bg-[#2D3436] text-white shadow-neo-sm', hover: 'hover:bg-[#2D3436] hover:text-white' },
                    'LOGIC': { active: 'bg-neo-blue text-white shadow-neo-sm', hover: 'hover:bg-neo-blue hover:text-white' },
                    'MATH': { active: 'bg-neo-yellow text-[#2D3436] shadow-neo-sm', hover: 'hover:bg-neo-yellow hover:text-[#2D3436]' },
                    'PATTERN': { active: 'bg-neo-green text-white shadow-neo-sm', hover: 'hover:bg-neo-green hover:text-white' },
                  };
                  const colors = catClasses[cat] || catClasses['ALL'];
                  return (
                    <motion.button
                      key={cat}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playSfx('click');
                        setActiveCategory(cat);
                      }}
                      className={`px-6 py-3 rounded-2xl font-black text-[10px] tracking-[0.2em] border-[3px] border-[#2D3436] transition-all cursor-pointer shadow-neo-sm hover:shadow-neo
                        ${activeCategory === cat 
                          ? colors.active
                          : `bg-white text-[#2D3436] ${colors.hover}`
                        }`}
                    >
                      {cat}
                    </motion.button>
                  );
                })}
              </div>

              {/* Enhanced Random Game Feature */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 px-4">
                <motion.button
                  whileHover={{ scale: 1.01, y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    playSfx('click');
                    const randomGame = ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)];
                    setShowGameTutorial(randomGame);
                  }}
                  className="lg:col-span-8 bg-neo-yellow p-10 md:p-12 rounded-[56px] border-[8px] border-[#2D3436] shadow-neo-lg flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2d3436_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-24 h-24 md:w-32 md:h-32 bg-white border-[6px] border-[#2D3436] rounded-[40px] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-neo-sm"
                      >
                        <Dices size={56} className="text-[#2D3436]" />
                      </motion.div>
                      <div className="absolute -top-4 -right-4 bg-neo-pink text-white w-12 h-12 rounded-full border-[4px] border-[#2D3436] flex items-center justify-center font-black italic rotate-12 shadow-neo-sm">
                        !!
                      </div>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                       <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none block text-[#2D3436]">{t.randomGame}</span>
                       <p className="text-[#2D3436]/60 font-bold uppercase text-[10px] tracking-widest">Let Destiny Sequence Your Session</p>
                       <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                          <div className="flex items-center gap-2 bg-[#2D3436] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic">
                            <Zap size={12} className="fill-current" />
                            Ultra_Fast_Match
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-end gap-2 relative z-10 shrink-0">
                    <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-3xl border-[4px] border-[#2D3436]/10 text-right">
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">System Difficulty</div>
                      <div className="text-2xl font-black italic">Adaptive</div>
                    </div>
                  </div>

                  <div className="absolute right-[-5%] bottom-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={240} strokeWidth={8} />
                  </div>
                </motion.button>

                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="flex-1 bg-white border-[6px] border-[#2D3436] rounded-[48px] p-8 shadow-neo-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Trophy size={64} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neo-purple mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neo-purple" />
                        Hall of Fame
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic mb-2 font-display">Top Performer</h3>
                      <p className="text-xs font-bold text-[#2D3436]/50 uppercase tracking-widest">{leaderboard[0]?.name || 'No Data Found'}</p>
                    </div>
                    <div className="mt-6 flex items-end justify-between">
                      <div className="text-5xl font-black italic tracking-tighter">{leaderboard[0]?.xp || '0'}<span className="text-lg opacity-20 ml-2">XP</span></div>
                      <div className="bg-[#2D3436] text-white p-3 rounded-2xl">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Label */}
              <div className="flex items-center gap-4 mb-10 px-4">
                <div className="h-[4px] flex-1 bg-[#2D3436]/5 rounded-full" />
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#2D3436]/30 italic shrink-0">Selected Categories</span>
                </div>
                <div className="h-[4px] flex-1 bg-[#2D3436]/5 rounded-full" />
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                {ALL_GAMES.filter(g => {
                  const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                       g.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       g.description.toLowerCase().includes(searchTerm.toLowerCase());
                  const gameCategoryMap: Record<string, string> = {
                    "Ouri": "MATH",
                    "Senet": "LOGIC",
                    "Stomachion": "PATTERN",
                    "15 Puzzle": "LOGIC",
                    "Tangram": "PATTERN",
                    "Magic Squares": "MATH",
                    "Sudoku": "LOGIC",
                    "Game of 24": "MATH",
                    "Hex": "LOGIC"
                  };
                  const mappedCat = gameCategoryMap[g.name] || 'LOGIC';
                  const matchesCategory = activeCategory === 'ALL' || mappedCat === activeCategory;
                  return matchesSearch && matchesCategory;
                }).map((game, i) => (
                  <motion.div
                    key={game.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <GameCard 
                      game={game}
                      isSelected={selectedGame?.name === game.name}
                      onSelect={() => {
                        playSfx('click');
                        setSelectedGame(game);
                        const problem = getRandomProblem('easy', stats.level, 'mixed', game.name);
                        setCurrentProblem(problem);
                        setCurrentView('game');
                      }}
                      onHelp={() => {
                        playSfx('click');
                        setShowGameTutorial(game);
                      }}
                      playSfx={playSfx}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Footer Decoration */}
              <div className="mt-32 pt-16 border-t-[8px] border-dotted border-[#2D3436]/10 text-center mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto opacity-10 mb-16">
                  {[
                    { label: 'Latency', value: '4ms' },
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Packets', value: '0 Lost' },
                    { label: 'Security', value: 'AES-256' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                       <div className="text-3xl font-black italic">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <p className="max-w-3xl mx-auto text-xl font-bold text-[#2D3436]/20 italic leading-relaxed uppercase tracking-widest">
                  {t.explore}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'game' && (
          <motion.div 
            key="game-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#E6DAFC] via-[#F4EBFF] to-[#DBEAFF] overflow-y-auto overflow-x-hidden dotted-grid"
          >
             {/* Backdrops */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#9254FF]/40 to-[#FF6B6B]/40 blur-[120px] opacity-25 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#4D96FF]/40 to-[#6BCB77]/40 blur-[130px] opacity-25 mix-blend-multiply pointer-events-none" />
             </div>
             {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
               <div className="floating-symbol top-[15%] left-[5%] animate-math-float text-neo-purple/20 text-6xl" style={{ animationDelay: '0s' }}>Δ</div>
               <div className="floating-symbol top-[25%] right-[10%] animate-math-float text-neo-pink/20 text-5xl" style={{ animationDelay: '1.5s' }}>λ</div>
               <div className="floating-symbol bottom-[20%] left-[12%] animate-math-float text-neo-blue/20 text-7xl" style={{ animationDelay: '3s' }}>Ω</div>
               <div className="floating-symbol bottom-[30%] right-[15%] animate-math-float text-neo-yellow/20 text-5xl" style={{ animationDelay: '0.8s' }}>φ</div>
               <div className="floating-symbol top-[45%] left-[35%] animate-math-float opacity-[0.05] text-9xl text-[#2D3436]" style={{ animationDelay: '2.5s' }}>θ</div>
               
               {/* Vertical Data Streams */}
               <div className="absolute top-0 bottom-0 left-[20%] w-px bg-current opacity-[0.05]" />
               <div className="absolute top-0 bottom-0 left-[40%] w-px bg-current opacity-[0.05]" />
               <div className="absolute top-0 bottom-0 left-[60%] w-px bg-current opacity-[0.05]" />
               <div className="absolute top-0 bottom-0 left-[80%] w-px bg-current opacity-[0.05]" />

               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[1px] border-[#2D3436]/5 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-[#2D3436]/5 rounded-[200px]"
               />
            </div>

            <div className="relative max-w-7xl mx-auto min-h-screen flex flex-col">
              {/* Header */}
              <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-10 px-8 lg:px-12 relative z-20">
                <div className="flex items-center gap-6">
                  {/* Dedicated Exit/Back Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playSfx('click');
                      setCurrentView('library');
                    }}
                    className="relative group cursor-pointer"
                    title={t.backToLibrary}
                  >
                    <div className="absolute inset-x-0 h-full bg-[#2D3436] rounded-2xl translate-y-2" />
                    <div className="relative w-16 h-16 bg-neo-pink rounded-2xl flex items-center justify-center border-[4px] border-[#2D3436] shadow-neo-sm">
                      <ArrowLeft size={32} className="text-white font-black stroke-[4]" />
                    </div>
                  </motion.button>
                  
                  <div 
                    className="flex flex-col cursor-pointer group"
                    onClick={() => {
                      playSfx('click');
                      setCurrentView('library');
                    }}
                  >
                    <h1 className="text-4xl font-black tracking-tighter text-[#2D3436] uppercase italic leading-none group-hover:text-neo-pink transition-colors">
                      {t.exitGame}
                    </h1>
                    <div className="text-neo-purple font-black uppercase text-[10px] tracking-[0.4em] mt-2 italic flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-neo-pink animate-pulse" />
                       {t.backToLibrary}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 self-center lg:self-auto">
                  {stats.nickname && (
                    <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-2xl border-[3px] border-[#2D3436] shadow-neo-sm">
                      <div className={`w-8 h-8 rounded-lg border-2 border-[#2D3436] flex items-center justify-center text-sm shrink-0 ${stats.avatarColor || 'bg-neo-blue'}`}>
                        {stats.avatar || '🧠'}
                      </div>
                      <span className="text-xs font-black text-[#2D3436] uppercase tracking-wider font-mono">
                        {stats.nickname}
                      </span>
                    </div>
                  )}
                  <div className="hidden md:block">
                    <StatsCard stats={stats} lang={lang} />
                  </div>
                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playSfx('click');
                        handleNextProblem();
                      }} 
                      title={t.newProblem}
                      className="neo-btn bg-neo-green p-4 shadow-neo-sm border-[4px] border-[#2D3436] text-[#2D3436]"
                    >
                      <RefreshCw size={24} strokeWidth={4} className={isRefreshing ? 'animate-spin' : ''} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playSfx('click');
                        setShowSettings(true);
                      }} 
                      title={t.settings}
                      className="neo-btn bg-white p-4 shadow-neo-sm border-[4px] border-[#2D3436] text-[#2D3436]"
                    >
                      <Settings size={24} strokeWidth={4} />
                    </motion.button>
                  </div>
                </div>
              </header>

              <div className="flex-1 flex flex-col xl:flex-row gap-12 px-8 lg:px-12 pb-12 relative z-10">
                {/* Fixed Control Panel */}
                <aside className="xl:w-72 space-y-12 shrink-0">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 bg-neo-purple rounded-full shadow-[0_0_15px_rgba(157,126,254,0.4)]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D3436]/40 italic leading-none mb-1">{t.gameMode}</span>
                        <span className="text-[8px] font-black text-neo-purple/40 uppercase tracking-[0.2em] font-mono whitespace-nowrap">Selector_Module_v1.0</span>
                      </div>
                    </div>
                    <nav className="flex flex-col gap-4">
                      {(['mixed', 'timed', 'survival'] as const).map((m) => (
                        <button 
                          key={m} 
                          onClick={() => changeGameMode(m)} 
                          className={`neo-btn text-[11px] px-8 py-5 font-black uppercase text-left flex items-center justify-between group transition-all relative overflow-hidden ${
                            gameMode === m ? 'bg-neo-purple text-white shadow-neo -rotate-1 translate-x-3 border-[#2D3436]' : 'bg-white hover:bg-slate-50 border-[#2D3436]/10'
                          }`}
                        >
                          <span className="relative z-10 tracking-widest italic">{t.modes[m]}</span>
                          <div className={`w-3 h-3 rounded-full border-[3px] border-current transition-all relative z-10 ${gameMode === m ? 'bg-white scale-125 shadow-[0_0_10px_white]' : 'bg-transparent opacity-20'}`} />
                          {gameMode === m && (
                            <motion.div 
                              layoutId="active-mode-bg"
                              className="absolute inset-0 bg-white/5 pointer-events-none"
                            />
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 bg-neo-pink rounded-full shadow-[0_0_15px_rgba(255,128,102,0.4)]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D3436]/40 italic leading-none mb-1">{t.difficultyLabel}</span>
                        <span className="text-[8px] font-black text-neo-pink/40 uppercase tracking-[0.2em] font-mono whitespace-nowrap">Complexity_Node_v4.2</span>
                      </div>
                    </div>
                    <nav className="flex flex-col gap-4">
                      {(['random', 'easy', 'medium', 'hard'] as const).map((d) => (
                        <button 
                          key={d} 
                          onClick={() => changeDifficulty(d)} 
                          className={`neo-btn text-[11px] px-8 py-5 font-black uppercase text-left flex items-center justify-between transition-all relative overflow-hidden ${
                            difficulty === d ? 'bg-neo-pink text-white shadow-neo rotate-1 translate-x-3 border-[#2D3436]' : 'bg-white hover:bg-slate-50 border-[#2D3436]/10'
                          }`}
                        >
                          <span className="relative z-10 tracking-widest italic">{d === 'random' ? `${t.mixed}` : d}</span>
                          <Hash size={16} strokeWidth={3} className={`relative z-10 ${difficulty === d ? 'opacity-100' : 'opacity-20'}`} />
                          {difficulty === d && (
                            <motion.div 
                              layoutId="active-diff-bg"
                              className="absolute inset-0 bg-white/5 pointer-events-none"
                            />
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {(gameMode === 'timed' || gameMode === 'survival') && (
                    <motion.div 
                      key={gameMode}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="pt-6"
                    >
                      {gameMode === 'timed' && (
                        <div className={`neo-card px-8 py-8 flex flex-col items-center gap-3 border-[6px] border-[#2D3436] transition-all relative overflow-hidden shadow-neo ${timeLeft < 10 && timeLeft > 0 ? 'bg-neo-pink text-white animate-pulse' : 'bg-white'}`}>
                          <div className="absolute top-2 left-2 opacity-5">
                            <Clock size={64} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">System_Timer</span>
                          <span className="font-black text-6xl italic leading-none tracking-tighter tabular-nums">{timeLeft}<span className="text-xl ml-1 not-italic opacity-40">S</span></span>
                        </div>
                      )}
                      
                      {gameMode === 'survival' && (
                        <div className="neo-card px-8 py-8 flex flex-col items-center gap-4 border-[6px] border-[#2D3436] bg-slate-900 text-white shadow-neo">
                           <div className="flex gap-2">
                             {[...Array(3)].map((_, i) => (
                               <motion.div 
                                 key={i}
                                 animate={{ 
                                   scale: i < lives ? [1, 1.2, 1] : 0.8,
                                   opacity: i < lives ? 1 : 0.2
                                 }}
                                 transition={i < lives ? { duration: 2, repeat: Infinity } : {}}
                               >
                                 <Heart size={32} fill={i < lives ? "#ff4757" : "transparent"} className={i < lives ? 'text-[#ff4757]' : 'text-slate-600'} />
                               </motion.div>
                             ))}
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-neo-pink">Integrity_Shield</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </aside>

                {/* Main Interaction Zone */}
                <main className="flex-1 min-w-0 relative">
                   <div className="absolute -inset-10 bg-neo-purple/5 blur-[100px] -z-10 rounded-full" />
                   
                   {/* Floating Multiplier */}
                   {stats.streak >= 3 && !isGameOver && (
                     <motion.div 
                       initial={{ scale: 0, x: 20, rotate: 10 }}
                       animate={{ scale: 1, x: 0, rotate: -5 }}
                       className="absolute -top-12 -right-8 z-30"
                     >
                        <div className="neo-card bg-neo-yellow px-6 py-3 border-[4px] border-[#2D3436] shadow-neo transform hover:rotate-3 transition-transform">
                           <div className="flex items-center gap-2">
                              <Zap size={20} fill="#2D3436" />
                              <span className="text-2xl font-black italic tracking-tighter">COMBO_x{1 + Math.floor(stats.streak / 5) * 0.5}</span>
                           </div>
                           <div className="mt-1 h-1 w-full bg-black/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(stats.streak % 5) * 20}%` }}
                                className="h-full bg-[#2D3436]"
                              />
                           </div>
                        </div>
                     </motion.div>
                   )}

                   <AnimatePresence mode="wait">
                     {isGameOver ? (
                       <motion.div 
                         key="gameover" 
                         initial={{ opacity: 0, y: 50, rotate: -2 }} 
                         animate={{ opacity: 1, y: 0, rotate: 0 }} 
                         exit={{ opacity: 0, scale: 0.9 }}
                         className="bg-white p-12 md:p-16 rounded-[64px] border-[10px] border-[#2D3436] shadow-neo text-center space-y-10 relative overflow-hidden"
                       >
                         {/* Results confetti decoration placeholder with symbols */}
                         <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none text-4xl">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <div key={i} className="absolute" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 360}deg)` }}>
                                {['+', '-', '*', '/', '=', '?', '%'][Math.floor(Math.random() * 7)]}
                              </div>
                            ))}
                         </div>

                         <div className="space-y-4 relative z-10">
                           <div className="w-28 h-28 bg-neo-yellow rounded-[40px] mx-auto flex items-center justify-center border-[6px] border-[#2D3436] shadow-neo-sm transform -rotate-3 mb-6">
                             <Trophy className="text-[#2D3436]" size={56} />
                           </div>
                           <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter italic shadow-neo-sm text-white drop-shadow-[5px_5px_0px_#2D3436]">
                             {gameMode === 'timed' ? 'TIME_OUT' : 'SHIELD_0%'}
                           </h2>
                           <div className="flex justify-center gap-2">
                             {['SYSTEM', 'FAILURE', 'DETECTED'].map((word, i) => (
                               <motion.span 
                                 key={word}
                                 animate={{ opacity: [0, 1, 0] }}
                                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                 className="text-[10px] font-black text-neo-pink uppercase tracking-[0.4em]"
                               >
                                 {word}
                               </motion.span>
                             ))}
                           </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                           <div className="neo-card p-8 bg-slate-50 border-[6px] border-[#2D3436] shadow-neo-sm relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <CheckCircle2 size={100} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D3436]/40 block mb-4 italic">Solutions</span>
                             <span className="text-5xl font-black italic tracking-tighter">{sessionStats.solved}</span>
                           </div>
                           <div className="neo-card p-8 bg-neo-purple/5 border-[6px] border-[#2D3436] shadow-neo-sm group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <Zap size={100} className="text-neo-purple" />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neo-purple/40 block mb-4 italic">EXP_Gain</span>
                             <span className="text-5xl font-black text-neo-purple italic tracking-tighter">+{sessionStats.points}</span>
                           </div>
                           <div className="neo-card p-8 bg-neo-yellow/5 border-[6px] border-[#2D3436] shadow-neo-sm group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <Star size={100} className="text-neo-yellow" />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neo-yellow/40 block mb-4 italic">Final_Level</span>
                             <span className="text-5xl font-black text-[#2D3436] italic tracking-tighter">{stats.level}</span>
                           </div>
                         </div>

                         <div className="pt-6 relative z-10">
                           <div className="flex flex-col sm:flex-row gap-4 w-full">
                             <button onClick={() => {
                                 playSfx('click');
                                 changeGameMode(gameMode);
                             }} className="flex-1 neo-btn bg-neo-green text-[#2D3436] py-6 text-2xl font-black uppercase italic shadow-neo hover:scale-[1.02] active:scale-[0.98] transition-transform">
                               RESTART_QUEST
                             </button>
                             <button onClick={() => {
                                 playSfx('click');
                                 setCurrentView('library');
                             }} className="flex-1 neo-btn bg-neo-pink text-white py-6 text-2xl font-black uppercase italic shadow-neo hover:scale-[1.02] active:scale-[0.98] transition-transform">
                               {t.exitGame}
                             </button>
                           </div>
                         </div>
                       </motion.div>
                     ) : (
                       <motion.div 
                         key={isRefreshing ? 'refreshing' : currentProblem.id}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                       >
                         {isRefreshing ? (
                           <div className="min-h-[500px] flex flex-col items-center justify-center gap-8 bg-white/50 backdrop-blur-sm rounded-[64px] border-[10px] border-[#2D3436] border-dashed">
                              <RefreshCw className="animate-spin text-neo-purple" size={80} strokeWidth={6} />
                              <div className="text-center">
                                <span className="text-xl font-black uppercase tracking-[0.5em] text-[#2D3436]/40 animate-pulse">Scanning_Data_Stream</span>
                                <div className="flex gap-2 mt-4 justify-center">
                                  {[1,2,3].map(i => <div key={i} className="w-3 h-3 bg-neo-purple rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />)}
                                </div>
                              </div>
                           </div>
                         ) : (
                           <ProblemCard 
                             problem={currentProblem} 
                             onSolve={handleSolve} lang={lang} 
                           />
                         )}
                       </motion.div>
                     )}
                   </AnimatePresence>

                   {!isGameOver && (
                     <div className="mt-12 flex justify-between items-center px-10">
                        <div className="flex items-center gap-4 text-[#2D3436]/30 text-[10px] font-black uppercase tracking-[0.5em]">
                           <span className="w-2 h-2 rounded-full bg-neo-green" />
                           Simulation_Active
                        </div>
                        <div className="flex items-center gap-2 group cursor-help relative">
                          <span className="text-[#2D3436]/30 text-[10px] font-black uppercase tracking-[0.5em]">Logic_Buffer: Stable</span>
                          <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden">
                             <motion.div 
                               animate={{ width: ["20%", "80%", "40%"] }} 
                               transition={{ duration: 5, repeat: Infinity }}
                               className="h-full bg-neo-purple" 
                             />
                          </div>
                        </div>
                     </div>
                   )}
                </main>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  </div>
);
};
