import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Sparkles, CreditCard, RotateCw, Ticket, Check, HelpCircle, MapPin, Star, Waves } from "lucide-react";

interface LuckyFortuneDrawProps {
  onBack: () => void;
}

type CharmType = "pink_love" | "purple_growth" | "blue_career" | "yellow_academic";

interface FortuneQuote {
  zh: string;
  en: string;
  detail: string;
}

const FORTUNES: Record<CharmType, FortuneQuote[]> = {
  pink_love: [
    {
      zh: "潮汐漫过沙滩，而有人正在偷偷写下你的名字。",
      en: "The tide washes over the sand, while someone is quietly writing your name.",
      detail: "爱是潮汐，即便退去，依然留下了整片海洋的温热。最近你可能会收到一份意外的情感共鸣，或是与旧友的心灵重逢。保持坦诚，爱意正随风寄宿在你的贝壳里。"
    },
    {
      zh: "两枚同频的贝壳，终会在惊涛骇浪后紧紧相拥。",
      en: "Two shells of the same resonance will eventually embrace after the wild waves.",
      detail: "不要急于寻求答案，生命中的温柔从不缺席，它只是在挑选一个海风最舒服的午后，与你不期而遇。你所坚守的长情，正被岁月的潮汐温柔守护。"
    },
    {
      zh: "你在凝望海洋，而温热的日光正洒满你的肩膀。",
      en: "You look at the sea, while warm sunlight fills your shoulders.",
      detail: "真正的浪漫是接纳自己所有的情绪。去爱一个能接住你所有温热与脆弱的人，就像大海接纳每一粒流浪的水滴。"
    },
    {
      zh: "愿有人能听懂你心底每一个细软的颤音，就像礁石懂得海浪。",
      en: "May someone understand every soft whisper in your heart, just as reefs understand waves.",
      detail: "心灵的琴弦总是在静谧处发生共振。不要害怕表达真实的自己，那些温软细腻的角落，终能等来微风般的倾听与体贴。"
    },
    {
      zh: "深海里每一座孤独的火山，都在为遥远的极光低吟着温柔的情歌。",
      en: "Every lonely volcano in the deep sea hums a gentle love song for the distant aurora.",
      detail: "孤独并非孤立，而是爱意在寂静中的蓄力。你所热切期盼的那抹色彩，已经收到了你的声波波动，正跨越洋流奔你而来。"
    },
    {
      zh: "世间最美的潮汐，不是波澜壮阔，而是你刚好回头，我也在等候。",
      en: "The best tide is not how grand it is, but that you look back, and I am waiting.",
      detail: "最好的缘分往往来得不迟不早，安安静静。试着向外踏出温柔的一步，海风中早已写好了属于你的温暖应答。"
    }
  ],
  purple_growth: [
    {
      zh: "蜕壳的过程常常伴随着未知的阵痛，但这正是你新生的坚硬铠甲。",
      en: "Shedding shells often comes with growing pains, but it is your new armor.",
      detail: "不要抗拒那些让你感到迷茫的时刻。每一次感到‘拥挤’和‘破裂’，都是你的灵魂在向更广阔的生命维度扩张。你正在以极美的姿态成长。"
    },
    {
      zh: "像深海的珍珠，在无人知晓的暗处，静静打磨最耀眼的光彩。",
      en: "Like a pearl in the deep sea, polishing its brilliance in the quiet dark.",
      detail: "沉淀的力量往往是无声的。外界的嘈杂无法定义你，你只需在自己的时区里笃定生长，海水会为你送来最丰饶的养护。"
    },
    {
      zh: "即便被海浪冲刷千百次，你依旧保留着最初的莹润纹理。",
      en: "Though washed a thousand times by waves, you retain your original smooth texture.",
      detail: "成长不是变得冷漠，而是学会在岁月的洗礼中，依旧保留着最初的那份温热与良善。原谅过去的我，去拥抱全新绽放的生命。"
    },
    {
      zh: "成长是一场悄无声息的退潮，留下的贝币上，都刻着你独自战胜风暴的勋章。",
      en: "Growth is a silent low tide; the shells left reflect your triumph over storms.",
      detail: "坚韧源于阅历，温柔源于慈悲。每一次咬牙坚持，都是在你的时间沙滩上种下一颗永恒的晶莹，成就往后不可摧毁的自信。"
    },
    {
      zh: "不必急着长成通透的璞玉，在粗糙的砂砾里，接受不完美的本色也是一种优雅。",
      en: "No rush to be flawless jade; embracing raw edges is also a supreme elegance.",
      detail: "自我和解是成长最大的红利。你的裂纹不是瑕疵，而是光透进来的地方。试着宠溺那个有些笨拙却从未放弃的自己吧。"
    },
    {
      zh: "纵使坠入最冰冷寂静的深渊，群星依然在幽暗的水面下为你闪耀。",
      en: "Even in the coldest deep, stars still shimmer for you beneath the dark waters.",
      detail: "哪怕环境再昏暗，你身上被洗练过的光彩都无法被掩盖。黑暗只是更衬托出你内生光华的耀眼。相信直觉，大胆向前游。"
    }
  ],
  blue_career: [
    {
      zh: "风向已经悄然改变，高高扬起你的风帆，洋流正带你前往属于你的大陆。",
      en: "The wind is changing; raise your sails, the current guides you to your own land.",
      detail: "职业或事业的迷茫即将散去。一股积极并且强力的‘风暴’正在积蓄力量。不要害怕改变，你此前积累的所有‘情绪资本’，都将转化为向前的巨大推力。"
    },
    {
      zh: "每一块被磨平棱角的礁石，都曾见证过整座海洋的辽阔奋斗。",
      en: "Every smooth reef has witnessed the majestic struggle of the entire ocean.",
      detail: "磨砺并非折损，而是为了能容纳更高的波涛。你的坚持正在被看见，很快你会找到一条更能发挥你才华的自由水道。属于你的繁茂期即将来临。"
    },
    {
      zh: "汇聚细微的故事，你正在筑起属于自己的坚实群岛。",
      en: "Gathering small fragments, you are building your own solid archipelago.",
      detail: "不要轻视每个微小的执行。它们正在悄悄铺垫，织成一张在深海里捕捉机遇的金色巨网。你所追求的成果正向你游来。"
    },
    {
      zh: "不要在静水浅滩处搁浅，属于你的征途，是一场跨越万里的深蓝探险。",
      en: "Do not idle in shallow waters; your journey is a wide blue ocean quest.",
      detail: "你拥有更广阔的格局，不必被眼前的鸡毛蒜皮困住羽翼。勇敢跃入更深的海域，去接受更有分量的挑战，那才是你能尽情挥洒天赋的舞台。"
    },
    {
      zh: "每一朵曾被吹散的浪花，都在积攒着颠覆整个海平面的巨浪之力。",
      en: "Every wave once scattered is assembling force to redesign the entire horizon.",
      detail: "低头蓄力，是为了更高地跃起。外界的质疑和暂时的停滞都只是海浪积蓄势能的必经步骤。下一次你惊艳亮相时，世界都将为你让路。"
    },
    {
      zh: "黄金罗盘上的指涉，只会对那些笃定信念的孤勇航海者低述方向。",
      en: "The golden compass only whispers directions to those of absolute conviction.",
      detail: "当你下定决心不回头时，所有人都会默默退开为你让路。顺从内心的强烈热爱和专业直觉，你的选择就是最正确的地标。"
    }
  ],
  yellow_academic: [
    {
      zh: "用最谦逊的姿态汲取海流，在喧嚣的世界上练就最专注的锋芒。",
      en: "Absorb currents with mock modesty, sharpening your focus in a noisy world.",
      detail: "学海无涯，而你是一只乐此不疲的寻宝贝壳。近期的学术或学业探索会有豁然开朗的领悟。抛弃杂念，你的直觉与努力正走在最聪慧的路径上。"
    },
    {
      zh: "字句是你的阶梯，带你游向更剔透、更自由的广阔水域。",
      en: "Words are your steps, carrying you into crystal-clear and free waters.",
      detail: "所有的枯燥与重复，都是知识在脑海中结晶的过程。那些深夜亮起的灯，都是照亮你未来的耀眼极光。相信自己的耐力，金榜指日可待。"
    },
    {
      zh: "保持孩童般寻找‘Baby贝壳’的心奇，真理在海滩浅浅的闪光处等候你。",
      en: "Keep a child's wonder for shore treasures; truth awaits in the sunset gleam.",
      detail: "最好的学习状态是热烈、纯粹且专注。不要给自己预设压力，带着松弛而好奇的情绪去探索。下一本心仪的书或下一个难关，都将迎刃而解。"
    },
    {
      zh: "静水流深，那些不为人知的漫长钻研，终将在阳光照进深海时折射出最绚烂的虹色。",
      en: "Deep waters flow quietly; your long study will refract full sunset hues soon.",
      detail: "默默无闻的积累是世界上最值得敬佩的力量。你正在攻克的难题已现曙光，所有的钻研终会带来让你倍感踏实的丰厚成就。"
    },
    {
      zh: "知识是一座漂浮的双塔船，载着你安然划过愚昧与焦灼的黑水湾。",
      en: "Knowledge is a steady vessel, carrying you safely past harbors of anxiety.",
      detail: "读书与专研能让灵魂安定。当你沉浸逻辑与公式之间，躁动的周遭自会安静下来。你正在构建一套属于自己的严密认知神殿。"
    },
    {
      zh: "当你写下最后一个墨痕，遥远沙滩上的金色贝壳也会发出清脆的共鸣。",
      en: "As you write the final drop, golden shells on golden shores hum in resonance.",
      detail: "完美的收官就在眼前，只要持之以恒做好最后一步。思维在今明两日最富弹性、最高效，不妨一气呵成直捣黄龙！"
    }
  ]
};

const CHARM_METADATA: Record<CharmType, { name: string; tag: string; description: string; color: string; bgClass: string; borderClass: string; stopColor1: string; stopColor2: string; ribbonColor: string }> = {
  pink_love: {
    name: "粉色爱情 · 纯粹温热",
    tag: "爱情 / Emotion",
    description: "愿你被世界温柔接住，找到那个能听懂你所有轻声低语的同频回音。",
    color: "#e5989b",
    bgClass: "from-[#FFF5F5] to-[#FFE3E8]",
    borderClass: "border-[#FAD2D8]",
    stopColor1: "#faece9",
    stopColor2: "#e5989b",
    ribbonColor: "#e5989b",
  },
  purple_growth: {
    name: "紫色成长 · 破茧自洽",
    tag: "成长 / Growth",
    description: "不惧未知的蜕壳痛楚。在岁月的打磨里，静静长出惊艳海洋的莹润珍珠。",
    color: "#b39ddb",
    bgClass: "from-[#F7F4FC] to-[#EDE5F9]",
    borderClass: "border-[#E1D3F5]",
    stopColor1: "#faeffa",
    stopColor2: "#b39ddb",
    ribbonColor: "#b39ddb",
  },
  blue_career: {
    name: "蓝色事业 · 乘风破浪",
    tag: "事业 / Career",
    description: "乘着逆风亦可高攀扬帆，在命运的风暴中开辟属于自己的繁茂航道。",
    color: "#80deea",
    bgClass: "from-[#F2F9FA] to-[#E0F2F1]",
    borderClass: "border-[#B2DFDB]",
    stopColor1: "#f2fafe",
    stopColor2: "#4dd0e1",
    ribbonColor: "#00acc1",
  },
  yellow_academic: {
    name: "黄色学业 · 笃行磨砺",
    tag: "学业 / Studies",
    description: "于沉淀的极深海底笃志潜修，砺出最灼人夺目、澄澈自由的灵感锋芒。",
    color: "#ffe082",
    bgClass: "from-[#FFFDF3] to-[#FFF8E1]",
    borderClass: "border-[#FFE082]",
    stopColor1: "#fffefa",
    stopColor2: "#ffd54f",
    ribbonColor: "#ffb300",
  }
};

export const LuckyFortuneDraw: React.FC<LuckyFortuneDrawProps> = ({ onBack }) => {
  const [selectedCharm, setSelectedCharm] = useState<CharmType>("pink_love");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawStep, setDrawStep] = useState<"idle" | "listening" | "vortex">("idle");
  const [drawnResult, setDrawnResult] = useState<{
    type: CharmType;
    quote: FortuneQuote;
    ticketId: string;
  } | null>(null);

  // Exquisite trace pool to guarantee every consecutive draw produces a different sentence
  const [drawnHistory, setDrawnHistory] = useState<Record<CharmType, string[]>>({
    pink_love: [],
    purple_growth: [],
    blue_career: [],
    yellow_academic: [],
  });

  // Toggle terms / instruction modal
  const [showFaq, setShowFaq] = useState(false);

  // Generate random ticket details on drawing, filtering out previously drawn sentences
  const handleDraw = (isPaid: boolean) => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawStep("listening");

    // Phase 1: 正在倾听潮汐声频 (Listening to tide resonance)
    setTimeout(() => {
      setDrawStep("vortex");

      // Phase 2: 星光漩涡 converge stardust simulation
      setTimeout(() => {
        const category = selectedCharm;
        const pool = FORTUNES[category];
        
        // Filter out quotes that have already been drawn in the current cycle
        let availableQuotes = pool.filter(q => !drawnHistory[category].includes(q.zh));
        
        // If all quotes in this pool have been drawn, reset the list and try to avoid the absolute last one
        if (availableQuotes.length === 0) {
          availableQuotes = pool;
          const lastDrawnText = drawnHistory[category][drawnHistory[category].length - 1];
          if (pool.length > 1 && lastDrawnText) {
            availableQuotes = pool.filter(q => q.zh !== lastDrawnText);
          }
        }

        // Pick a random quote from available ones
        const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        
        // Update drawn state history sequentially
        setDrawnHistory(prev => {
          const categoryHistory = prev[category];
          const isReset = !categoryHistory.includes(randomQuote.zh) && pool.filter(q => !categoryHistory.includes(q.zh)).length <= 1;
          return {
            ...prev,
            [category]: isReset ? [randomQuote.zh] : [...categoryHistory, randomQuote.zh]
          };
        });

        const ticketId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;

        setDrawnResult({
          type: category,
          quote: randomQuote,
          ticketId: ticketId
        });
        setIsDrawing(false);
        setDrawStep("idle");
        setHasDrawn(true);
      }, 3500); // 3.5s exquisite starry vortex and crystal condensing simulation
    }, 2500); // 2.5s deep listening connection
  };

  const handleReset = () => {
    setHasDrawn(false);
    setDrawnResult(null);
    setDrawStep("idle");
  };

  // High Fidelity vector rendering for the 4 gorgeous physical layout shells
  const renderCharmVisual = (type: CharmType, animating: boolean) => {
    const meta = CHARM_METADATA[type];
    
    // Top hanging ribbon suspension cords (meticulously responsive and organic)
    const cordVariants = {
      animate: {
        rotate: animating ? [-2, 2, -2] : [-0.5, 0.5, -0.5],
        transition: {
          repeat: Infinity,
          duration: animating ? 1.5 : 4,
          ease: "easeInOut"
        }
      }
    };

    return (
      <motion.div 
        variants={cordVariants}
        animate="animate"
        className="relative flex flex-col items-center select-none origin-top"
        style={{ height: "420px" }}
      >
        {/* Top Braided Ring (Red Cord Style, high physical layout) */}
        <div className="w-10 h-28 border-2 border-dashed rounded-full relative flex justify-center" style={{ borderColor: meta.ribbonColor, opacity: 0.85 }}>
          <div className="absolute top-0 w-2 h-2 rounded-full" style={{ backgroundColor: meta.ribbonColor }} />
          {/* Braided texture details */}
          <div className="w-[1px] h-full border-r border-dotted" style={{ borderColor: meta.ribbonColor }} />
        </div>

        {/* Traditional Chinese Knotted Pendant Head */}
        <div className="w-8 h-4 -mt-1 relative flex flex-col justify-center items-center z-10">
          <div className="w-5 h-2 rounded-sm" style={{ backgroundColor: meta.color }} />
          <div className="w-6 h-1.5 -mt-0.5 rounded-full" style={{ backgroundColor: meta.ribbonColor }} />
        </div>

        {/* SHELL 1: The Main Giant Top Shell */}
        <div className="relative z-20 transform -mt-1.5">
          {type === "pink_love" && (
            <svg viewBox="0 0 100 100" className="w-28 h-28 filter drop-shadow-[0_8px_16px_rgba(229,152,155,0.4)]">
              <defs>
                <linearGradient id="pinkCharmGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#fff6f6" />
                  <stop offset="40%" stopColor="#f5cdca" />
                  <stop offset="100%" stopColor="#e5989b" />
                </linearGradient>
              </defs>
              {/* Intricate Heart-shaped clamshell */}
              <path 
                d="M50,90 C30,75 10,60 12,38 C14,20 30,12 50,28 C70,12 86,20 88,38 C90,60 70,75 50,90 Z" 
                fill="url(#pinkCharmGrad)" 
                stroke="#b56576" 
                strokeWidth="1.2"
              />
              {/* Radiating fine bivalve relief stripes */}
              <path d="M50,90 Q38,62 30,35" stroke="#b56576" strokeWidth="0.8" fill="none" opacity="0.4" />
              <path d="M50,90 Q44,58 42,28" stroke="#b56576" strokeWidth="0.8" fill="none" opacity="0.4" />
              <path d="M50,90 Q56,58 58,28" stroke="#b56576" strokeWidth="0.8" fill="none" opacity="0.4" />
              <path d="M50,90 Q62,62 70,35" stroke="#b56576" strokeWidth="0.8" fill="none" opacity="0.4" />
              {/* Center pearl ring */}
              <circle cx="50" cy="45" r="5" fill="#ffffff" stroke="#e5989b" strokeWidth="1" />
              <circle cx="48" cy="43" r="1.5" fill="#FFF" />
            </svg>
          )}

          {type === "purple_growth" && (
            <svg viewBox="0 0 100 100" className="w-28 h-28 filter drop-shadow-[0_8px_16px_rgba(179,157,219,0.4)]">
              <defs>
                <linearGradient id="purpleCharmGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f7f4fc" />
                  <stop offset="40%" stopColor="#d1c4e9" />
                  <stop offset="100%" stopColor="#b39ddb" />
                </linearGradient>
              </defs>
              {/* Elegant Scallop Shell */}
              <path 
                d="M15,50 C15,22 35,10 50,14 C65,10 85,22 85,50 C85,75 66,85 50,86 C34,85 15,75 15,50 Z" 
                fill="url(#purpleCharmGrad)" 
                stroke="#673ab7" 
                strokeWidth="1.2"
              />
              {/* Radial Ribs */}
              <path d="M50,86 L50,14" stroke="#673ab7" strokeWidth="0.8" opacity="0.4" />
              <path d="M50,86 C40,70 30,55 25,35" stroke="#673ab7" strokeWidth="0.8" opacity="0.4" />
              <path d="M50,86 C60,70 70,55 75,35" stroke="#673ab7" strokeWidth="0.8" opacity="0.4" />
              <path d="M50,86 C43,74 38,62 38,30" stroke="#673ab7" strokeWidth="0.8" opacity="0.3" />
              <path d="M50,86 C57,74 62,62 62,30" stroke="#673ab7" strokeWidth="0.8" opacity="0.3" />
              
              {/* Hand-knitted delicate lace decor & premium pearl setting */}
              <circle cx="80" cy="50" r="4.5" fill="#ffffff" stroke="#9575cd" strokeWidth="1" />
              <path d="M75,44 Q85,40 85,50 Q85,60 75,56" fill="none" stroke="#b39ddb" strokeWidth="1.2" strokeDasharray="2,2" />
            </svg>
          )}

          {type === "blue_career" && (
            <svg viewBox="0 0 100 100" className="w-28 h-28 filter drop-shadow-[0_8px_16px_rgba(128,222,234,0.4)]">
              <defs>
                <linearGradient id="blueCharmGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f0fcfd" />
                  <stop offset="45%" stopColor="#b2ebf2" />
                  <stop offset="100%" stopColor="#80deea" />
                </linearGradient>
              </defs>
              {/* Concentric spiral round bivalve shell */}
              <circle cx="50" cy="50" r="38" fill="url(#blueCharmGrad)" stroke="#00838f" strokeWidth="1.2" />
              {/* Superfine concentric fluid sandgrowth lines */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="#26c6da" strokeWidth="0.8" opacity="0.5" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="#26c6da" strokeWidth="0.7" opacity="0.4" />
              <circle cx="50" cy="50" r="14" fill="none" stroke="#00838f" strokeWidth="0.6" opacity="0.3" />
              {/* Sparkling star detail overlay */}
              <path d="M50,44 L52,48 L56,50 L52,52 L50,56 L48,52 L44,50 L48,48 Z" fill="#ffffff" />
            </svg>
          )}

          {type === "yellow_academic" && (
            <svg viewBox="0 0 100 100" className="w-28 h-28 filter drop-shadow-[0_8px_16px_rgba(255,224,130,0.4)]">
              <defs>
                <linearGradient id="yellowCharmGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#fffefa" />
                  <stop offset="40%" stopColor="#ffe082" />
                  <stop offset="100%" stopColor="#ffd54f" />
                </linearGradient>
              </defs>
              {/* fan ribbed conch/scallop */}
              <path 
                d="M50,90 Q12,75 14,40 Q16,10 50,22 Q84,10 86,40 Q88,75 50,90 Z" 
                fill="url(#yellowCharmGrad)" 
                stroke="#f57f17" 
                strokeWidth="1.2"
              />
              <path d="M50,90 L50,22" stroke="#f57f17" strokeWidth="0.80" opacity="0.5" />
              <path d="M50,90 Q34,60 25,35" stroke="#f57f17" strokeWidth="0.75" opacity="0.4" />
              <path d="M50,90 Q66,60 75,35" stroke="#f57f17" strokeWidth="0.75" opacity="0.4" />
              <path d="M50,90 Q42,55 38,28" stroke="#f57f17" strokeWidth="0.70" opacity="0.3" />
              <path d="M50,90 Q58,55 62,28" stroke="#f57f17" strokeWidth="0.70" opacity="0.3" />
            </svg>
          )}
        </div>

        {/* MIDDLE Connecting Link Cords and Beads */}
        <div className="w-1.5 h-12 flex flex-col items-center relative -mt-1 z-10 select-none">
          <div className="w-2 h-0.5" style={{ backgroundColor: meta.ribbonColor }} />
          <div className="w-1 h-full" style={{ backgroundColor: meta.ribbonColor }} />
          {/* Miniature pearl bead in the middle */}
          <div className="w-3.5 h-3.5 rounded-full bg-white border shadow-sm -my-1 z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
          </div>
          <div className="w-1 h-full" style={{ backgroundColor: meta.ribbonColor }} />
          <div className="w-2 h-0.5" style={{ backgroundColor: meta.ribbonColor }} />
        </div>

        {/* SHELL 2: Secondary Smaller Matching Shell */}
        <div className="relative z-20 -mt-1 shadow-sm transform hover:scale-105 transition-transform duration-300">
          {type === "pink_love" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <circle cx="50" cy="50" r="32" fill="#fff5f5" stroke="#e5989b" strokeWidth="1.2" />
              <path d="M50,28 C45,20 32,20 32,32 C32,46 50,60 50,65 C50,60 68,46 68,32 C68,20 55,20 50,28 Z" fill="#e5989b" opacity="0.85" />
            </svg>
          )}

          {type === "purple_growth" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <path 
                d="M50,80 Q25,70 25,45 Q25,20 50,25 Q75,20 75,45 Q75,70 50,80 Z" 
                fill="#f3e5f5" 
                stroke="#b39ddb" 
                strokeWidth="1.2"
              />
              <circle cx="50" cy="45" r="3.5" fill="#fff" stroke="#9575cd" strokeWidth="0.8" />
            </svg>
          )}

          {type === "blue_career" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <circle cx="50" cy="50" r="28" fill="#e0f7fa" stroke="#4dd0e1" strokeWidth="1.2" />
              <path d="M50,26 L64,50 L50,74 L36,50 Z" fill="#80deea" opacity="0.6" />
            </svg>
          )}

          {type === "yellow_academic" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <circle cx="50" cy="50" r="28" fill="#fffde7" stroke="#ffd54f" strokeWidth="1.2" />
              <path d="M50,30 L55,42 L68,44 L58,52 L62,65 L50,58 L38,65 L42,52 L32,44 L45,42 Z" fill="#ffe082" />
            </svg>
          )}
        </div>

        {/* BOTTOM Link to dangling tag */}
        <div className="w-[1.5px] h-10 flex flex-col items-center relative -mt-1.5 z-10">
          <div className="w-[2px] h-full" style={{ backgroundColor: "#D4CBB3" }} />
          {/* Keyring clamp */}
          <div className="w-2.5 h-2.5 rounded-full border border-[#9E957E] bg-white" />
        </div>

        {/* THE DANGLING TAG: Fully detailed beautiful paper card with thread-like border */}
        <div className="w-[130px] h-28 bg-[#FFFDF9] border border-[#DDD6C2] rounded-md shadow-md p-1.5 flex flex-col justify-between items-center relative z-20 text-center transform -mt-1 select-none">
          <div className="absolute inset-[3px] border border-[#EFE9DB] rounded-[3px] pointer-events-none" />
          
          <span className="font-headline-custom text-[9px] text-[#A38E6D] scale-[0.85] tracking-widest leading-none block font-bold pt-0.5">
            寻找 baby 计划
          </span>

          {/* Mini QR code mockup visually identical to the user image */}
          <div className="w-11 h-11 bg-white border border-[#E4DDD3] p-[2px] flex items-center justify-center relative my-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)] selection:bg-transparent">
            {/* Real aesthetic vector QR pattern blocks */}
            <div className="w-full h-full relative grid grid-cols-5 gap-[1px]">
              <div className="bg-slate-800" /><div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-slate-800" />
              <div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" />
              <div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-transparent" />
              <div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" />
              <div className="bg-slate-800" /><div className="bg-slate-800" /><div className="bg-transparent" /><div className="bg-slate-800" /><div className="bg-slate-800" />
            </div>
            {/* Center shell watermark */}
            <div className="absolute w-[10px] h-[10px] bg-white rounded-full flex items-center justify-center shadow-xs">
              <div className="w-[6px] h-[6px] bg-[#A38E6D] rounded-full scale-[0.8]" />
            </div>
          </div>

          <div className="space-y-0.5 pb-0.5 select-none leading-none scale-[0.78]">
            <p className="text-[7.5px] scale-[0.9] text-text-muted font-sans font-medium">扫码参与，写下你的问题</p>
            <p className="text-[8px] font-semibold text-text-primary font-headline-custom">找到与你同频的答案</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 py-4">
      
      {/* Header and Back Button controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-border-outline/10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-sans tracking-widest text-[#A38E6D] hover:text-text-primary transition-colors cursor-pointer select-none group"
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          返回海滩主页 / BACK TO SHORE
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block bg-paper-warm/40 border border-[#E9E5D9] px-2.5 py-1 rounded-sm flex items-center gap-1">
            <Sparkles size={10} className="animate-spin-slow" />
            测试版限时免费抽取
          </span>
          <button 
            onClick={() => setShowFaq(!showFaq)}
            className="p-1 px-2.5 rounded-full border border-border-outline/30 hover:bg-paper-secondary text-[10px] font-sans text-text-muted transition-all cursor-pointer flex items-center gap-1 select-none"
          >
            <HelpCircle size={11} />
            兑换说明
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {drawStep !== "idle" ? (
          <motion.div
            key="drawing-animation-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col justify-center items-center py-6 md:py-12"
          >
            <div className="w-full max-w-2xl mx-auto rounded-xl p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-b from-[#0B0F19] to-[#04060B] border border-slate-800/80 shadow-[0_24px_50px_rgba(4,6,11,0.7)] text-center">
              {/* Grid dot ambient layout */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_0)] [background-size:20px_20px]" />
              
              {/* Color thematic soft ambient glow behind center */}
              <div 
                className="absolute w-[250px] h-[250px] rounded-full filter blur-[80px] opacity-[0.14] transition-colors duration-1000 pointer-events-none"
                style={{
                  backgroundColor: CHARM_METADATA[selectedCharm].color,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />

              <AnimatePresence mode="wait">
                {drawStep === "listening" ? (
                  <motion.div
                    key="step-listening"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col items-center justify-center space-y-8 select-none"
                  >
                    {/* Phase Ring Resonance with selected charm color accent */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      
                      {/* Concentric Audio Wave Rings */}
                      {[0, 1, 2].map((idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0.6, opacity: 0.8 }}
                          animate={{ scale: [0.6, 1.8], opacity: [0.8, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.2,
                            delay: idx * 0.7,
                            ease: "easeOut"
                          }}
                          className="absolute w-full h-full rounded-full border border-dashed pointer-events-none"
                          style={{ borderColor: `${CHARM_METADATA[selectedCharm].color}66` }}
                        />
                      ))}

                      {/* Small Wave Beats running inside waves */}
                      <motion.div
                        animate={{
                          scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                        className="absolute w-28 h-28 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]"
                      >
                        <Waves size={36} style={{ color: CHARM_METADATA[selectedCharm].color }} className="animate-pulse" />
                      </motion.div>
                    </div>

                    {/* Ocean wave sine path ornament */}
                    <div className="w-48 h-6 flex justify-center items-center overflow-hidden opacity-40">
                      <svg viewBox="0 0 200 40" className="w-full h-full">
                        <motion.path
                          animate={{
                            d: [
                              "M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20",
                              "M 0 20 Q 25 35, 50 20 T 100 20 T 150 20 T 200 20",
                              "M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20"
                            ]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: "easeInOut"
                          }}
                          fill="none"
                          stroke={CHARM_METADATA[selectedCharm].color}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    {/* Elegant Typography detailing progress */}
                    <div className="space-y-3 px-4">
                      <span 
                        className="text-[10px] tracking-[0.3em] font-label-custom font-semibold uppercase block"
                        style={{ color: CHARM_METADATA[selectedCharm].color }}
                      >
                        STAGE 01 : 倾听潮汐声频 / TUNING TIDAL WAVE
                      </span>
                      <h3 className="font-headline-custom text-base md:text-lg font-bold text-slate-100 tracking-wide">
                        正在默契感应深海声波...
                      </h3>
                      <p className="font-sans text-[11.5px] leading-relaxed text-slate-400 font-medium max-w-sm mx-auto">
                        深呼吸，闭上眼。请静置挂坠，让心底的碎碎念顺着这枚 <span className="font-semibold" style={{ color: CHARM_METADATA[selectedCharm].color }}>{CHARM_METADATA[selectedCharm].tag}</span> 专属声道，随洋流传送远航。
                      </p>
                    </div>

                    {/* Processing Status Scroll Lines */}
                    <div className="bg-slate-900/60 font-mono text-[9px] border border-slate-800/60 text-slate-400 p-2 py-3 px-4 rounded-md w-full max-w-xs flex gap-2 items-center justify-center shadow-inner">
                      <RotateCw size={10} className="animate-spin text-slate-500" />
                      <span className="tracking-wide animate-pulse">正在调谐 {CHARM_METADATA[selectedCharm].tag} 主题赫兹共鸣波...</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-vortex"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center justify-center space-y-8 select-none"
                  >
                    {/* BREATHTAKING STARRY VORTEX COMPOSITING */}
                    <div className="relative w-48 h-48 flex items-center justify-center origin-center">
                      
                      {/* Ring 1 (Inner Rotating Sparkles) */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-[25px] border border-dashed border-white/5 rounded-full"
                      >
                        <Sparkles size={11} className="absolute -top-1.5 left-[35%] text-amber-200 animate-pulse" />
                        <Sparkles size={8} className="absolute -bottom-1 right-[25%] opacity-70" style={{ color: CHARM_METADATA[selectedCharm].color }} />
                      </motion.div>
                      
                      {/* Ring 2 (Middle Parallax Counter-Rotating Starfield) */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
                        className="absolute inset-[10px] border border-dashed border-white/5 rounded-full"
                      >
                        <Star size={10} className="absolute top-[20%] left-0 text-white fill-white" />
                        <Star size={6} className="absolute bottom-[30%] right-1 text-slate-200" />
                        <Sparkles size={10} className="absolute -top-1 right-[40%] text-amber-300" />
                        <div className="absolute top-[80%] left-[20%] w-1 h-1 rounded-full" style={{ backgroundColor: CHARM_METADATA[selectedCharm].color }} />
                      </motion.div>

                      {/* Ring 3 (Outer Majestic Orbit with Swirling Particles) */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        className="absolute inset-0 border border-dotted border-white/5 rounded-full"
                      >
                        <Star size={11} className="absolute top-[40%] -right-1 text-white fill-amber-200 animate-pulse" />
                        <Sparkles size={11} className="absolute bottom-[20%] left-2 opacity-80" style={{ color: CHARM_METADATA[selectedCharm].color }} />
                        <div className="absolute top-[10%] left-[60%] w-1 h-1 bg-white opacity-80 rounded-full" />
                        <div className="absolute bottom-[10%] left-[30%] w-1 h-1 bg-indigo-300 rounded-full" />
                      </motion.div>

                      {/* Concentric Vortex Waves spiraling in */}
                      {[1, 2, 3].map((v) => (
                        <motion.div
                          key={v}
                          animate={{
                            scale: [1.2, 0.1],
                            opacity: [0, 0.8, 0],
                            rotate: [0, 180 + v * 90]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3.5,
                            delay: v * 1.1,
                            ease: "easeInOut"
                          }}
                          className="absolute w-full h-full rounded-full border border-dashed pointer-events-none"
                          style={{ 
                            borderColor: `${CHARM_METADATA[selectedCharm].color}44`,
                            borderWidth: "1px"
                          }}
                        />
                      ))}

                      {/* Pulsing Core of Fortune Crystalization */}
                      <motion.div
                        animate={{
                          scale: [1, 1.12, 1],
                          rotate: 360
                        }}
                        transition={{
                          scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 20, ease: "linear" }
                        }}
                        className="absolute w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ 
                          background: `radial-gradient(circle, #ffffff 10%, ${CHARM_METADATA[selectedCharm].color}dd 60%, transparent 100%)`,
                          boxShadow: `0 0 30px ${CHARM_METADATA[selectedCharm].color}99`
                        }}
                      >
                        <Sparkles size={20} className="text-[#0d1527] animate-pulse" />
                      </motion.div>
                    </div>

                    {/* Editorial Typography explaining the vortex status */}
                    <div className="space-y-2 px-4">
                      <span 
                        className="text-[10px] tracking-[0.3em] font-label-custom font-semibold uppercase block text-amber-200 animate-pulse animate-duration-1000"
                        style={{ textShadow: `0 0 10px ${CHARM_METADATA[selectedCharm].color}66` }}
                      >
                        🌸 潮汐共鸣契合 · 签意汇聚中 🌸
                      </span>
                      <h3 className="font-headline-custom text-base md:text-lg font-bold text-slate-100 tracking-wide mt-1">
                        星宿尘埃聚集，灵感签章凝结
                      </h3>
                      <p className="font-sans text-[11.5px] leading-relaxed text-slate-400 font-medium max-w-sm mx-auto">
                        这阵宏大的星芒漩涡正将海平面的远古祝福重新凝聚。属于你本命守护的那颗莹润签币，即将破茧现身！
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : !hasDrawn ? (
          <motion.div 
            key="selection-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FAF9F5]/40 p-6 md:p-10 border border-border-outline/10 rounded-sm relative overflow-hidden shadow-xs"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C4B296_1.5px,transparent_0)] [background-size:24px_24px]" />
            <div className="absolute -top-[10%] -right-[15%] w-[45%] h-[45%] bg-accent-gold/5 rounded-full filter blur-[60px] pointer-events-none" />

            {/* Left Column: Huge physical rendered charm with live styling preview (7 columns wide) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white/70 border border-[#ECE9DF] p-6 rounded-sm relative aspect-[3/4] max-w-sm mx-auto w-full shadow-inner">
              <div className="absolute top-4 left-4 flex flex-col items-start space-y-1 select-none">
                <span className="font-mono text-[9px] tracking-widest text-[#A38E6D] uppercase">Live Preview</span>
                <span className="font-headline-custom text-xs text-text-primary px-2 py-0.5 border border-[#EAE6DB] rounded-sm bg-[#FAF9F5]">
                  {CHARM_METADATA[selectedCharm].tag}
                </span>
              </div>

              {/* Decorative Dry-point framing lines */}
              <div className="absolute inset-3 border border-[#F1EFE3] rounded-sm pointer-events-none" />

              {/* Render Selected Charm Pendant with subtle swing */}
              <div className="pt-2">
                {renderCharmVisual(selectedCharm, isDrawing)}
              </div>
            </div>

            {/* Right Column: Title, selections, premium payments and drawers (5 columns wide) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Core editorial title */}
              <div className="space-y-3.5 select-none text-left">
                <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block">
                  LUCKY BLIND BOX / 海之祈愿贝挂 Lucky 抽
                </span>
                <h2 className="font-headline-custom text-2xl font-bold text-text-primary leading-tight">
                  抽取你的本命情绪贝币
                </h2>
                
                <p className="font-sans text-[12.5px] leading-relaxed text-text-muted">
                  以远古贝挂与情绪疗愈为灵感，结合真丝编织挂绳、立体磨砺浮雕贝壳与手工贝壳珠。
                  线上虚拟抽取心仪的祈愿贝币，生成带有专属灵感回响的「心灵签章」，并在实体活动现场直接兑换精美对应的实体工艺挂饰。
                </p>
              </div>

              {/* Categories selection grids */}
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-label-custom tracking-[0.15em] text-[#A38E6D] font-bold block uppercase">
                  1. 选择本命祈愿主题 / Select Category
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(CHARM_METADATA) as CharmType[]).map((key) => {
                    const meta = CHARM_METADATA[key];
                    const isSelected = selectedCharm === key;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (isDrawing) return;
                          setSelectedCharm(key);
                        }}
                        className={`p-3.5 border text-left rounded-sm relative overflow-hidden transition-all duration-300 pointer-events-auto cursor-pointer ${
                          isSelected 
                            ? "bg-[#FAF9F5] border-[#A38E6D] shadow-xs" 
                            : "bg-white/50 border-border-outline/40 hover:bg-white hover:border-text-muted/60"
                        }`}
                      >
                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                          </div>
                        )}
                        
                        <span className="font-headline-custom text-[11px] block font-semibold text-text-primary">
                          {key === "pink_love" && "粉色爱情"}
                          {key === "purple_growth" && "紫色成长"}
                          {key === "blue_career" && "蓝色事业"}
                          {key === "yellow_academic" && "黄色学业"}
                        </span>
                        
                        <span className="font-mono text-[8px] text-[#A38E6D] uppercase block mt-0.5 tracking-wider">
                          {meta.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display card details */}
              <div className={`p-4 rounded-sm border ${CHARM_METADATA[selectedCharm].borderClass} bg-gradient-to-br ${CHARM_METADATA[selectedCharm].bgClass} text-left transition-all duration-300`}>
                <h4 className="font-headline-custom text-[12.5px] font-bold text-text-primary flex items-center gap-1.5 leading-none">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: CHARM_METADATA[selectedCharm].color }} />
                  {CHARM_METADATA[selectedCharm].name}
                </h4>
                <p className="font-sans text-[11.5px] text-text-muted mt-2 leading-relaxed">
                  {CHARM_METADATA[selectedCharm].description}
                </p>
              </div>

              {/* Pricing & Draw Action buttons (Requires showing transaction buttons but allowing beta free route) */}
              <div className="space-y-4 pt-3 text-left">
                <span className="text-[10px] font-label-custom tracking-[0.15em] text-[#A38E6D] font-bold block uppercase flex items-center gap-1">
                  <CreditCard size={10} />
                  2. 支付抽取与心灵回响 / Checkout Options
                </span>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Paid channel UI representing actual payment button as requested */}
                  <button
                    onClick={() => handleDraw(true)}
                    disabled={isDrawing}
                    className="flex-1 opacity-90 hover:opacity-100 bg-[#111111] hover:bg-[#A38E6D] text-white p-4 rounded-full text-xs font-sans tracking-widest font-bold text-center cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all relative group overflow-hidden"
                  >
                    {/* Fake realistic price markdown */}
                    <div className="absolute top-1 right-3 text-[7px] text-accent-gold scale-90 font-mono">BETA DISCOUNT</div>
                    <span>¥9.90 线上抽取</span>
                    <span className="text-[10px] opacity-60 font-medium font-sans">| 随即获得实体兑换券</span>
                  </button>

                  {/* Free Testing Channel to let users evaluate immediately */}
                  <button
                    onClick={() => handleDraw(false)}
                    disabled={isDrawing}
                    className="flex-1 border border-[#A38E6D] hover:border-text-primary text-[#A38E6D] hover:text-text-primary bg-transparent text-xs hover:bg-[#F8F7F2] p-4 rounded-full font-sans tracking-widest font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    {isDrawing ? (
                      <>
                        <RotateCw size={12} className="animate-spin text-[#A38E6D]" />
                        正在倾听潮汐中...
                      </>
                    ) : (
                      <>
                        <Sparkles size={11} className="text-[#A38E6D] animate-pulse" />
                        测试通道：先免费抽
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center sm:text-left select-none scale-95 origin-left">
                  <span className="font-mono text-[8.5px] text-text-muted opacity-80 leading-normal block">
                    * 线上生成的签意可永久存于您的海洋信箱系统（我的信箱）。本测试通道同样会生成完整兑换凭证。
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* RESULT SCREEN: EXQUISITE REDEEM TICKET / PHYSICAL REDEMPTION CARD */
          <motion.div 
            key="result-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto space-y-8"
          >
            {/* The Redemption Ticket Card (Structured identically to high quality ticket stubs) */}
            <div className="bg-white border border-[#DDD6C2] rounded-lg shadow-[0_16px_40px_rgba(100,90,70,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: CHARM_METADATA[drawnResult!.type].color }} />
              
              {/* Delicate interior margins */}
              <div className="p-6 md:p-8 space-y-6 relative z-10 text-left">
                
                {/* Header Ticket Details */}
                <div className="flex justify-between items-center border-b border-[#EDE9DE] pb-4">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-[#A38E6D] uppercase tracking-widest block leading-none">Redeem Voucher / 兑换凭证</span>
                    <h3 className="font-headline-custom text-base font-bold text-text-primary leading-tight">
                      寻找 BABY 计划 · 情绪挂件
                    </h3>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="text-right">
                    <span className="font-mono text-[11px] font-bold text-[#A38E6D] block leading-none tracking-wider select-text">
                      {drawnResult!.ticketId}
                    </span>
                    <span className="font-mono text-[8.5px] text-accent-seafoam font-semibold block uppercase mt-1 leading-none tracking-widest flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-accent-seafoam animate-ping inline-block" />
                      待核销 / ACTIVE
                    </span>
                  </div>
                </div>

                {/* Main Content: Quote Box and Description */}
                <div className="space-y-4">
                  <div className="bg-[#FAF9F5] border border-dashed border-[#E5DFCE] p-5 rounded-md relative text-center">
                    <span className="font-label-custom text-[8px] text-[#A38E6D]/80 tracking-[0.25em] uppercase block mb-2 select-none">
                      - THE SHORE SENTIMENTS / 海滩灵感签意 -
                    </span>
                    
                    <h4 className="font-headline-custom text-sm md:text-[14.5px] leading-relaxed text-text-primary font-bold italic py-1">
                      “ {drawnResult!.quote.zh} ”
                    </h4>
                    
                    <p className="font-mono text-[9px] tracking-wide text-[#A38E6D] leading-normal pt-1 break-words">
                      {drawnResult!.quote.en}
                    </p>
                  </div>

                  {/* Deep detailed response breakdown */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-custom font-bold text-[#A38E6D] uppercase tracking-wider block">
                      【签意解构】
                    </span>
                    <p className="text-[11.5px] leading-relaxed text-text-muted font-sans font-medium">
                      {drawnResult!.quote.detail}
                    </p>
                  </div>
                </div>

                {/* Split line representing classic rip-off coupons */}
                <div className="relative h-px border-b border-[#EDE9DE] -mx-8 my-1">
                  {/* Stub circles */}
                  <div className="absolute -left-3 -top-2.5 w-5 h-5 bg-[#F6F5EF] border border-[#DDD6C2] rounded-full z-20" />
                  <div className="absolute -right-3 -top-2.5 w-5 h-5 bg-[#F6F5EF] border border-[#DDD6C2] rounded-full z-20" />
                </div>

                {/* Lower Ticket: QR Code and Redemption Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  
                  {/* Left segment: Instructions */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={12} className="text-[#A38E6D] mt-0.5 shrink-0" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-label-custom tracking-wider text-text-primary font-bold block">
                          线下兑换指引 / Offline Redemption
                        </span>
                        <p className="text-[11px] text-text-muted leading-relaxed font-sans">
                          凭借本电子凭证与券码 <strong>{drawnResult!.ticketId}</strong>，可在《寻找Baby计划》公共艺术展台，配合现场管理员核销领取对应的 <strong>『{CHARM_METADATA[drawnResult!.type].name.split(" · ")[0]}』</strong> 物理实体工艺挂饰一只。
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 select-none bg-[#F4F9F6] border border-[#E1EDE6] px-2.5 py-1.5 rounded-sm">
                      <Check size={11} className="text-accent-seafoam shrink-0" />
                      <span className="text-[9.5px] font-semibold text-[#307049] leading-none">
                        支付状态：测试核销通过 / 应付 ¥0.00 (实付 ¥0.00)
                      </span>
                    </div>
                  </div>

                  {/* Right segment: QR core matching exactly design reference */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center space-y-1.5 bg-[#FAF9F5] border border-[#E9E5D9] p-3 rounded-md selection:bg-transparent">
                    <div className="w-18 h-18 bg-white border border-[#E4DDD3] p-1 flex items-center justify-center relative shadow-xs">
                      {/* Fully detailed pattern mockup QR */}
                      <div className="w-full h-full relative grid grid-cols-6 gap-[1px]">
                        <div className="bg-slate-900" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-slate-900" /><div className="bg-slate-900" />
                        <div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" />
                        <div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" />
                        <div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" />
                        <div className="bg-slate-900" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-slate-900" /><div className="bg-transparent" />
                        <div className="bg-transparent" /><div className="bg-transparent" /><div className="bg-slate-900" /><div className="bg-transparent" /><div className="bg-transparent" /><div className="bg-slate-900" />
                      </div>
                      {/* Interactive Center Seal */}
                      <div className="absolute w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CHARM_METADATA[drawnResult!.type].color }} />
                      </div>
                    </div>
                    
                    <span className="font-mono text-[7px] text-[#A38E6D] uppercase tracking-wider scale-[0.9] text-center select-none block">
                      Offline Scan Verification
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post-draw choices and action buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:flex-1 px-8 py-4 border border-[#A38E6D] hover:border-text-primary bg-white text-[#A38E6D] hover:text-text-primary text-xs font-sans tracking-widest font-bold rounded-full transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                再抽一次 / DRAW AGAIN
              </button>

              <button
                onClick={onBack}
                className="w-full sm:flex-1 px-8 py-4 bg-text-primary hover:bg-[#A38E6D] text-bg-primary text-xs font-sans tracking-widest font-bold rounded-full transition-all cursor-pointer shadow-sm active:scale-[0.98]"
              >
                返回主页 / RETURN SHORE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Faq redemption explanation drawer */}
      {showFaq && (
        <div className="fixed inset-0 bg-[#3a352a]/40 backdrop-blur-2xs z-50 flex items-center justify-center p-6" onClick={() => setShowFaq(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border border-[#DDD6C2] rounded-lg shadow-xl p-6 space-y-4 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-headline-custom text-base font-bold text-text-primary flex items-center gap-1.5">
              <Ticket size={16} className="text-[#A38E6D]" />
              寻找 baby 计划 · 挂件兑换须知
            </h4>

            <div className="space-y-3 pt-2 text-xs text-text-muted leading-relaxed font-sans">
              <div className="space-y-1">
                <span className="font-bold text-text-primary block">Q: 兑换实体工艺贝挂需要收费吗？</span>
                <p>A: 线上【测试通道】所抽取的贝挂同样全权免费，不作线上交易。您只需前往线下《寻找Baby计划》展览展位（核对您所抽取的凭证二维码及BB编码），即可免费兑换您刚抽取的实体定制包袋工艺挂件一份，数量有限、送完即止。</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-text-primary block">Q: 是否可以更改所兑换的主题分类？</span>
                <p>A: 实体挂件的色彩、绳带款式与线卷设计一一对应，线下核销原则上均以您抽签获得的「心灵凭证」BB编码类别为准。如果您对其他本命有更高的心灵同频偏好，可再次在本幸运抽中重新抽取。</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <button 
                onClick={() => setShowFaq(false)}
                className="w-full py-2 bg-text-primary hover:bg-[#A38E6D] text-bg-primary text-[11px] font-sans tracking-widest font-bold rounded-full text-center transition-all cursor-pointer select-none"
              >
                理解，立即参与 / AKNOWLEDGE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
