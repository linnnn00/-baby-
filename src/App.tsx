import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Mail, 
  Send, 
  Sparkles, 
  Plus, 
  Wind, 
  Smile, 
  FileText, 
  CloudRain,
  Compass,
  Check,
  RefreshCw,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ShellItem, Reply, EchoReply } from "./types";
import { InteractiveBeach } from "./components/InteractiveBeach";
import { LuckyFortuneDraw } from "./components/LuckyFortuneDraw";
import { DoodleWall } from "./components/DoodleWall";

// Exquisite hand-crafted high-fidelity SVG shells resembling real seaside collection
function ShellArt({ type }: { type: "emotion" | "shell" | "sound" }) {
  if (type === "emotion") {
    // 1. Pink Fan Scallop (Pecten, Image 2 style) - elegant radiating ridges, warm rose & pink coral gradient
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none drop-shadow-[0_5px_8px_rgba(180,120,120,0.32)]">
        <defs>
          <linearGradient id="pinkScallopGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#faece9" />
            <stop offset="25%" stopColor="#f5cdca" />
            <stop offset="60%" stopColor="#e5989b" />
            <stop offset="90%" stopColor="#b56576" />
            <stop offset="100%" stopColor="#954c5d" />
          </linearGradient>
          <radialGradient id="pinkHingeShadow" cx="50%" cy="95%" r="40%">
            <stop offset="0%" stopColor="#7a3b4d" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7a3b4d" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Scallop hinge ears at base */}
        <path d="M 36 92 L 24 82 L 31 78 Z" fill="#e5989b" stroke="#7a3b4d" strokeWidth="0.6" />
        <path d="M 64 92 L 76 82 L 69 78 Z" fill="#e5989b" stroke="#7a3b4d" strokeWidth="0.6" />
        {/* Fan body scalloped edge */}
        <path 
          d="M 50 92 
             C 32 82, 10 65, 12 42 
             C 13 24, 32 12, 50 16 
             C 68 12, 87 24, 88 42 
             C 90 65, 68 82, 50 92 Z" 
          fill="url(#pinkScallopGrad)" 
          stroke="#6d3040" 
          strokeWidth="0.9"
        />
        {/* Soft realistic interior texture stripes / ridges radiating from bottom center */}
        <path d="M 50 92 Q 28 62 17 45" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 50 92 Q 37 60 28 36" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 50 92 Q 45 58 42 32" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 50 92 Q 55 58 58 32" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 50 92 Q 63 60 72 36" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M 50 92 Q 72 62 83 45" stroke="#7a3b4d" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
        {/* Dynamic bright highlight ribs */}
        <path d="M 50 92 Q 32 60 22 41" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 50 92 Q 50 56 50 28" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 50 92 Q 68 60 78 41" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
        {/* Subtle base shadow gradient */}
        <circle cx="50" cy="92" r="14" fill="url(#pinkHingeShadow)" />
      </svg>
    );
  } else if (type === "sound") {
    // 2. Yellow Spiral Conch (Snail/Gastropod, Image 3 style) - stunning natural spiral chambers
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none drop-shadow-[0_5px_8px_rgba(180,150,100,0.32)]">
        <defs>
          <linearGradient id="yellowConchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffdef" />
            <stop offset="35%" stopColor="#fadea0" />
            <stop offset="70%" stopColor="#e3a857" />
            <stop offset="100%" stopColor="#b8782a" />
          </linearGradient>
          <radialGradient id="spiralDeepShadow" cx="44%" cy="46%" r="35%">
            <stop offset="0%" stopColor="#5c3809" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#b8782a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Snail spiral body backing shadow border */}
        <path 
          d="M 44 46 
             C 54 26, 78 30, 80 50 
             C 82 74, 54 86, 34 78 
             C 12 70, 8 40, 24 22 
             C 40 4, 73 8, 83 30
             C 93 54, 78 90, 44 90
             C 14 90, 2 64, 8 44 Z" 
          fill="url(#yellowConchGrad)" 
          stroke="#855013" 
          strokeWidth="0.8"
        />
        {/* Overlapping organic growth spiral lines */}
        <path 
          d="M 44 46 
             C 56 22, 82 26, 81 52 
             C 80 75, 51 84, 31 74 
             C 15 66, 14 41, 26 25 
             C 40 9, 68 11, 76 29" 
          fill="none" 
          stroke="#945f1e" 
          strokeWidth="0.85"
          opacity="0.8"
        />
        {/* Inner core spiral chambers */}
        <path d="M 44 46 C 49 36, 66 36, 66 50 C 66 61, 51 66, 41 60 C 31 54, 31 44, 39 37" fill="none" stroke="#855013" strokeWidth="1.1" opacity="0.75" />
        <path d="M 44 46 C 47 41, 54 41, 54 48 C 54 53, 47 55, 43 51" fill="none" stroke="#5c3809" strokeWidth="1.4" />
        {/* Realistic pearl ridge reflections across spiral turns */}
        <path d="M 48 48 L 63 28 M 48 48 L 76 46 M 48 48 L 63 70 M 48 48 L 30 66 M 48 48 L 20 40 M 48 48 L 28 20" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" fill="none" />
        <circle cx="44" cy="46" r="14" fill="url(#spiralDeepShadow)" />
      </svg>
    );
  } else {
    // 3. Ocean Blue Concentric Bivalve (Mussel/Oyster, Image 1 style) - soft seafoam blue concentric segments
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none drop-shadow-[0_5px_8px_rgba(100,140,160,0.32)]">
        <defs>
          <linearGradient id="blueBivalveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9fa" />
            <stop offset="35%" stopColor="#add2d6" />
            <stop offset="70%" stopColor="#5f9fa6" />
            <stop offset="100%" stopColor="#306b73" />
          </linearGradient>
        </defs>
        {/* Smooth, polished ocean bivalve shell contour */}
        <path 
          d="M 16 50 
             C 16 26, 38 13, 60 16 
             C 82 19, 91 40, 82 62 
             C 73 80, 50 87, 32 81 
             C 18 75, 16 64, 16 50 Z" 
          fill="url(#blueBivalveGrad)" 
          stroke="#1e4d52" 
          strokeWidth="0.8"
        />
        {/* Soft concentric seaside growth rings mimicking details from reference Image 1 */}
        <path d="M 22 50 C 22 35, 39 24, 56 27 C 73 30, 78 45, 75 58 C 72 71, 52 75, 38 71" fill="none" stroke="#255b61" strokeWidth="0.80" opacity="0.45" />
        <path d="M 30 50 C 30 41, 43 33, 53 35 C 63 37, 67 47, 65 55 C 63 63, 49 66, 41 63" fill="none" stroke="#255b61" strokeWidth="0.75" opacity="0.35" />
        <path d="M 38 51 C 38 45, 46 41, 51 42 C 56 43, 58 48, 57 53" fill="none" stroke="#1c454a" strokeWidth="0.70" opacity="0.30" />
        {/* Distinctive marine ring highlight accents */}
        <path d="M 18 44 C 18 26, 42 16, 63 19 M 79 31 C 86 46, 83 62, 71 72" fill="none" stroke="#ffffff" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />
        <path d="M 27 47 C 27 35, 43 26, 59 30" fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
        {/* Beautiful glistening sand gloss reflection */}
        <ellipse cx="51" cy="35" rx="15" ry="3" transform="rotate(-12 51 35)" fill="#ffffff" opacity="0.3" />
      </svg>
    );
  }
}

// 3D Embossed cotton-paper envelope with a sliding handwriting lined note paper
interface PostcardFlipProps {
  lyrics: { zh: string; en: string }[];
  index: number;
}

function PostcardFlip({ lyrics, index }: PostcardFlipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Muted organic natural tones for the slide-out note papers representing the ocean flow
  const paperStyles = [
    {
      bg: "bg-[#FFFDFC]",
      lineColor: "rgba(163, 142, 109, 0.12)",
      header: "VOLUME.01 · WAVE SENTIMENT",
      stamp: "🐚",
      serifText: "text-[#7D7565]",
    },
    {
      bg: "bg-[#F7FAF8]",
      lineColor: "rgba(37, 91, 97, 0.08)",
      header: "VOLUME.02 · OCEANIC ECHO",
      stamp: "waves",
      serifText: "text-[#55696E]",
    },
    {
      bg: "bg-[#FAFBF9]",
      lineColor: "rgba(163, 142, 109, 0.10)",
      header: "VOLUME.03 · DRIFTING VOICES",
      stamp: "✨",
      serifText: "text-[#6E6A61]",
    }
  ][index % 3];

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-full max-w-[280px] h-[480px] cursor-pointer group select-none [perspective:1200px] mt-16 mb-4 flex flex-col justify-end"
    >
      {/* 3D Envelope Base back-plate with felt/cotton-paper texture styling */}
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[#FAF9F5] rounded-t-sm rounded-b-md border border-[#E9E5D9] shadow-[0_4px_16px_-4px_rgba(100,90,70,0.12)] flex flex-col justify-end overflow-visible z-0 bg-[radial-gradient(#F3F1E8_1.2px,transparent_0)] [background-size:24px_24px]">
        
        {/* ENVELOPE TOP FLAP (Geometric fold representing authentic visual envelope seals) */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[105px] bg-[#EDE9DE] rounded-t-sm border border-[#DFDACF] border-b-0 origin-top z-30 shadow-[inset_0_-1px_3px_rgba(255,255,255,0.4)]"
          style={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 30px, 80% 100%, 20% 100%, 0 30px)",
            backfaceVisibility: "hidden"
          }}
          animate={{ 
            rotateX: isOpen ? -150 : 0,
            y: isOpen ? -2 : 0,
            filter: isOpen ? "brightness(1.04)" : "brightness(1)",
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        />

        {/* SLIDE-OUT LETTER / 便签纸 (Tactile manuscript lines & beautiful cursive cues) */}
        <motion.div
          className={`absolute left-[12px] right-[12px] bottom-[15px] h-[350px] rounded-sm p-6 border border-dashed shadow-[0_12px_28px_rgba(100,90,70,0.18)] flex flex-col justify-between overflow-hidden cursor-text z-10 ${paperStyles.bg}`}
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 29px, ${paperStyles.lineColor} 29px, ${paperStyles.lineColor} 30px)`,
            backgroundAttachment: "local"
          }}
          animate={{ 
            y: isOpen ? -245 : 0,
            scale: isOpen ? 1.05 : 0.94,
            rotateZ: isOpen ? (index % 2 === 0 ? 1.2 : -1.2) : 0,
            boxShadow: isOpen 
              ? "0 28px 50px -10px rgba(80, 70, 50, 0.28)" 
              : "0 4px 10px -2px rgba(80, 70, 50, 0.1)"
          }}
          transition={{ 
            type: "spring",
            stiffness: 140,
            damping: 18
          }}
        >
          {/* Letter header */}
          <div className="flex justify-between items-start border-b border-[#EAE6DC]/60 pb-1.5 mb-2 h-7 overflow-hidden select-none">
            <span className="font-mono text-[8px] tracking-wider text-text-muted/70 uppercase">
              {paperStyles.header}
            </span>
            <span className="text-xs shrink-0 select-none opacity-85">
              {paperStyles.stamp === "waves" ? "🌊" : paperStyles.stamp}
            </span>
          </div>

          {/* Letter body lyrics lines */}
          <div className="flex-1 flex flex-col justify-center space-y-4 py-2 select-text scrollbar-none overflow-y-auto">
            {lyrics.map((lyric, idx) => (lyric.zh || lyric.en) ? (
              <div key={idx} className="space-y-1 text-center">
                {lyric.zh && (
                  <p className={`font-headline-custom text-[11.5px] md:text-[12.5px] leading-relaxed font-semibold italic ${paperStyles.serifText}`}>
                    {lyric.zh}
                  </p>
                )}
                {lyric.en && (
                  <p className="font-mono text-[9px] leading-normal font-medium tracking-wide opacity-80" style={{ color: '#A38E6D' }}>
                    {lyric.en}
                  </p>
                )}
              </div>
            ) : null)}
          </div>

          {/* Letter footer info */}
          <div className="flex justify-between items-end border-t border-[#EAE6DC]/60 pt-1.5 h-6 select-none">
            <span className="font-mono text-[7px] tracking-widest text-[#A38E6D]/60 lowercase">findingbaby.ocean</span>
            <span className="font-mono text-[8px] tracking-widest text-[#A38E6D]/80 uppercase font-bold font-mono">No.{101 + index}</span>
          </div>
        </motion.div>

        {/* FRONT POCKET WITH RELIEF SHELL EMBOSSING */}
        <div className="absolute inset-x-0 bottom-0 h-[310px] bg-[#FAF9F5] rounded-b-md border-t border-[#EAE6DC] z-20 flex flex-col items-center justify-between p-6 shadow-[0_-3px_15px_-3px_rgba(100,90,70,0.06)] bg-[radial-gradient(#F4F2E7_1px,transparent_0)] [background-size:20px_20px] select-none">
          {/* Framing borders representing traditional French dry-point wedding details */}
          <div className="absolute inset-2.5 border border-[#EBE7DA]/80 rounded-sm pointer-events-none" />

          {/* Blind Embossed Scallop Shell (3D letterpress paper texture) */}
          <div className="relative mt-4 z-10 flex justify-center items-center">
            <div className="relative p-1 filter drop-shadow-[-1.5px_-1.5px_1.5px_rgba(255,255,255,1)] drop-shadow-[1.5px_1.5px_2.5px_rgba(110,95,70,0.18)]">
              <svg 
                viewBox="0 0 100 100" 
                className="w-16 h-16 opacity-95 text-[#FAF9F5] fill-current"
              >
                <path 
                  d="M50 88 C43 88 40 82 40 76 C15 65 5 45 10 26 C13 14 30 11 50 11 C70 11 87 14 90 26 C95 45 85 65 60 76 C60 82 57 88 50 88 Z" 
                />
                <path d="M50 80 Q50 45 50 12" stroke="#E6E2D4" strokeWidth="1.8" fill="none" opacity="0.9" />
                <path d="M50 80 Q42 45 35 15" stroke="#E6E2D4" strokeWidth="1.8" fill="none" opacity="0.9" />
                <path d="M50 80 Q58 45 65 15" stroke="#E6E2D4" strokeWidth="1.8" fill="none" opacity="0.9" />
                <path d="M50 80 Q34 47 22 21" stroke="#E1DCD0" strokeWidth="1.6" fill="none" opacity="0.8" />
                <path d="M50 80 Q66 47 78 21" stroke="#E1DCD0" strokeWidth="1.6" fill="none" opacity="0.8" />
                <path d="M50 80 Q26 52 13 32" stroke="#DCD6C4" strokeWidth="1.4" fill="none" opacity="0.6" strokeDasharray="1 1" />
                <path d="M50 80 Q74 52 87 32" stroke="#DCD6C4" strokeWidth="1.4" fill="none" opacity="0.6" strokeDasharray="1 1" />
                <path d="M10 26 C20 23 35 20 50 20 C65 20 80 23 90 26" stroke="#FAF9F5" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Letterpress-like vintage branding and labels */}
          <div className="text-center space-y-1 mb-1.5 z-10 select-none pointer-events-none">
            <span className="font-mono text-[8px] tracking-[0.35em] text-[#A38E6D] font-bold block uppercase leading-none">
              PUBLIC ART WORK
            </span>
            <span className="font-headline-custom italic text-[11.5px] text-[#A38E6D]/85 block leading-tight">
              Finding Baby Project
            </span>
            <div className="w-6 h-[0.5px] bg-[#E1DCD0] mx-auto my-1.5" />
            <span className="text-[7.5px] font-mono tracking-widest text-[#A38E6D]/70 uppercase flex items-center justify-center gap-1 font-bold">
              <span>{isOpen ? "点击收回" : "点击开启信封"}</span>
              <span>{isOpen ? "↑" : "↓"}</span>
            </span>
          </div>

          <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full border border-dashed border-[#A38E6D]/20 flex items-center justify-center opacity-70">
            <span className="text-[7px] text-[#A38E6D] font-mono leading-none">C26</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<"landing" | "deposit" | "exchange" | "archives" | "postcards" | "fortune">("landing");
  
  // Data State
  const [shells, setShells] = useState<ShellItem[]>([]);
  const [myShellIds, setMyShellIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("finding_baby_my_shells");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Curated memory tides landing page rotation state (3 items per page for delicate layout)
  const [tidePage, setTidePage] = useState(0);
  
  // Audio state
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const waveNoiseNodeRef = useRef<any>(null);
  const waveGainNodeRef = useRef<any>(null);
  const synthTimerRef = useRef<any>(null);

  // Form State for Deposit
  const [depositType, setDepositType] = useState<"emotion" | "shell" | "sound">("emotion");
  const [content, setContent] = useState("");
  const [ambientSound, setAmbientSound] = useState<"sea_breeze" | "laughter" | "whisper" | "rain">("sea_breeze");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositedShell, setDepositedShell] = useState<ShellItem | null>(null);
  const [oceanEcho, setOceanEcho] = useState<EchoReply | null>(null);
  const [isGeneratingEcho, setIsGeneratingEcho] = useState(false);

  // Selected Shell in Exchange Screen
  const [selectedExchangeShell, setSelectedExchangeShell] = useState<ShellItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyIsAnonymous, setReplyIsAnonymous] = useState(true);
  const [replyAuthorName, setReplyAuthorName] = useState("");
  const [recollectionSubTab, setRecollectionSubTab] = useState<"latest" | "popular" | "doodle">("latest");

  // Time Tracker
  const [currentTime, setCurrentTime] = useState("");

  // Fetch shells
  const fetchShells = async () => {
    try {
      const res = await fetch("/api/shells");
      if (res.ok) {
        const data = await res.json();
        setShells(data);
      }
    } catch (err) {
      console.error("Error fetching shells:", err);
    }
  };

  useEffect(() => {
    fetchShells();
    
    // Set formatted UTC or current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " CST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      // Clean up synth and timers on unmount
      try {
        if (synthTimerRef.current) {
          clearTimeout(synthTimerRef.current);
        }
      } catch (e) {}
    };
  }, []);

  // Save my shell IDs in local storage
  const trackMyShell = (id: string) => {
    const updated = [...myShellIds, id];
    setMyShellIds(updated);
    localStorage.setItem("finding_baby_my_shells", JSON.stringify(updated));
  };

  // Sound Engine (Web Audio Procedural Atmospheric Synth)
  // Play extremely gentle, healing melodic chimes of seaside acoustic feel
  const playHealingPluck = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      // G Major Pentatonic: G3, A3, B3, D4, E4, G4, A4, B4
      const pentatonic = [196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88];
      const pitch1 = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      
      const playDyad = Math.random() > 0.45;
      const pitches = [pitch1];
      if (playDyad) {
        const relativeIndices = [3, 4, 7];
        const indexOffset = relativeIndices[Math.floor(Math.random() * relativeIndices.length)];
        const baseIndex = pentatonic.indexOf(pitch1);
        if (baseIndex !== -1 && baseIndex + indexOffset < pentatonic.length) {
          pitches.push(pentatonic[baseIndex + indexOffset]);
        }
      }

      pitches.forEach((pitch, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(pitch, now + i * 0.08);

        const subOsc = ctx.createOscillator();
        subOsc.type = "triangle";
        subOsc.frequency.setValueAtTime(pitch * 0.5, now + i * 0.08);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(pitch * 1.1, now);
        filter.frequency.exponentialRampToValueAtTime(70, now + 5.0);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.009, now + 0.4); // slow, soothing attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 5.5); // long acoustic decay

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) {
          panner.pan.setValueAtTime(Math.random() * 1.2 - 0.6, now);
          osc.connect(filter);
          subOsc.connect(filter);
          filter.connect(panner);
          panner.connect(gainNode);
        } else {
          osc.connect(filter);
          subOsc.connect(filter);
          filter.connect(gainNode);
        }

        gainNode.connect(ctx.destination);

        osc.start(now + i * 0.08);
        subOsc.start(now + i * 0.08);
        osc.stop(now + 6.0);
        subOsc.stop(now + 6.0);
      });
    } catch (e) {
      console.error("Error playing healing pluck:", e);
    }
  };

  const initSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // 1. Procedural Sea Waves: Noise Generator + Filter Modulated by LFO
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = "lowpass";
      waveFilter.frequency.value = 320;
      waveFilter.Q.value = 0.8;

      const waveGain = ctx.createGain();
      waveGain.gain.value = 0.018; // soft wave sound
      waveGainNodeRef.current = waveGain;

      whiteNoise.connect(waveFilter);
      waveFilter.connect(waveGain);
      waveGain.connect(ctx.destination);
      whiteNoise.start();
      waveNoiseNodeRef.current = whiteNoise;

      const lfoOsc = ctx.createOscillator();
      lfoOsc.frequency.value = 0.06; // ultra-slow seaside swell (16 seconds per swell)
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 130;
      lfoOsc.connect(lfoGain);
      lfoGain.connect(waveFilter.frequency);
      lfoOsc.start();
      oscillatorsRef.current.push(lfoOsc);

      const lfoVolumeGain = ctx.createGain();
      lfoVolumeGain.gain.value = 0.01;
      lfoOsc.connect(lfoVolumeGain);
      lfoVolumeGain.connect(waveGain.gain);

      // 2. Slow therapeutic underlay string chord (Ethereal drone)
      const droneFrequencies = [110.00, 146.83, 196.00, 293.66]; // D-sus G chord base
      droneFrequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) panner.pan.value = Math.random() * 1.6 - 0.8;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.003; // extremely soft background

        osc.connect(gainNode);
        if (panner) {
          gainNode.connect(panner);
          panner.connect(ctx.destination);
        } else {
          gainNode.connect(ctx.destination);
        }

        osc.start();
        oscillatorsRef.current.push(osc);
      });

      // 3. Periodic pluck scheduling (Slow healing melodic patterns)
      const scheduleNextPluck = () => {
        const nextInterval = 4000 + Math.random() * 4000; // Between 4.0s and 8.0s
        synthTimerRef.current = setTimeout(() => {
          if (audioContextRef.current && audioContextRef.current.state === "running") {
            playHealingPluck(audioContextRef.current);
            scheduleNextPluck();
          }
        }, nextInterval);
      };

      playHealingPluck(ctx);
      scheduleNextPluck();

      setIsSynthPlaying(true);
    } catch (err) {
      console.error("Unable to initialize synthesizer:", err);
    }
  };

  const stopSynth = () => {
    try {
      if (synthTimerRef.current) {
        clearTimeout(synthTimerRef.current);
        synthTimerRef.current = null;
      }

      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
      oscillatorsRef.current = [];
      
      if (waveNoiseNodeRef.current) {
        try { waveNoiseNodeRef.current.stop(); } catch(e){}
        waveNoiseNodeRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsSynthPlaying(false);
    } catch (err) {
      console.error("Error stopping synth:", err);
    }
  };

  const toggleSynth = () => {
    if (isSynthPlaying) {
      stopSynth();
    } else {
      initSynth();
    }
  };

  // Play a brief high-quality ripple chime when committing a ritual
  const playRippleChime = () => {
    if (!audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.50]; // Beautiful pentatonic arpeggio
      pitches.forEach((f, index) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + index * 0.12);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.02, now + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 1.0);
      });
    } catch(e) {}
  };

  // Submitting detailed emotional capsule
  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setOceanEcho(null);

    try {
      const response = await fetch("/api/shells", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: depositType,
          content: content,
          ambientSound: ambientSound
        })
      });

      if (response.ok) {
        const newShellData = await response.json();
        setDepositedShell(newShellData);
        trackMyShell(newShellData.id);
        fetchShells();
        
        // play gentle ritual confirmation audio
        playRippleChime();

        // Automatically trigger Gemini Ocean Echo computation
        setIsGeneratingEcho(true);
        const echoRes = await fetch("/api/shells/echo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: content })
        });
        
        if (echoRes.ok) {
          const echoData = await echoRes.json();
          setOceanEcho(echoData);
          
          // Inject Gemini outcome as reply
          await fetch(`/api/shells/${newShellData.id}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: echoData.replyCn,
              english: echoData.replyEn,
              author: "Ocean Echo"
            })
          });
          
          // Re-fetch updated shells to capture inserted wave response
          fetchShells();
        }
      }
    } catch (err) {
      console.error("Failed depositing emotional memory:", err);
    } finally {
      setIsSubmitting(false);
      setIsGeneratingEcho(false);
    }
  };

  // Sending reply to existing shell
  const handleSendReply = async (id: string, customContent?: string, customAuthor?: string) => {
    const textToSubmit = customContent !== undefined ? customContent : replyText;
    if (!textToSubmit.trim()) return;
    setIsSendingReply(true);

    try {
      let author = "匿名旅人";
      if (customAuthor !== undefined) {
        author = customAuthor;
      } else {
        author = replyIsAnonymous ? "匿名旅人" : (replyAuthorName.trim() || "神秘客");
      }

      const res = await fetch(`/api/shells/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: textToSubmit,
          author: author
        })
      });

      if (res.ok) {
        const updatedShell = await res.json();
        // Keep selectedExchangeShell in sync if it is the one being replied to
        if (selectedExchangeShell && selectedExchangeShell.id === id) {
          setSelectedExchangeShell(updatedShell);
          setReplyText("");
          setReplyAuthorName("");
        }
        playRippleChime();
        fetchShells();
      }
    } catch (err) {
      console.error("Error replying to shell:", err);
    } finally {
      setIsSendingReply(false);
    }
  };

  // Liking a shell / doodle memory card
  const handleLikeShell = async (id: string) => {
    try {
      const res = await fetch(`/api/shells/${id}/like`, { method: "POST" });
      if (res.ok) {
        const updatedShell = await res.json();
        setShells(prev => prev.map(s => s.id === id ? updatedShell : s));
        if (selectedExchangeShell && selectedExchangeShell.id === id) {
          setSelectedExchangeShell(updatedShell);
        }
        playRippleChime();
      }
    } catch (err) {
      console.error("Error liking shell memory:", err);
    }
  };

  const getAmbientSoundLabel = (sound?: string) => {
    switch (sound) {
      case "sea_breeze": return "Sea Breeze / 咸涩海风";
      case "laughter": return "Laughter / 原野笑声";
      case "whisper": return "Whisper / 没能说出口的低语";
      case "rain": return "Gentle Rain / 深夜雨滴";
      default: return "Ocean Tide / 海浪低语";
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary paper-texture overflow-x-hidden flex flex-col font-body-custom select-none">
      
      {/* Absolute Ambient Background Vectors from reference design layout */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dusty Rose Torn Paper Overlay element */}
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[40%] bg-accent-rose opacity-[0.16] rotate-[-6deg] rounded-[40%_60%_70%_30%] filter blur-3xl transition-all duration-1000"></div>
        {/* Seafoam Green Organic Shape */}
        <div className="absolute bottom-[8%] right-[-5%] w-[40%] h-[45%] bg-accent-seafoam opacity-[0.16] rotate-[15deg] rounded-[60%_40%_30%_70%] filter blur-2xl transition-all duration-1000"></div>
        {/* Muted Gold Abstract Accent */}
        <div className="absolute top-[65%] left-[3%] w-[20%] h-[20%] bg-accent-gold opacity-[0.12] rounded-full filter blur-3xl"></div>
        
        {/* Fine Torn Paper Edge pattern overlay to mimic real handmade sheets */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaJJh7DpZlmBZ2KCU4gxgESM88YS31wzzaM1PnXBUPf8fQudzG-94ojwaPWbWDdKCdh5Uo81kDeQEBT-784lmU8dlI6XkUCkoCelOYmphFKqSftern2zDjEDCuHilY3XZy8yiQGJqoOVGfGVYPHS3Poeg9K0kolNsr_1dWSEPoTvaKO8O24mI73AvawXpc7egabUywWpfAKMU-dlz_jyP20dpuJAbu4JoIhUZOxOxOXIyfn6C5XZPOBoOnPZWgVbKNXVu14myYVx4')", backgroundSize: '650px', filter: 'contrast(130%) brightness(110%)' }}></div>
        
        {/* Beautiful Delicate Shell Sketch in Right Upper Area */}
        <div className="absolute top-[16%] right-[8%] w-80 h-96 opacity-[0.24] mix-blend-multiply rotate-[18deg]">
          <img 
            alt="Artistic shell collage" 
            className="w-full h-full object-contain grayscale sepia opacity-80" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaJJh7DpZlmBZ2KCU4gxgESM88YS31wzzaM1PnXBUPf8fQudzG-94ojwaPWbWDdKCdh5Uo81kDeQEBT-784lmU8dlI6XkUCkoCelOYmphFKqSftern2zDjEDCuHilY3XZy8yiQGJqoOVGfGVYPHS3Poeg9K0kolNsr_1dWSEPoTvaKO8O24mI73AvawXpc7egabUywWpfAKMU-dlz_jyP20dpuJAbu4JoIhUZOxOxOXIyfn6C5XZPOBoOnPZWgVbKNXVu14myYVx4"
          />
        </div>
      </div>

      {/* Copenhagen Header displayed as a professional magazine editorial title block */}
      <header className="relative z-50 w-full px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-6 border-b-[0.5px] border-border-variant/20 bg-bg-primary/40 backdrop-blur-md select-none">
        {/* Magazine metadata on the left - Stacked: Chinese on top, English underneath */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left font-label-custom leading-tight gap-1">
          <span className="text-[12px] font-bold text-text-primary tracking-widest">第13期</span>
          <span className="text-[9px] text-[#A38E6D] tracking-[0.15em] font-medium uppercase font-mono">SUMMER '26 / 2026年夏季</span>
        </div>
        
        {/* Main interactive title centered beautifully */}
        <div 
          onClick={() => setActiveScreen("landing")}
          className="flex flex-col items-center justify-center cursor-pointer hover:opacity-85 transition-opacity space-y-1 text-center select-none"
        >
          <h1 className="font-headline-custom text-2xl md:text-3xl tracking-[0.2em] text-text-primary font-bold leading-tight">
            寻找 BABY 计划
          </h1>
          <span className="font-mono text-[10px] tracking-[0.35em] text-text-muted/80 uppercase font-bold leading-none notranslate" translate="no">
            FINDING BABY
          </span>
        </div>

        {/* Action controllers on the right */}
        <div className="flex items-center gap-4 relative z-50">
          {/* UTC/CST Clock Info with Chinese label on top, status below on single lines */}
          <div className="hidden lg:flex flex-col items-end text-right font-label-custom leading-tight gap-1">
            <span className="text-[11px] font-bold text-text-primary tracking-wide">公共艺术空间</span>
            <span className="text-[9px] text-[#A38E6D] tracking-wider font-mono flex items-center gap-1.5 opacity-80">
              <Clock size={9} className="animate-pulse" />
              {currentTime}
            </span>
          </div>
          <span className="hidden lg:inline text-text-muted opacity-35 text-xs">|</span>

          <button 
            onClick={() => setActiveScreen("archives")}
            className={`p-2.5 rounded-full border-[0.5px] flex items-center gap-2 font-body-custom text-xs tracking-wider transition-all cursor-pointer ${activeScreen === 'archives' ? 'bg-text-primary text-bg-primary border-text-primary' : 'border-border-outline/40 hover:bg-paper-secondary text-[#A38E6D] hover:text-text-primary'}`}
            title="我的贝壳信箱 / Mailbox"
          >
            <Mail size={14} className={activeScreen === 'archives' ? '' : 'text-[#A38E6D]'} />
            <span className="hidden sm:inline">我的信箱</span>
            {myShellIds.length > 0 && (
              <span className={`w-2 h-2 rounded-full ${activeScreen === 'archives' ? 'bg-accent-rose' : 'bg-[#A38E6D] animate-ping'}`} />
            )}
          </button>

          <button 
            onClick={toggleSynth} 
            className={`p-2.5 rounded-full border-[0.5px] transition-all flex items-center gap-2 cursor-pointer ${isSynthPlaying ? 'bg-accent-seafoam/35 border-border-outline/80 text-text-primary' : 'border-border-outline/30 text-text-muted hover:bg-paper-secondary'}`}
            title={isSynthPlaying ? "关闭背景潮汐音效" : "开启背景潮汐音效"}
          >
            {isSynthPlaying ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
            <span className="font-label-custom text-[10px] hidden sm:inline">
              {isSynthPlaying ? "AMBIENT ON" : "AMBIENT OFF"}
            </span>
          </button>
        </div>
      </header>

      {/* Primary Content Canvas */}
      <main className="flex-1 w-full flex flex-col justify-center items-center relative z-20 py-8 px-6 md:px-16">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: LANDING WITH COPENHAGEN HERO & EDITORIAL BRIEF */}
          {activeScreen === "landing" && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-w-7xl space-y-16 py-4 animate-fade-in"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* LEFT COLUMN: The majestic asymmetric Editorial Clam Hero (7 columns wide) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Structural Border Clad container with sharp corners and deep hairline finish */}
                  <div className="w-full border border-border-outline/10 p-1.5 bg-[#F8F7F2]/40 rounded-sm shadow-sm animate-fade-in">
                    <div className="border border-border-outline/5 overflow-hidden rounded-sm flex justify-center items-center relative aspect-[14/9]">
                      {/* Quiet and poetic semi-transparent iridescent watercolor gradient background (晕染背景 - lower opacity for subtlety) */}
                      <div className="absolute inset-0 bg-[#F6F5EF]/85 backdrop-blur-sm z-0" />
                      <div className="absolute top-[8%] left-[12%] w-[65%] h-[65%] bg-accent-rose opacity-12 rounded-full filter blur-[60px] animate-pulse z-0" style={{ animationDuration: '9s' }} />
                      <div className="absolute bottom-[10%] right-[8%] w-[55%] h-[55%] bg-accent-seafoam opacity-12 rounded-full filter blur-[50px] animate-pulse z-0" style={{ animationDuration: '7s' }} />
                      <div className="absolute top-[30%] right-[20%] w-[50%] h-[50%] bg-accent-gold opacity-10 rounded-full filter blur-[55px] animate-pulse z-0" style={{ animationDuration: '11s' }} />
                      
                      {/* Ethereal Iridescent Open Clam Shell (贝壳不变, 不覆盖任何文字, 保持完美原质感) */}
                      <img
                        src="/images/images/iridescent_shell_hero_1780394258959.png"
                        alt="Ethereal Iridescent Open Clam Shell"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover select-none opacity-100 transition-transform duration-700 hover:scale-[1.03] z-10"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Interactive Editorial Brief & Controls Box (5 columns wide) */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block">
                      EDITORIAL BRIEF / 公共艺术宣言
                    </span>
                    <h2 className="font-headline-custom text-3xl font-semibold tracking-tight text-text-primary leading-tight">
                      《寻找Baby计划》
                    </h2>
                    <h3 className="font-headline-custom text-[15px] italic text-[#A38E6D] leading-relaxed font-normal">
                      ——一场关于“交换情绪”的贝壳公共艺术实验
                    </h3>
                    <div className="w-16 h-[1.5px] bg-[#A38E6D] mt-2" />
                  </div>

                  <div className="space-y-4 font-sans font-light text-[13.5px] text-text-variant leading-relaxed text-justify tracking-wide">
                    <p>
                      <strong>“Baby”谐音“贝币”。</strong>
                    </p>
                    <p>
                      项目以中国古代贝币文化为灵感，将“贝壳”重新定义为一种：<strong>“情绪价值货币”</strong>。
                    </p>
                    <p>
                      在现代社会中，人们越来越难以表达真实情绪，也越来越缺少低压力的情绪出口。
                    </p>
                    <p>
                      因此，《寻找Baby计划》希望通过：<strong>宝贝交换、情绪提问、匿名回应、贝壳漂流</strong> 建立一个：<strong>“让情绪被看见、被回应”</strong>的公共艺术空间。
                    </p>
                  </div>
                </div>
              </div>
              
              {/* INTERACTIVE SHORE: DYNAMIC COIN HARBOR */}
              <InteractiveBeach />
              
              {/* INTERACTIVE COMPENDIUM: ARTISTIC SHELL COTTON ENVELOPES */}
              <div className="w-full space-y-8 py-8 border-t border-b border-border-outline/10 my-6">
                <div className="flex flex-col items-center text-center space-y-2 select-none">
                  <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block">
                    SHELL ENVELOPES / 浮雕绵纸工艺信封
                  </span>
                  <h3 className="font-headline-custom text-xl font-medium text-text-primary">
                    点击开启信封 ↺ 抽取心灵便签
                  </h3>
                  <p className="text-[12px] text-text-muted max-w-xl font-sans space-y-1">
                    <span className="block font-headline-custom italic text-[13px] text-text-variant/90 leading-relaxed">
                      “听见，那些被风吹散的温柔。每一封沉睡在棉纸底下的信，都是海浪退潮后留给你的温热密语。”
                    </span>
                    <span className="block font-mono text-[9px] tracking-wide text-[#A38E6D] mt-1 leading-normal">
                      "Listen to the gentle whispers scattered by the wind. Every letter sleeping beneath the paper is a warm secret left after the tide recedes."
                    </span>
                  </p>
                  <div className="w-12 h-[1px] bg-[#A38E6D]/20 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full py-4 justify-items-center max-w-5xl mx-auto">
                  {/* CARD 1 */}
                  <PostcardFlip
                    index={0}
                    lyrics={[
                      { zh: "今天想留下什么情绪?", en: "What emotion do you want to leave behind today?" },
                      { zh: "那些没有说出口的话，会不会正在等待回应。", en: "Some unspoken feelings may still be waiting for an answer." },
                      { zh: "我们把情绪写进贝壳，让问题漂流进海里。", en: "We write emotions into shells and let the questions drift into the sea." },
                      { zh: "像另一片海，正在回答你。", en: "Like another ocean, quietly replying to you." }
                    ]}
                  />

                  {/* CARD 2 */}
                  <PostcardFlip
                    index={1}
                    lyrics={[
                      { zh: "今天有什么话想放进贝壳里？", en: "What would you like to place inside a shell today?" },
                      { zh: "把它留给海浪慢慢带走。", en: "Leave it for the tide to carry away." },
                      { zh: "", en: "" },
                      { zh: "也许某一天，会有回应漂回来。", en: "Perhaps one day, a reply will drift back." }
                    ]}
                  />

                  {/* CARD 3 */}
                  <PostcardFlip
                    index={2}
                    lyrics={[
                      { zh: "如果贝壳能够收藏一种声音。", en: "If a shell could keep a sound." },
                      { zh: "你希望它记住什么？", en: "What would you want it to remember?" },
                      { zh: "海风、笑声，还是一句没来得及说出口的话。", en: "The wind, a laugh, or something left unsaid." },
                      { zh: "如果这枚贝壳会漂向远方。", en: "If this shell drifts far away." },
                      { zh: "你希望谁能够读到它？", en: "Who would you want to find it?" },
                      { zh: "一个陌生人。", en: "A stranger." }
                    ]}
                  />
                </div>
              </div>

              {/* CENTERED ACTION PANEL / 核心控制与数据展示中心 (完美居中，杜绝遮挡) */}
              <div className="w-full max-w-4xl mx-auto border-[0.5px] border-border-outline/15 bg-paper-warm/30 rounded-sm p-8 md:p-12 text-center space-y-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2.5px] bg-accent-gold/40" />
                
                {/* Dynamic counters styled styled beautifully like print text columns */}
                <div className="max-w-2xl mx-auto grid grid-cols-2 gap-8 divide-x divide-border-outline/10 border-b border-border-outline/10 pb-8">
                  <div className="text-center">
                    <span className="text-[9px] uppercase font-label-custom text-[#A38E6D] block mb-1">My Collection</span>
                    <span className="font-headline-custom italic text-3xl font-semibold text-[#A38E6D]">{myShellIds.length}</span>
                    <span className="text-[11px] font-sans text-text-muted block mt-0.5">我的自存信件总数</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] uppercase font-label-custom text-text-muted block mb-1">Globally Relayed</span>
                    <span className="font-headline-custom italic text-3xl font-semibold text-text-primary">{34800 + shells.length}</span>
                    <span className="text-[11px] font-sans text-text-muted block mt-0.5">全馆累计收录回响</span>
                  </div>
                </div>

                {/* Dynamic buttons triggers */}
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-5 justify-center items-center">
                  <button
                    onClick={() => {
                      setDepositType("shell");
                      setActiveScreen("deposit");
                    }}
                    className="w-full md:flex-1 px-6 py-4 border border-text-primary hover:border-[#A38E6D]/80 hover:bg-[#F8F7F2] active:scale-[0.98] rounded-full text-xs font-sans tracking-[0.12em] text-text-primary transition-all font-bold uppercase text-center cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5989b] scale-90" />
                    寄存我的宝贝回忆
                  </button>

                  <button
                    onClick={() => {
                      setActiveScreen("fortune");
                    }}
                    className="w-full md:flex-1 px-6 py-4 bg-gradient-to-r from-[#e5989b] via-[#b39ddb] to-[#ffd54f] text-neutral-900 border border-[#807050]/20 shadow-[0_4px_12px_rgba(180,150,110,0.15)] hover:scale-[1.01] active:scale-[0.98] rounded-full text-xs font-sans tracking-[0.12em] transition-all font-bold uppercase text-center cursor-pointer flex items-center justify-center gap-1.5 saturate-110"
                  >
                    <Sparkles size={13} className="text-neutral-900 animate-pulse animate-spin-slow" />
                    LUCKY 幸运抽签
                    <span className="text-[7.5px] bg-neutral-900 text-white px-1 py-0.2 rounded-full font-mono scale-90">BETA</span>
                  </button>

                  <button
                    onClick={() => {
                      fetchShells();
                      setActiveScreen("exchange");
                    }}
                    className="w-full md:flex-1 px-6 py-4 bg-text-primary hover:bg-[#A38E6D] text-bg-primary shadow-sm transform active:scale-[0.98] rounded-full text-xs font-sans tracking-[0.12em] transition-all font-bold uppercase text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-seafoam animate-pulse" />
                    开启情感交换
                  </button>
                </div>
              </div>

              {/* THREE MINIMALIST TINTED TRANSLUCENT COLUMN BLOCKS */}
              {/* As requested: "把三个文字的内置不要，改成半透明纯色就行" */}
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center space-y-1 select-none">
                  <span className="font-label-custom text-[11px] text-text-muted tracking-[0.3em] uppercase">
                    Select Emotional Anchor / 选择寄托媒介
                  </span>
                  <div className="w-8 h-[1px] bg-border-outline/20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y-[0.5px] border-border-variant/40 py-8">
                  {/* Rose cell */}
                  <div 
                    onClick={() => {
                      setDepositType("emotion");
                      setActiveScreen("deposit");
                    }}
                    className="h-44 border-[0.5px] border-border-variant/40 rounded-sm bg-accent-rose/15 hover:bg-accent-rose/35 active:scale-[0.99] transition-all duration-500 cursor-pointer flex flex-col justify-center items-center group relative overflow-hidden shadow-inner"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="transform group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
                      <ShellArt type="emotion" />
                      <span className="font-label-custom text-[11px] text-text-primary tracking-widest mt-2 block opacity-75 font-semibold group-hover:opacity-100">
                        情绪回忆 / EMOTION
                      </span>
                    </div>
                  </div>

                  {/* Seafoam cell */}
                  <div 
                    onClick={() => {
                      setDepositType("shell");
                      setActiveScreen("deposit");
                    }}
                    className="h-44 border-[0.5px] border-border-variant/40 rounded-sm bg-accent-seafoam/15 hover:bg-accent-seafoam/35 active:scale-[0.99] transition-all duration-500 cursor-pointer flex flex-col justify-center items-center group relative overflow-hidden shadow-inner"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="transform group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
                      <ShellArt type="shell" />
                      <span className="font-label-custom text-[11px] text-text-primary tracking-widest mt-2 block opacity-75 font-semibold group-hover:opacity-100">
                        文字贝壳 / CAPSULE
                      </span>
                    </div>
                  </div>

                  {/* Gold cell */}
                  <div 
                    onClick={() => {
                      setDepositType("sound");
                      setActiveScreen("deposit");
                    }}
                    className="h-44 border-[0.5px] border-border-variant/40 rounded-sm bg-accent-gold/15 hover:bg-accent-gold/35 active:scale-[0.99] transition-all duration-500 cursor-pointer flex flex-col justify-center items-center group relative overflow-hidden shadow-inner"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="transform group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
                      <ShellArt type="sound" />
                      <span className="font-label-custom text-[11px] text-text-primary tracking-widest mt-2 block opacity-75 font-semibold group-hover:opacity-100">
                        珍藏声音 / VALUED SOUND
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE TIDE OF RECOLLECTIONS: Beautiful responsive grid of public cards direct on the landing page bottom! */}
              <div id="recollections-shore" className="space-y-8 pt-6">
                <div className="flex flex-col items-center text-center space-y-1 select-none">
                  <span className="text-[10px] uppercase font-label-custom tracking-[0.3em] text-[#A38E6D] font-bold block">
                    THE TIDE OF RECOLLECTIONS / 馆藏回忆之潮
                  </span>
                  <div className="w-12 h-[1px] bg-[#A38E6D] mt-1" />
                </div>

                {/* Aesthetic Theme horizontal sub-tabs switcher */}
                <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-sm sm:max-w-md mx-auto border-b border-border-outline/10 pb-3">
                  <button 
                    onClick={() => {
                      setRecollectionSubTab("latest");
                      setTidePage(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider transition-all cursor-pointer ${
                      recollectionSubTab === "latest" 
                        ? "bg-[#A38E6D] text-white shadow-sm font-semibold scale-102" 
                        : "text-text-muted hover:text-text-primary hover:bg-[#F8F7F2]"
                    }`}
                  >
                    🌊 最新漂流 / LATEST WAVE
                  </button>
                  <button 
                    onClick={() => {
                      setRecollectionSubTab("popular");
                      setTidePage(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider transition-all cursor-pointer ${
                      recollectionSubTab === "popular" 
                        ? "bg-[#A38E6D] text-white shadow-sm font-semibold scale-102" 
                        : "text-text-muted hover:text-text-primary hover:bg-[#F8F7F2]"
                    }`}
                  >
                    🔥 殿堂热门 / POPULAR
                  </button>
                  <button 
                    onClick={() => {
                      setRecollectionSubTab("doodle");
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider transition-all cursor-pointer ${
                      recollectionSubTab === "doodle" 
                        ? "bg-[#A38E6D] text-white shadow-sm font-semibold scale-102" 
                        : "text-text-muted hover:text-text-primary hover:bg-[#F8F7F2]"
                    }`}
                  >
                    🎨 温暖涂鸦墙 / DOODLE
                  </button>
                </div>

                {recollectionSubTab === "doodle" ? (
                  <div className="pt-2">
                    <DoodleWall 
                      shells={shells} 
                      onLike={handleLikeShell} 
                      onReply={async (id, text, name) => {
                        await handleSendReply(id, text, name);
                      }} 
                    />
                  </div>
                ) : (
                  <>
                    {/* Animated Paginated Recollection Grid */}
                    <div className="relative min-h-[240px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={recollectionSubTab + "-" + tidePage}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                          {(() => {
                            const displayedShells = recollectionSubTab === "popular"
                              ? [...shells].sort((a, b) => (b.likes || 0) - (a.likes || 0))
                              : shells;

                            return displayedShells.length > 0 ? (
                              displayedShells.slice(tidePage * 3, (tidePage + 1) * 3).map((sh) => (
                                <div 
                                  key={sh.id}
                                  onClick={() => {
                                    setSelectedExchangeShell(sh);
                                    setActiveScreen("exchange");
                                  }}
                                  className="bg-[#FDFCFB]/85 hover:bg-[#F8F7F2] border border-border-outline/10 hover:border-[#A38E6D]/50 rounded-sm p-6 relative flex flex-col justify-between transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 group min-h-[190px]"
                                >
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-3 border-b-[0.5px] border-border-outline/10 text-xs text-text-muted">
                                      <span className="font-label-custom text-[9px] flex items-center gap-1.5 opacity-80 uppercase font-semibold">
                                        {sh.type === "sound" ? "🐚 SOUND 声频" : sh.type === "emotion" ? "🍃 EMOTION 情绪与誓言" : "✉️ SHELL 回忆"}
                                      </span>
                                      <span className="font-sans text-[10px] opacity-70">
                                        {new Date(sh.timestamp).toLocaleDateString("zh-CN")}
                                      </span>
                                    </div>

                                    <p className="font-headline-custom text-[14px] text-text-primary leading-relaxed line-clamp-4 group-hover:text-text-primary/95">
                                      "{sh.content}"
                                    </p>
                                  </div>

                                  <div className="pt-4 mt-4 border-t-[0.5px] border-border-outline/10 flex items-center justify-between text-[11px] font-sans text-text-muted opacity-80 group-hover:opacity-100">
                                    <div className="flex items-center gap-3">
                                      <span>💬 {sh.replies.length} 回响</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleLikeShell(sh.id);
                                        }}
                                        className="hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer active:scale-90 text-[11px] font-medium"
                                        title="为这段回忆点赞"
                                      >
                                        ❤️ {sh.likes || 0}
                                      </button>
                                    </div>
                                    <span className="text-[#A38E6D] hover:underline text-[11.5px] font-semibold flex items-center gap-1 select-none">聆听回忆 →</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-12 text-center text-text-muted font-sans text-xs">
                                正在加载蔚蓝记忆之海...
                              </div>
                            );
                          })()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Elegant Multiple Pages Rotating Controller Layout */}
                    {(() => {
                      const displayedShells = recollectionSubTab === "popular"
                        ? [...shells].sort((a, b) => (b.likes || 0) - (a.likes || 0))
                        : shells;

                      return displayedShells.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border-outline/5 gap-4">
                          {/* Bullet Indicators on LHS */}
                          <div className="flex items-center gap-2">
                            {Array.from({ length: Math.ceil(displayedShells.length / 3) }).map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setTidePage(idx)}
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                  tidePage === idx 
                                    ? "bg-[#A38E6D] w-5" 
                                    : "bg-border-outline/25 hover:bg-border-outline/50"
                                }`}
                                title={`第 ${idx + 1} 页`}
                              />
                            ))}
                            <span className="font-mono text-[10px] text-text-muted ml-2 font-semibold">
                              {tidePage + 1} / {Math.ceil(displayedShells.length / 3)} 页
                            </span>
                          </div>

                          {/* Pagination Buttons on RHS */}
                          <div className="flex items-center gap-3">
                            <button
                              disabled={tidePage === 0}
                              onClick={() => setTidePage(p => Math.max(0, p - 1))}
                              className="flex items-center gap-1 border border-border-outline/15 hover:border-[#A38E6D] hover:bg-[#F8F7F2] p-2 px-3 rounded-full text-[11px] text-text-primary font-sans disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-[0.98]"
                            >
                              <ChevronLeft size={12} />
                              <span>上一叠 / PREV</span>
                            </button>

                            <button
                              disabled={tidePage >= Math.ceil(displayedShells.length / 3) - 1}
                              onClick={() => setTidePage(p => Math.min(Math.ceil(displayedShells.length / 3) - 1, p + 1))}
                              className="flex items-center gap-1 border border-border-outline/15 hover:border-[#A38E6D] hover:bg-[#F8F7F2] p-2 px-3 rounded-full text-[11px] text-text-primary font-sans disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-[0.98]"
                            >
                              <span>下一叠 / NEXT</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* View All Button */}
                    <div className="text-center pt-2">
                      <button
                        onClick={() => {
                          fetchShells();
                          setActiveScreen("exchange");
                        }}
                        className="inline-flex items-center gap-2 border-[0.5px] border-border-outline/35 hover:border-text-primary hover:bg-[#F8F7F2] px-8 py-3 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 font-bold cursor-pointer"
                      >
                        <span>漫步完整的聆听之岸 / EXPLORE EXCHANGES</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

            </motion.div>
          )}

          {/* SCREEN 2: DEPOSIT MEMORY FORM */}
          {activeScreen === "deposit" && (
            <motion.div 
              key="deposit"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl px-4"
            >
              {/* Back breadcrumb */}
              <button 
                onClick={() => {
                  setDepositedShell(null);
                  setOceanEcho(null);
                  setContent("");
                  setActiveScreen("landing");
                }}
                className="flex items-center gap-2 mb-6 font-label-custom text-[11px] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>返回主页 / BACK</span>
              </button>

              <div className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm p-8 md:p-12 relative shadow-sm overflow-hidden flex flex-col">
                {/* Paper header style */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-gold/40" />

                <AnimatePresence mode="wait">
                  {!depositedShell ? (
                    <motion.form 
                      key="deposit-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleDepositSubmit}
                      className="space-y-8"
                    >
                      <div>
                        <span className="font-label-custom text-[10px] text-text-muted block tracking-[0.2em] mb-2 uppercase">
                          SEALING METHOD / 选择寄托形式
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setDepositType("emotion")}
                            className={`py-3 px-4 border-[0.5px] rounded-full text-xs font-sans tracking-wide transition-all ${depositType === 'emotion' ? 'bg-text-primary text-bg-primary border-text-primary' : 'border-border-outline/30 hover:bg-paper-secondary text-text-muted'}`}
                          >
                            <Smile size={12} className="inline mr-1.5 mb-0.5" />
                            情绪回忆
                          </button>
                          <button
                            type="button"
                            onClick={() => setDepositType("shell")}
                            className={`py-3 px-4 border-[0.5px] rounded-full text-xs font-sans tracking-wide transition-all ${depositType === 'shell' ? 'bg-text-primary text-bg-primary border-text-primary' : 'border-border-outline/30 hover:bg-paper-secondary text-text-muted'}`}
                          >
                            <FileText size={12} className="inline mr-1.5 mb-0.5" />
                            文字贝壳
                          </button>
                          <button
                            type="button"
                            onClick={() => setDepositType("sound")}
                            className={`py-3 px-4 border-[0.5px] rounded-full text-xs font-sans tracking-wide transition-all ${depositType === 'sound' ? 'bg-text-primary text-bg-primary border-text-primary' : 'border-border-outline/30 hover:bg-paper-secondary text-text-muted'}`}
                          >
                            <Wind size={12} className="inline mr-1.5 mb-0.5" />
                            珍藏声音
                          </button>
                        </div>
                      </div>

                      {/* Content Letter Field */}
                      <div className="space-y-3">
                        <label className="font-headline-custom text-lg block text-text-primary">
                          {depositType === "emotion" && "在此留下未诉的情感。"}
                          {depositType === "shell" && "放入一只贝壳，抛向海浪。"}
                          {depositType === "sound" && "将一段难忘的声音用文字记录。"}
                        </label>
                        <p className="font-sans text-xs text-text-muted opacity-80 italic">
                          "Your words will float in the infinite ocean, awaiting a stranger or the sea’s sympathetic echo."
                        </p>
                        
                        <textarea
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="写下你心底深处最真实的低语、怀念、或者释怀的话..."
                          className="w-full h-44 bg-transparent border-b-[0.5px] border-border-outline/30 focus:border-text-primary outline-none py-2 resize-none font-sans font-light text-[15px] leading-relaxed tracking-wide placeholder-text-muted/50"
                        />
                      </div>

                      {/* Sound ambient tagging */}
                      <div className="space-y-4">
                        <span className="font-label-custom text-[10px] text-text-muted block tracking-[0.2em] uppercase">
                          ENVIRONMENTAL SOUND RESONANCE / 选择伴随环境韵律
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: "sea_breeze", label: "海风 (Breeze)", icon: Wind },
                            { id: "laughter", label: "笑声 (Laugh)", icon: Smile },
                            { id: "whisper", label: "私语 (Whisper)", icon: FileText },
                            { id: "rain", label: "静雨 (Rain)", icon: CloudRain }
                          ].map((snd) => {
                            const Icon = snd.icon;
                            return (
                              <button
                                key={snd.id}
                                type="button"
                                onClick={() => setAmbientSound(snd.id as any)}
                                className={`py-2.5 px-3 border-[0.5px] rounded-full text-xs font-sans tracking-wider transition-all flex items-center justify-center gap-1.5 ${ambientSound === snd.id ? 'bg-text-primary/10 border-text-primary text-text-primary font-medium' : 'border-border-outline/20 hover:bg-paper-secondary text-text-muted'}`}
                              >
                                <Icon size={12} />
                                <span>{snd.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting || !content.trim()}
                          className="w-full sm:w-auto bg-text-primary text-bg-primary hover:bg-text-primary/95 hover:scale-[1.01] active:scale-[0.99] font-sans text-xs tracking-widest uppercase font-semibold py-3.5 px-10 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw size={13} className="animate-spin" />
                              <span>Seal Enclosing / 沉入深海中...</span>
                            </>
                          ) : (
                            <>
                              <Send size={12} />
                              <span>投进时间的大海 / CAST INTO SEA</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    // POST DEPOSIT SUCCESS & GEMINI RITUAL SHORE ECHO
                    <motion.div 
                      key="post-deposit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8 py-4 text-center"
                    >
                      <div className="w-16 h-16 bg-accent-seafoam/25 rounded-full flex items-center justify-center mx-auto mb-2 border-[0.5px] border-border-outline/20">
                        <Check size={24} className="text-text-primary" />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-headline-custom text-2xl text-text-primary">
                          已成功沉入岁月深海
                        </h3>
                        <p className="font-sans text-xs text-text-muted tracking-wider max-w-md mx-auto leading-relaxed">
                          你的贝壳已经收纳了这份回忆。伴随着 <strong>{getAmbientSoundLabel(depositedShell.ambientSound)}</strong> 的低吟，它正在随潮汐流淌。
                        </p>
                      </div>

                      {/* Gemini Echo Animation / Reveal */}
                      <div className="bg-paper-secondary border-[0.5px] border-border-variant/80 rounded-sm p-6 text-left max-w-xl mx-auto space-y-4 shadow-inner relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-[0.16]">
                          <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                        </div>
                        
                        <h4 className="font-label-custom text-[10px] text-text-muted tracking-widest uppercase flex items-center gap-1">
                          <Sparkles size={10} className="text-accent-gold" />
                          <span>Whisper of the Tide / 大海的轻抚回音</span>
                        </h4>

                        {isGeneratingEcho ? (
                          <div className="py-8 text-center space-y-3">
                            <RefreshCw size={18} className="animate-spin text-text-muted mx-auto" />
                            <p className="font-sans text-xs text-text-variant italic animate-pulse">
                              "Sea swells are wrapping your thoughts into pearls of echo..."
                            </p>
                          </div>
                        ) : oceanEcho ? (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="space-y-4"
                          >
                            <p className="font-headline-custom text-base text-text-primary leading-relaxed">
                              {oceanEcho.replyCn}
                            </p>
                            <div className="h-[0.5px] bg-border-outline/10 w-1/3" />
                            <p className="font-sans font-light italic text-[13px] text-text-muted leading-relaxed">
                              {oceanEcho.replyEn}
                            </p>
                          </motion.div>
                        ) : (
                          <p className="font-sans text-xs text-text-muted italic">
                            "The water is quiet. Your thoughts are settling in the deepest bedrock."
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4 items-center justify-center pt-4">
                        <button 
                          onClick={() => {
                            setDepositedShell(null);
                            setOceanEcho(null);
                            setContent("");
                            fetchShells();
                            setActiveScreen("exchange");
                          }}
                          className="bg-text-primary text-bg-primary hover:bg-text-primary/90 text-xs px-6 py-3.5 rounded-full font-sans tracking-wide cursor-pointer transition-all uppercase"
                        >
                          前往聆听之岸 / EXCHANGE SHORE
                        </button>
                        <button 
                          onClick={() => {
                            setDepositedShell(null);
                            setOceanEcho(null);
                            setContent("");
                          }}
                          className="border-[0.5px] border-border-outline/40 hover:bg-paper-secondary text-xs px-6 py-3.5 rounded-full font-sans tracking-wide cursor-pointer transition-all"
                        >
                          再写下一封 / ENTRUST MORE
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: EXCHANGING MEMORIES ON THE SHORE */}
          {activeScreen === "exchange" && (
            <motion.div 
              key="exchange"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl flex flex-col items-center min-h-[500px]"
            >
              {/* Back navigation */}
              <div className="w-full flex items-center justify-between mb-8">
                <button 
                  onClick={() => {
                    setSelectedExchangeShell(null);
                    setActiveScreen("landing");
                  }}
                  className="flex items-center gap-2 font-label-custom text-[11px] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>返回主页 / LEAVE SHORE</span>
                </button>
                <div className="font-headline-custom text-lg text-text-primary leading-none">
                  聆听之岸 <span className="font-sans text-xs italic text-text-muted font-light">The Whispering Wave Shore</span>
                </div>
              </div>

              {!selectedExchangeShell ? (
                // FLOATING INTERACTIVE SHORE SCENARIO
                <div className="w-full flex flex-col items-center">
                  <div className="text-center max-w-md mx-auto mb-10 space-y-2">
                    <p className="font-headline-custom text-[15px] italic text-text-muted leading-relaxed">
                      "Thousands of shells rest peacefully under the gentle light. Tread gently, pick up one, and listen to the voice within."
                    </p>
                    <p className="font-sans text-[11px] text-text-variant opacity-60 tracking-wider">
                      (点击任意缓缓漂浮的贝壳，聆听那段被封存的情感)
                    </p>
                  </div>

                  {/* Ocean visual canvas container with rotating floating nodes */}
                  <div className="w-full h-[400px] bg-paper-warm/45 border-[0.5px] border-border-variant/60 rounded-sm relative overflow-hidden flex items-center justify-center shadow-inner">
                    {/* Ocean ambient wave visual effect */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-accent-seafoam/15 to-transparent pointer-events-none" />

                    {shells.length === 0 ? (
                      <div className="text-center py-12">
                        <RefreshCw className="animate-spin text-text-muted mx-auto mb-3" size={20} />
                        <span className="font-sans text-xs text-text-muted italic">Waiting for the sea tide to wash up memories...</span>
                      </div>
                    ) : (
                      // Interactive shell nodes utilizing framer motion coordinates
                      <div className="absolute inset-0">
                        {shells.map((sh, idx) => {
                          // Dynamic Grid Layouter to gracefully support any number of shells without visual overlap
                          const total = shells.length;
                          const cols = Math.ceil(Math.sqrt(total * 1.5));
                          const rows = Math.ceil(total / cols);
                          const colIdx = idx % cols;
                          const rowIdx = Math.floor(idx / cols);

                          // Distribute nicely with safely padded margins to prevent clipping
                          const cellWidth = 80 / cols;
                          const cellHeight = 60 / rows;

                          const baseX = 10 + cellWidth * (colIdx + 0.5);
                          const baseY = 20 + cellHeight * (rowIdx + 0.5);

                          // Beautiful natural coastal waves added as deterministic, fixed pseudo-random offset
                          const hashInputX = (sh.id ? sh.id.charCodeAt(0) : 0) + idx * 81.33;
                          const hashInputY = (sh.id ? sh.id.charCodeAt(sh.id.length - 1) : 0) + idx * 43.19;
                          const hashX = Math.sin(hashInputX) * (cellWidth * 0.25);
                          const hashY = Math.cos(hashInputY) * (cellHeight * 0.25);

                          const coord = {
                            x: `${(baseX + hashX).toFixed(2)}%`,
                            y: `${(baseY + hashY).toFixed(2)}%`
                          };
                          
                          // Custom styling matching the shell type
                          const isMine = myShellIds.includes(sh.id);

                          return (
                            <motion.button
                              key={sh.id}
                              onClick={() => {
                                setSelectedExchangeShell(sh);
                                setReplyText("");
                              }}
                              style={{ left: coord.x, top: coord.y }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer"
                              whileHover={{ scale: 1.25 }}
                              animate={{
                                y: [10, -10, 10],
                                rotate: [idx % 2 === 0 ? -10 : 8, idx % 2 === 0 ? 12 : -10, idx % 2 === 0 ? -10 : 8],
                                transition: {
                                  duration: 6 + (idx % 4) * 2.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            >
                              <div className="relative">
                                {/* Floating halo ripple rings */}
                                <div className="absolute inset-0 bg-text-primary/10 rounded-full scale-125 animate-ping" style={{ animationDuration: "5s" }} />
                                
                                <div className="w-20 h-20 flex items-center justify-center p-1 transition-all duration-300">
                                  <ShellArt type={sh.type} />
                                </div>

                                <div className="absolute top-[110%] left-1/2 -translate-x-1/2 bg-bg-primary/95 border-[0.5px] border-border-outline/25 px-2.5 py-1.5 rounded-full text-[9px] tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-label-custom shadow-md text-text-primary backdrop-blur-md">
                                  {isMine ? "我的回忆" : "拾起贝壳"}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // SPECIFIC DETAILED CO-ECHO (READ AND WRITE REPLIES ON A SHELL)
                <motion.div 
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                >
                  {/* Left Column: Core letter */}
                  <div className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm p-8 space-y-6 relative flex flex-col shadow-sm">
                    {/* Fine paper decorative header */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-seafoam/40" />

                    <div className="flex items-center justify-between pb-4 border-b-[0.5px] border-border-outline/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <ShellArt type={selectedExchangeShell.type} />
                        </div>
                        <span className="font-label-custom text-[11px] tracking-wider text-text-muted">
                          {getAmbientSoundLabel(selectedExchangeShell.ambientSound)}
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-text-muted opacity-60">
                        {new Date(selectedExchangeShell.timestamp).toLocaleDateString("zh-CN")}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <p className="font-headline-custom text-lg lg:text-xl text-text-primary leading-relaxed whitespace-pre-line">
                        {selectedExchangeShell.content}
                      </p>

                      {selectedExchangeShell.english && (
                        <p className="font-sans font-light italic text-[14px] text-text-muted leading-relaxed border-t-[0.5px] border-border-outline/10 pt-4">
                          {selectedExchangeShell.english}
                        </p>
                      )}
                    </div>

                    {/* Acoustic atmosphere cue triggers sound instruction */}
                    <div className="bg-paper-secondary/40 border-[0.5px] border-border-outline/15 rounded-sm p-3.5 flex items-center justify-between text-xs text-text-muted font-body-custom mt-4">
                      <span>附带海域伴音: {selectedExchangeShell.ambientSound === 'sea_breeze' ? '🌊 太平洋海风' : selectedExchangeShell.ambientSound === 'laughter' ? '🍂 寂静风铃声' : selectedExchangeShell.ambientSound === 'rain' ? '🌧️ 阁楼窗外雨' : '📖 潮起潮落低语'}</span>
                      <button 
                        onClick={() => {
                          if (!isSynthPlaying) toggleSynth();
                        }}
                        className="text-text-primary underline cursor-pointer text-[10px] tracking-wider flex items-center gap-1 hover:opacity-75"
                      >
                        <Volume2 size={11} /> <span>开启伴听</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handleLikeShell(selectedExchangeShell.id)}
                        className="flex-1 select-none border border-red-200 bg-red-50/20 hover:bg-red-50/40 text-red-500 hover:text-red-600 font-sans text-xs flex items-center justify-center gap-2 py-3 px-6 rounded-full transition-all active:scale-95 cursor-pointer font-bold"
                      >
                        ❤️ {!selectedExchangeShell.likes ? "给它点赞" : `点赞 (${selectedExchangeShell.likes})`}
                      </button>
                      <button
                        onClick={() => setSelectedExchangeShell(null)}
                        className="flex-1 border-[0.5px] border-border-outline/30 hover:bg-paper-secondary py-3 px-6 rounded-full text-xs font-sans text-center transition-all tracking-wider font-semibold"
                      >
                        放回大海 / THROW BACK TO SEA
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Converse Replies chain list & Reply entry Form */}
                  <div className="space-y-6">
                    <div className="bg-bg-primary border-[0.5px] border-border-variant/60 rounded-sm p-6 space-y-4 max-h-[300px] overflow-y-auto shadow-sm">
                      <h4 className="font-label-custom text-[10px] text-text-muted border-b-[0.5px] border-border-outline/15 pb-2 uppercase tracking-[0.25em] flex items-center justify-between">
                        <span>PREVIOUS ECHOES / 往期回响</span>
                        <span>({selectedExchangeShell.replies.length})</span>
                      </h4>

                      {selectedExchangeShell.replies.length === 0 ? (
                        <div className="text-center py-10">
                          <p className="font-sans font-light text-xs text-text-muted italic">
                            "This shell remains perfectly silent. No echoes yet."
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedExchangeShell.replies.map((rp, ri) => (
                            <div key={rp.id || ri} className="p-4 rounded border-[0.5px] border-border-outline/10 bg-paper-warm/30 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-label-custom text-[9px] text-accent-gold flex items-center gap-1 font-semibold uppercase">
                                  {rp.author === "Ocean Echo" ? (
                                    <>
                                      <Sparkles size={10} className="text-accent-gold" />
                                      <span>OCEAN ECHO / 大海的回音</span>
                                    </>
                                  ) : (
                                    <span>🖋️ {rp.author || "STRANGER / 路过的心灵"}</span>
                                  )}
                                </span>
                                <span className="font-sans text-[9px] text-[#A38E6D]/80">
                                  {new Date(rp.timestamp).toLocaleDateString("zh-CN")}
                                </span>
                              </div>
                              <p className="font-sans font-light text-[13px] text-text-primary leading-relaxed whitespace-pre-line">
                                {rp.content}
                              </p>
                              {rp.english && (
                                <p className="font-sans font-light italic text-[11px] text-text-muted">
                                  {rp.english}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit reply section */}
                    <div className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm p-6 space-y-4 shadow-sm">
                      <span className="font-label-custom text-[10px] text-text-muted block tracking-[0.2em] uppercase">
                        COMPOSE YOUR ECHO / 写入你的心灵回响
                      </span>

                      <div className="space-y-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="每一段真诚写下的话，都会在潮水起落时抚慰另一个孤独的树叶..."
                          className="w-full h-24 bg-transparent border-b-[0.5px] border-border-outline/30 focus:border-text-primary outline-none py-2 resize-none font-sans font-light text-xs leading-relaxed placeholder-text-muted/60"
                        />
                      </div>

                      {/* Custom authorship inputs */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1 text-xs">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-text-primary text-[11px] font-semibold cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={replyIsAnonymous}
                              onChange={(e) => setReplyIsAnonymous(e.target.checked)}
                              className="rounded-xs focus:ring-[#A38E6D] border-[#A38E6D]/30 text-[#A38E6D]"
                            />
                            <span>匿名发表 / Anonymous</span>
                          </label>

                          {!replyIsAnonymous && (
                            <motion.input
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 145, opacity: 1 }}
                              type="text"
                              placeholder="自定义笔名（署名）"
                              required
                              value={replyAuthorName}
                              onChange={(e) => setReplyAuthorName(e.target.value)}
                              className="border-b border-border-outline/30 bg-transparent text-[11px] py-0.5 px-2 focus:outline-none focus:border-text-primary text-text-primary font-sans w-36"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          disabled={isSendingReply || !replyText.trim()}
                          onClick={() => handleSendReply(selectedExchangeShell.id)}
                          className="bg-text-primary text-bg-primary hover:bg-text-primary/95 text-xs py-3 px-8 rounded-full font-sans tracking-widest uppercase font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                        >
                          {isSendingReply ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Send size={11} />
                          )}
                          <span>发送回响 / SEND CONVERSE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* SCREEN 4: MY INBOX LOCKER / ARCHIVES */}
          {activeScreen === "archives" && (
            <motion.div 
              key="archives"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              {/* Back navigation */}
              <div className="w-full flex items-center justify-between mb-8">
                <button 
                  onClick={() => setActiveScreen("landing")}
                  className="flex items-center gap-2 font-label-custom text-[11px] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>返回主页 / BACK</span>
                </button>
                <div className="font-headline-custom text-lg text-text-primary leading-none">
                  我的贝壳信箱 <span className="font-sans text-xs italic text-text-muted font-light">My Memory Locker</span>
                </div>
              </div>

              <div className="w-full space-y-6">
                <div className="text-center max-w-md mx-auto mb-8 space-y-2">
                  <p className="font-headline-custom text-[15px] italic text-text-muted leading-relaxed">
                    "Here are the emotional capsules you planted in this coastline. The ocean holds details of both our fears and our dreams safely."
                  </p>
                </div>

                {shells.filter(s => myShellIds.includes(s.id)).length === 0 ? (
                  <div className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm p-12 text-center shadow-inner space-y-4">
                    <Mail size={32} className="text-text-muted mx-auto opacity-40" />
                    <div className="space-y-1">
                      <p className="font-headline-custom text-lg text-text-primary">
                        这里还是一片空白。
                      </p>
                      <p className="font-sans text-xs text-text-muted">
                        你尚未往深海扔入过任何情绪。去首页留下一些未诉之语吧。
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setDepositType("emotion");
                        setActiveScreen("deposit");
                      }}
                      className="inline-block mt-2 bg-text-primary text-bg-primary text-xs px-6 py-2.5 rounded-full font-sans tracking-wide cursor-pointer hover:bg-text-primary/95 transition-all"
                    >
                      前去投递 / DEPOSIT NOW
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shells.filter(s => myShellIds.includes(s.id)).map((sh) => (
                      <div 
                        key={sh.id}
                        className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm p-6 relative flex flex-col justify-between shadow-sm hover:border-text-primary/40 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b-[0.5px] border-border-outline/10 text-xs">
                            <span className="font-label-custom text-[9px] text-text-muted flex items-center gap-1 tracking-widest opacity-60">
                              {sh.type === "sound" ? "🐚 SOUND" : sh.type === "emotion" ? "🍃 EMOTION" : "✉️ SHELL"}
                            </span>
                            <span className="font-sans text-[10px] text-text-muted opacity-50">
                              {new Date(sh.timestamp).toLocaleDateString("zh-CN")}
                            </span>
                          </div>

                          <p className="font-headline-custom text-[15px] text-text-primary leading-relaxed line-clamp-3">
                            "{sh.content}"
                          </p>

                          {/* List some quick counts */}
                          <div className="flex gap-4 text-[11px] font-sans text-text-muted pt-2 opacity-80">
                            <span className="flex items-center gap-1">
                              💬 {sh.replies.filter(r => r.author !== 'Ocean Echo').length} 位陌生人的回响
                            </span>
                            {sh.replies.some(r => r.author === 'Ocean Echo') && (
                              <span className="flex items-center gap-1 font-semibold text-accent-gold">
                                🌊 大海的回音已送达
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t-[0.5px] border-border-outline/10 flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedExchangeShell(sh);
                              setActiveScreen("exchange");
                            }}
                            className="text-text-primary hover:opacity-75 text-xs font-sans underline cursor-pointer flex items-center gap-1"
                          >
                            打开并阅读详情 / READ CAPSULE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: LUCKY BOX BLIND BOX FOR EXQUISITE CHARMS */}
          {activeScreen === "fortune" && (
            <motion.div
              key="lucky_fortune"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <LuckyFortuneDraw onBack={() => setActiveScreen("landing")} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Elegant Standard Landing Footer Component */}
      <footer className="w-full relative z-30 pb-12 pt-6 mt-auto flex flex-col items-center gap-4 bg-bg-primary/90 backdrop-blur-sm">
        <div className="font-label-custom text-[10px] uppercase tracking-[0.25em] text-text-muted">
          © FINDING BABY PROJECT
        </div>
      </footer>
    </div>
  );
}
