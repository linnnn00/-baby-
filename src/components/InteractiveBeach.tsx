import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles } from "lucide-react";

// Poetic words hidden inside the shells
const HIDDEN_WORDS = [
  "看见", "释怀", "心安", "温柔", "等候", "常伴", "海风", "微亮", "回声", "退潮",
  "流年", "寄托", "信赖", "珍惜", "知己", "期许", "余晖", "潮汐", "归港", "晨曦"
];

// Aesthetic shell SVG representing an elegant detailed scallop shell
const ShellIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Detailed hand-refined scallop lines */}
    <path
      d="M50 95 C 47 95, 45 80, 48 65 C 50 55, 50 55, 52 65 C 55 80, 53 95, 50 95 Z"
      opacity="0.3"
    />
    <path
      d="M50 95 C 43 94, 30 75, 28 60 C 26 50, 28 40, 31 35 C 34 30, 42 20, 50 15 C 58 20, 66 30, 69 35 C 72 40, 74 50, 72 60 C 70 75, 57 94, 50 95 Z"
    />
    {/* Scallop rib accents radiating from the base (Hinge) */}
    <path d="M50 95 L50 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
    <path d="M50 95 C 45 80, 40 60, 35 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
    <path d="M50 95 C 55 80, 60 60, 65 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
    <path d="M50 95 C 38 75, 28 55, 23 45" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
    <path d="M50 95 C 62 75, 72 55, 77 45" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
  </svg>
);

export const InteractiveBeach: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeShells, setActiveShells] = useState<{ [key: number]: boolean }>({});
  const [unlockedWords, setUnlockedWords] = useState<{ [key: number]: string }>({});
  const [beachCount, setBeachCount] = useState(80); // Responsive default count for grid

  // Adjust count based on screen sizes dynamically to prevent overflow and maintain perfect density
  useEffect(() => {
    const updateBeachCount = () => {
      if (window.innerWidth < 640) {
        setBeachCount(48); // Smaller screens
      } else if (window.innerWidth < 1024) {
        setBeachCount(80); // Medium screens
      } else {
        setBeachCount(120); // Large display grid
      }
    };
    
    updateBeachCount();
    window.addEventListener("resize", updateBeachCount);
    return () => window.removeEventListener("resize", updateBeachCount);
  }, []);

  const handleShellHover = (index: number) => {
    setHoveredIndex(index);
    // Mark as active
    setActiveShells((prev) => ({ ...prev, [index]: true }));

    // Unlocked word probability (18% chance) to spark delightful discovery
    if (!unlockedWords[index]) {
      const isLucky = Math.random() < 0.18;
      if (isLucky) {
        const word = HIDDEN_WORDS[Math.floor(Math.random() * HIDDEN_WORDS.length)];
        setUnlockedWords((prev) => ({ ...prev, [index]: word }));
      }
    }
  };

  const clearBeach = () => {
    setActiveShells({});
    setUnlockedWords({});
  };

  return (
    <div id="interactive-beach-shore" className="w-full space-y-8 py-10 border-t border-b border-border-outline/10 my-8">
      {/* Editorial Title Block */}
      <div className="flex flex-col items-center text-center space-y-3 select-none">
        <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block flex items-center gap-1.5">
          <Compass size={10} className="text-[#A38E6D]" />
          INTERACTIVE SHORE / 寻找你的情绪贝币
        </span>
        <h3 className="font-headline-custom text-xl font-medium text-text-primary flex items-center gap-2">
          拨开沙洲 ↺ 探索沉睡记忆的温度
        </h3>
        
        <div className="max-w-xl mx-auto space-y-2 mt-1">
          <p className="font-headline-custom italic text-[12.5px] text-text-variant/90 leading-relaxed max-w-lg mx-auto">
            “每一枚躺在潮汐边缘的温白贝币，都封存过一缕悄然掠过的思绪。在触碰它们的瞬间，流淌的光芒会被唤醒，那是深埋沙洲之下的隔空回响。”
          </p>
          <p className="font-mono text-[9px] tracking-wide text-[#A38E6D] leading-normal max-w-md mx-auto">
            "Each warm-white shell coin resting along the tide preserves a fleeting thought. Upon your touch, their gentle iridescence awakens — a soft resonance buried deep within the sands."
          </p>
        </div>
        <div className="w-12 h-[1px] bg-[#A38E6D]/20 mt-3" />
      </div>

      {/* Dynamic Interactive Sandbeach Grid */}
      <div className="relative max-w-4xl mx-auto w-full p-4 md:p-6 bg-[#FAF9F5]/80 border border-[#E9E5D9] rounded-sm shadow-[inset_0_2px_8px_rgba(100,90,70,0.05),0_4px_16px_rgba(120,110,90,0.05)] overflow-hidden">
        
        {/* Subtle Sand Ripple Texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#C4B296_1.5px,transparent_0)] [background-size:16px_16px]" />
        
        {/* Iridescent background glow when hovering */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(224,195,252,0.12)_0%,rgba(142,197,252,0.12)_35%,transparent_70%)] pointer-events-none transition-all duration-300 z-0"
          style={{
            // Dynamic coordinates handled in React container or fallback centered
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />

        {/* Action Panel within beach boundary */}
        <div className="flex justify-between items-center pb-3 border-b border-border-outline/10 mb-4 z-10 relative">
          <span className="font-mono text-[9px] text-[#A38E6D] uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={10} className="animate-spin-slow" />
            Active Shell Coins: {Object.keys(activeShells).length} / {beachCount}
          </span>
          <button 
            onClick={clearBeach}
            className="font-mono text-[8.5px] text-text-muted hover:text-[#A38E6D] uppercase tracking-wider transition-colors cursor-pointer border border-border-outline/30 px-2 py-0.5 rounded-sm bg-white/50"
          >
            Reset Tide / 重置沙洲
          </button>
        </div>

        {/* The Shell Array Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3.5 justify-items-center relative z-10">
          {Array.from({ length: beachCount }).map((_, idx) => {
            const isActive = activeShells[idx];
            const word = unlockedWords[idx];

            return (
              <div
                key={idx}
                onMouseEnter={() => handleShellHover(idx)}
                className="relative w-11 h-11 flex items-center justify-center cursor-pointer select-none"
              >
                {/* Floating Word under lucky shell */}
                <AnimatePresence>
                  {word && isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -24, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      className="absolute font-headline-custom text-[10.5px] text-[#8e6e4a] bg-[#fffcf9]/95 border border-[#dfdecb] px-1.5 py-0.5 rounded-full pointer-events-none select-none z-20 shadow-sm whitespace-nowrap"
                    >
                      {word}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Shell element container */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    rotateZ: isActive ? (idx % 2 === 0 ? 10 : -10) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full flex items-center justify-center transition-all duration-300"
                >
                  <ShellIcon
                    className={`w-9 h-9 transition-colors duration-500 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-br from-[#e0c3fc] via-[#fbcfe8] to-[#8ec5fc] drop-shadow-[0_2px_8px_rgba(224,195,252,0.45)] filter saturate-125"
                        : "text-[#E6E2D1] hover:text-[#D7D2BE]"
                    }`}
                  />
                </motion.div>

                {/* Subtle soft shadow representing sand pocket */}
                <div 
                  className={`absolute bottom-0 w-5 h-1 bg-[#807050]/5 rounded-full filter blur-[1px] transition-opacity duration-300 ${isActive ? 'opacity-20' : 'opacity-100'}`} 
                />
              </div>
            );
          })}
        </div>

        {/* Interactive sand footer tips matching template design */}
        <div className="mt-5 pt-3 border-t border-border-outline/5 text-center z-10 relative select-none">
          <span className="font-headline-custom text-[11px] text-text-muted italic block">
            鼠标轻掠白沙，唤醒沉淀着各色心境的幻彩小贝币。
          </span>
          <span className="font-mono text-[8.5px] text-text-muted/60 lowercase block mt-0.5">
            move your cursor over white sands to awaken sleeping memories.
          </span>
        </div>
      </div>
    </div>
  );
};
