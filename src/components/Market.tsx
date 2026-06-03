import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Store, 
  ShoppingBag, 
  Tag, 
  ChevronLeft, 
  Send, 
  Upload, 
  Plus, 
  Sparkles, 
  Clock, 
  User, 
  MapPin, 
  Truck, 
  BookOpen, 
  Eye, 
  X, 
  DollarSign, 
  Check, 
  MessageSquare,
  AlertCircle
} from "lucide-react";
import imgHeadphones from "../assets/images/handdrawn_headphones_1780450469139.png";
import imgPlant from "../assets/images/handdrawn_plant_1780450485452.png";
import imgCrane from "../assets/images/handdrawn_crane_1780450500734.png";
import imgFlower from "../assets/images/flower_hd_1780401321111.png";
import imgPostcardOne from "../assets/images/postcard_one_1780396511812.png";
import imgPostcardTwo from "../assets/images/postcard_two_1780396523160.png";
interface Bid {
  id: string;
  bidder: string;
  suggestedPrice: number;
  comment: string;
  timestamp: string;
}

interface MarketItem {
  id: string;
  title: string;
  owner: string;
  story: string;
  suggestedOriginalPrice: number;
  deliveryMethod: "offline" | "online";
  deliveryDetail: string;
  image?: string;
  status: "available" | "sold";
  views: number;
  timestamp: string;
  bids: Bid[];
}

interface MarketProps {
  onBack: () => void;
  babyCoins: number;
  setBabyCoins: React.Dispatch<React.SetStateAction<number>>;
  playRippleChime: () => void;
}

// Preset Hand-drawn Illustration URLs
const PRESET_ILLUSTRATIONS = [
  { name: "手绘耳机", url: imgHeadphones },
  { name: "手绘盆栽", url: imgPlant },
  { name: "千纸鹤", url: imgCrane },
  { name: "毕业设计花卉", url: imgFlower },
  { name: "羊皮信笺", url: imgPostcardOne },
  { name: "复古书桌", url: imgPostcardTwo }
];

export function Market({ onBack, babyCoins, setBabyCoins, playRippleChime }: MarketProps) {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"square" | "showcase">("square");
  
  // Selected Item details overlay
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  
  // Create Post Form state
  const [postTitle, setPostTitle] = useState("");
  const [postOwner, setPostOwner] = useState("");
  const [postStory, setPostStory] = useState("");
  const [postPrice, setPostPrice] = useState<number>(50);
  const [postMethod, setPostMethod] = useState<"offline" | "online">("online");
  const [postDetail, setPostDetail] = useState("");
  const [selectedPresetImage, setSelectedPresetImage] = useState(PRESET_ILLUSTRATIONS[0].url);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Auction Price bidding/comment form state
  const [bidderName, setBidderName] = useState("");
  const [bidPrice, setBidPrice] = useState<number>(60);
  const [bidComment, setBidComment] = useState("");
  const [isBidding, setIsBidding] = useState(false);
  
  // Success / error states
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Fetch all market items
  const fetchMarketItems = async () => {
    try {
      const res = await fetch("/api/market");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error("Error fetching market goods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketItems();
  }, []);

  // Increment item view count
  const viewItem = async (id: string) => {
    try {
      await fetch(`/api/market/${id}/view`, { method: "POST" });
      setItems(prev => prev.map(item => item.id === id ? { ...item, views: item.views + 1 } : item));
    } catch (err) {}
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("请选取有效的图片文件 / Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCustomImageBase64(reader.result as string);
    };
  };

  // Submit Post code
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postStory.trim() || !postPrice) {
      setActionError("请完整填写物品标题、故事以及拍卖价格。");
      return;
    }

    setIsSubmitting(true);
    setActionError(null);
    setActionSuccess(null);

    const imageUrl = customImageBase64 || selectedPresetImage;

    try {
      const response = await fetch("/api/market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          owner: postOwner || "匿名好物主",
          story: postStory,
          suggestedOriginalPrice: postPrice,
          deliveryMethod: postMethod,
          deliveryDetail: postDetail || "无额外说明",
          image: imageUrl
        })
      });

      if (response.ok) {
        const newItem = await response.json();
        playRippleChime();
        // Give the poster a reward in 贝币 for sharing memories! E.g. +30 贝币
        setBabyCoins(prev => {
          const updated = prev + 30;
          localStorage.setItem("finding_baby_coins", updated.toString());
          return updated;
        });

        setActionSuccess("✨ 好物已成功上架！因分享宝贝，系统赠予您 30 情绪贝币！");
        setPostTitle("");
        setPostStory("");
        setPostPrice(80);
        setPostDetail("");
        setCustomImageBase64(null);
        fetchMarketItems();
        setTimeout(() => setActiveTab("square"), 2000);
      } else {
        setActionError("上架好物失败，请稍后重试。");
      }
    } catch (err) {
      console.error(err);
      setActionError("网络连接失败。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bid / Comment action
  const handleAddBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    if (!bidderName.trim() || !bidComment.trim() || !bidPrice) {
      alert("请输入名称、定价建议以及有爱留言。");
      return;
    }

    setIsBidding(true);
    try {
      const res = await fetch(`/api/market/${selectedItem.id}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bidder: bidderName,
          suggestedPrice: Number(bidPrice),
          comment: bidComment
        })
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setSelectedItem(updatedItem);
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        
        // Reward user 5 贝币 for commenting and participating!
        setBabyCoins(prev => {
          const updated = prev + 5;
          localStorage.setItem("finding_baby_coins", updated.toString());
          return updated;
        });

        playRippleChime();
        setBidComment("");
        // Reset price suggestion to neutral
        setBidPrice(updatedItem.suggestedOriginalPrice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBidding(false);
    }
  };

  // Buy post action
  const handleBuy = async (item: MarketItem) => {
    if (babyCoins < item.suggestedOriginalPrice) {
      alert(`糟糕！你的贝币余额不足 (${babyCoins} 贝币)。无法以 ${item.suggestedOriginalPrice} 贝币购买该好物。可以通过寄存回忆或留言建议市集定价赚取贝币哦！`);
      return;
    }

    if (!window.confirm(`确定要支付 ${item.suggestedOriginalPrice} 情绪贝币向好物主【${item.owner}】交换此物品吗？\n交易将由平台进行有温度的见证！`)) {
      return;
    }

    try {
      const res = await fetch(`/api/market/${item.id}/buy`, { method: "POST" });
      if (res.ok) {
        const updatedItem = await res.json();
        setSelectedItem(updatedItem);
        setItems(prev => prev.map(it => it.id === updatedItem.id ? updatedItem : it));
        
        setBabyCoins(prev => {
          const updated = Math.max(0, prev - item.suggestedOriginalPrice);
          localStorage.setItem("finding_baby_coins", updated.toString());
          return updated;
        });

        playRippleChime();
        alert(`🎉 恭喜交易达成！已经支付 ${item.suggestedOriginalPrice} 贝币。\n\n【收交货协议】：\n交付形式: ${item.deliveryMethod === 'online' ? '线上邮寄' : '线下核销'}\n交付指引: ${item.deliveryDetail}\n\n物品主已在系统收到通知，请根据上表核对收件或前往约定地点碰面！`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPresetLabel = (url: string) => {
    const found = PRESET_ILLUSTRATIONS.find(p => p.url === url);
    return found ? found.name : "自定义手绘";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in relative">
      
      {/* Header with Title and Currency Balance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 border-border-outline/10 gap-4">
        <div className="space-y-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 font-label-custom text-[11px] text-[#A38E6D] hover:text-text-primary transition-colors cursor-pointer select-none"
          >
            <ChevronLeft size={12} />
            <span>返回主页 / LEAVE MARKET</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-rose/15 rounded-md text-text-primary">
              <Store size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="font-headline-custom text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
                Baby市集 · 岁月好物分享
              </h2>
              <p className="text-xs text-text-muted mt-0.5 font-sans">
                这是一片让旧物重新流淌爱意的心灵港湾。在市集里分享、留言或带走回忆，都会触发贝币的温柔流转。
              </p>
            </div>
          </div>
        </div>

        {/* Currency status display - Gorgeous floating pill */}
        <div className="bg-[#FAF9F5]/90 border border-[#E9E5D9] shadow-sm px-5 py-3 rounded-xl flex items-center justify-between gap-5 self-start md:self-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐚</span>
            <div className="text-left leading-tight">
              <span className="block text-[9px] uppercase tracking-wider text-text-muted font-bold">Emotion Wallet</span>
              <span className="block text-[11px] text-[#A38E6D] font-medium font-body-custom">我的情绪贝币余额</span>
            </div>
          </div>
          <div className="border-l h-8 border-[#E9E5D9]" />
          <div className="text-right">
            <span className="text-2xl font-bold font-headline-custom italic text-[#A38E6D]">
              {babyCoins}
            </span>
            <span className="text-[10px] font-mono font-bold text-text-muted select-none ml-1">贝币</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher for Square/Feed and User Showroom (橱窗) */}
      <div className="flex border-b border-border-outline/10 gap-8 text-xs font-sans select-none justify-center">
        <button
          onClick={() => {
            setActiveTab("square");
            setSelectedItem(null);
          }}
          className={`pb-3 font-semibold tracking-widest uppercase transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "square" 
              ? "border-[#A38E6D] text-text-primary scale-102" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <ShoppingBag size={14} />
          <span>市集好物广场 / GOODIES FEED</span>
        </button>
        
        <button
          onClick={() => {
            setActiveTab("showcase");
            setSelectedItem(null);
          }}
          className={`pb-3 font-semibold tracking-widest uppercase transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "showcase" 
              ? "border-[#A38E6D] text-text-primary scale-102" 
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          <Plus size={14} />
          <span>我的好物橱窗 / MY SHOWCASE</span>
        </button>
      </div>

      {/* RENDER VIEW FOR TAB 1: MARKET FEEDS/SQUARE */}
      {activeTab === "square" && (
        <div className="space-y-8">
          {loading ? (
            <div className="py-24 text-center text-text-muted font-sans text-sm tracking-widest animate-pulse">
              🌊 正在打捞岁月里的精美旧物与故事...
            </div>
          ) : items.length === 0 ? (
            <div className="py-24 text-center border border-dashed rounded-sm border-border-outline/20 p-8">
              <p className="text-sm font-sans text-text-muted">市集目前空空如也，或许第一班潮汐刚落。快前往“我的好物橱窗”发布你的第一款回忆好物吧！</p>
            </div>
          ) : (
            // Xiaohongshu-style Multi-column Masonry Layout / responsive grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`item-card-${item.id}`}
                  onClick={() => {
                    setSelectedItem(item);
                    viewItem(item.id);
                  }}
                  whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(100, 90, 70, 0.15)" }}
                  className="bg-[#FDFCFB] border border-border-outline/10 hover:border-[#A38E6D]/50 rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 relative group shadow-sm"
                >
                  {/* Photo Section with Badge info */}
                  <div className="aspect-[4/3] bg-paper-secondary relative overflow-hidden flex justify-center items-center border-b border-border-outline/5">
                    {/* Item Fulfillment Badge */}
                    <span className={`absolute top-3 left-3 z-30 px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase rounded-full shadow-sm text-white ${
                      item.deliveryMethod === "online" ? "bg-[#5f9fa6]" : "bg-[#e5989b]"
                    }`}>
                      {item.deliveryMethod === "online" ? "线上邮寄" : "线下核销"}
                    </span>

                    {/* Sold out badge */}
                    {item.status === "sold" && (
                      <div className="absolute inset-0 bg-neutral-900/60 z-20 flex flex-col items-center justify-center backdrop-blur-xs select-none">
                        <span className="text-white text-xs font-sans tracking-widest border border-white/60 px-3.5 py-1 uppercase rounded-sm font-bold scale-102">
                          已被暖心流通 (SOLD OUT)
                        </span>
                        <span className="text-white/70 text-[9px] font-mono mt-1">
                          已在市集达成贝币见证
                        </span>
                      </div>
                    )}

                    {/* Main Image */}
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="text-center font-sans space-y-2 py-4 select-none">
                        <span className="text-3xl text-text-muted/40 font-mono">📦</span>
                        <p className="text-[10px] text-text-muted">无图片展示</p>
                      </div>
                    )}
                  </div>

                  {/* Body stories detail */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-headline-custom text-base font-bold text-text-primary group-hover:text-[#A38E6D] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono text-text-muted/80 flex items-center shrink-0">
                          by {item.owner}
                        </span>
                      </div>
                      
                      {/* Truncated emotional story text */}
                      <p className="font-sans text-xs text-text-variant font-light overflow-hidden text-ellipsis line-clamp-3 leading-relaxed text-justify">
                        {item.story}
                      </p>
                    </div>

                    <div className="border-t border-border-outline/5 pt-3.5 flex items-center justify-between select-none">
                      {/* Price tag */}
                      <div className="flex flex-col leading-tight">
                        <span className="text-[8px] text-text-muted uppercase tracking-wider">Emotion Price (贝币)</span>
                        <span className="text-sm font-bold font-headline-custom italic text-[#A38E6D] flex items-center gap-0.5">
                          🐚 {item.suggestedOriginalPrice}
                        </span>
                      </div>

                      {/* Stat counters */}
                      <div className="flex items-center gap-3 text-[10px] text-text-muted font-sans font-normal">
                        <span className="flex items-center gap-1">
                          <Eye size={11} /> {item.views} 浏览
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={11} /> {item.bids.length} 回应
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RENDER VIEW FOR TAB 2: MY SHOWCASE (物品上架橱窗) */}
      {activeTab === "showcase" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SUB-COLUMN: Goodies creating form */}
          <div className="md:col-span-7 bg-[#FDFCFB] border border-border-outline/10 p-6 sm:p-8 rounded-sm space-y-6 shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent-gold/40" />

            <div className="space-y-1 select-none">
              <h3 className="font-headline-custom text-lg font-bold text-text-primary">
                分享你的岁月宝贝故事
              </h3>
              <p className="text-xs text-text-muted">
                每一个在橱窗上架的回忆都充满灵魂。请写下陪伴过你的经历。成功分享，可收到 <strong className="text-[#A38E6D]">30 贝币</strong> 的馈赠哦！
              </p>
            </div>

            {actionSuccess && (
              <div className="p-3 bg-accent-seafoam/15 border border-accent-seafoam-outline/20 text-text-primary rounded-sm text-xs flex items-center gap-2 font-sans">
                <Check size={14} className="text-teal-600 shrink-0" />
                <span>{actionSuccess}</span>
              </div>
            )}
            {actionError && (
              <div className="p-3 bg-accent-rose/15 border border-accent-rose-outline/20 text-red-700 rounded-sm text-xs flex items-center gap-2 font-sans">
                <AlertCircle size={14} className="shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-6">
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">宝物标题 * (Title)</label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="例如: 陪伴我高中三年的耳机"
                    className="w-full bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-text-primary text-xs outline-none py-1.5 font-sans placeholder-text-muted/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">我的昵称 (Owner)</label>
                  <input
                    type="text"
                    value={postOwner}
                    onChange={(e) => setPostOwner(e.target.value)}
                    placeholder="例如: 小林 (留空则默认为神秘主)"
                    className="w-full bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-text-primary text-xs outline-none py-1.5 font-sans placeholder-text-muted/40"
                  />
                </div>
              </div>

              {/* Story Description Textarea */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center select-none">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                    好物温情回忆故事 * (Story)
                  </label>
                  <span className="text-[9px] text-[#A38E6D] italic">
                    小建议: 写下陪伴年限及承载过的感动心跳
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={postStory}
                  onChange={(e) => setPostStory(e.target.value)}
                  placeholder="说出它的故事，例如：这是我备战考研时租房用的小书桌，上面刻满了无数行微光闪烁的深夜誓言，如今我已经成功上岸，希望它可以带着祝福陪桌前的你一起披星戴月..."
                  className="w-full bg-transparent border-[0.5px] border-border-outline/25 focus:border-text-primary outline-none text-xs p-3 font-sans rounded-xs leading-relaxed resize-none placeholder-text-muted/45"
                />
              </div>

              {/* Suggestions quick pick values */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-text-muted block select-none">故事创作灵感，点击快速填充模板：</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "这是陪伴了我高中三年的耳机，听过贝多芬与英语听力，也录下过少年时细密的暗恋心跳。",
                    "这是我备战高考的那本英语词典，封皮脱线折角累累，它见证过我无数次抬头数星星的破晓决意。",
                    "这是我考研期间挤在出租屋写字台上的小书桌，干涸的红墨水瓶旁曾默默长满过我的倔强决心。"
                  ].map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPostStory(tpl)}
                      className="px-2.5 py-1 border border-border-outline/10 hover:border-[#A38E6D]/50 hover:bg-[#F8F7F2] rounded-full text-[10px] font-sans text-text-variant transition-colors cursor-pointer text-left line-clamp-1"
                    >
                      💡 题材 {i + 1}: {tpl.substring(0, 16)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery method, price, delivery instruction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">起步流通价格 * (Emotional Price)</label>
                  <div className="flex items-center gap-1 font-sans">
                    <span className="text-sm">🐚</span>
                    <input
                      type="number"
                      required
                      min={10}
                      max={1000}
                      value={postPrice}
                      onChange={(e) => setPostPrice(Number(e.target.value))}
                      className="w-full bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-text-primary text-xs outline-none py-1.5"
                    />
                    <span className="text-[10px] text-text-muted shrink-0 font-normal">贝币</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">交付流转渠道 * (Delivery Method)</label>
                  <div className="grid grid-cols-2 gap-2 select-none">
                    <button
                      type="button"
                      onClick={() => setPostMethod("online")}
                      className={`py-1 rounded-md text-[10px] font-sans tracking-widest uppercase border transition-colors cursor-pointer ${postMethod === 'online' ? 'bg-[#5f9fa6] border-[#5f9fa6] text-white font-semibold' : 'border-border-outline/25 text-text-muted hover:bg-paper-secondary'}`}
                    >
                      线上邮寄
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostMethod("offline")}
                      className={`py-1 rounded-md text-[10px] font-sans tracking-widest uppercase border transition-colors cursor-pointer ${postMethod === 'offline' ? 'bg-[#e5989b] border-[#e5989b] text-white font-semibold' : 'border-border-outline/25 text-text-muted hover:bg-paper-secondary'}`}
                    >
                      线下核销
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery point explanation */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">交易履行与交接说明 * (Fulfillment Instructions)</label>
                <input
                  type="text"
                  required
                  value={postDetail}
                  onChange={(e) => setPostDetail(e.target.value)}
                  placeholder={postMethod === 'online' ? "例如: 通过邮政挂号寄出，我来承担邮资。附带一卷自创明信片。" : "例如: 广州大学城生活区一加便利店门口长廊下，可现场手调一杯温豆奶给你。"}
                  className="w-full bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-text-primary text-xs outline-none py-1.5 font-sans placeholder-text-muted/40"
                />
              </div>

              {/* Photo Upload System with click and Drag-and-drop */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">物品配图展示 * (Item Visual Attachment)</label>
                
                {/* Drag and Drop Container */}
                <div 
                  ref={dragRef}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                    dragActive 
                      ? "border-accent-seafoam bg-accent-seafoam/10" 
                      : customImageBase64 
                        ? "border-[#A38E6D]/50 bg-[#F9F7F2]" 
                        : "border-border-outline/20 hover:bg-paper-secondary"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {customImageBase64 ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-md overflow-hidden mx-auto border shadow-sm">
                        <img src={customImageBase64} alt="Pre-upload custom draft" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-[#A38E6D] font-sans font-medium">已成功挂载您的自定义照片 ↺ 拖拽或点击可重新更换</p>
                    </div>
                  ) : (
                    <div className="space-y-1 select-none">
                      <div className="w-8 h-8 rounded-full bg-accent-rose/10 flex items-center justify-center mx-auto mb-1.5">
                        <Upload size={14} className="text-text-primary" />
                      </div>
                      <p className="text-xs text-text-primary font-sans font-bold">拖拽物品照片至此处，或直接点击上传</p>
                      <p className="text-[10px] text-text-muted font-mono leading-normal mt-0.5">支持 PNG, JPG 等手绘或摄影，建议 4:3 比例</p>
                    </div>
                  )}
                </div>

                {/* Preset illustrations if upload is not used */}
                {!customImageBase64 && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-text-muted block select-none">
                      或选择我们准备的高阶手绘风插图替代 (Choose a preset hand-drawn thumbnail):
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 select-none">
                      {PRESET_ILLUSTRATIONS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setSelectedPresetImage(preset.url)}
                          className={`p-1 border rounded-md relative flex flex-col justify-between items-center aspect-square bg-[#FDFCFB]/80 transition-all ${
                            selectedPresetImage === preset.url 
                              ? "border-[#A38E6D] bg-[#F8F7F2]" 
                              : "border-border-outline/10 hover:border-[#A38E6D]/40"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-sm overflow-hidden border border-neutral-100 mb-0.5">
                            <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[8px] scale-90 text-text-muted shrink-0 text-center font-sans font-light truncate w-full">
                            {preset.name}
                          </span>
                          {selectedPresetImage === preset.url && (
                            <span className="absolute top-0 right-0 bg-[#A38E6D] text-white p-0.2 rounded-bl-sm font-sans text-[7px]" style={{ fontSize: '6px' }}>✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-text-primary text-bg-primary hover:bg-[#A38E6D] hover:scale-[1.01] active:scale-[0.99] rounded-full text-xs font-sans tracking-[0.12em] font-bold uppercase transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <Check size={14} />
                  <span>发布好物到广场 / POST GOODIES (奖励 +30 贝币)</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SUB-COLUMN: Beautiful Showcase stats */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Visual Guide card */}
            <div className="bg-[#FBF9F4] border border-[#E9E5D9] p-6 rounded-sm space-y-4 shadow-xs">
              <span className="text-[10px] uppercase font-label-custom tracking-[0.25em] text-[#A38E6D] font-bold block select-none">
                CIRCULATION PHILOSOPHY / 贝币流通愿景
              </span>
              <p className="text-xs text-text-variant font-light leading-relaxed text-justify">
                《寻找Baby计划》中的“贝币”只在情绪流转、故事交换中发生折返流通。
                你可以通过以下方式赚取贝币，建立生机盎然的有爱社区：
              </p>
              <ul className="text-[11px] font-sans text-text-muted space-y-1.5 select-none font-light">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#A38E6D]">1.</span>
                  <span>寄存你的情感与自存信件 (<strong>+20 贝币</strong>)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#A38E6D]">2.</span>
                  <span>点击市集好物写下建议定价与有爱建议 (<strong>+5 贝币</strong>)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#A38E6D]">3.</span>
                  <span>在橱窗上架真实充满岁月温情的回忆好物 (<strong>+30 贝币</strong>)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#A38E6D]">4.</span>
                  <span>其他用户带走好物时扣除他们的贝币，奖励到你的余额里！</span>
                </li>
              </ul>
            </div>

            {/* Showcase preview mockup */}
            <div className="border border-border-outline/10 p-5 rounded-sm bg-white/40 space-y-4">
              <h4 className="text-xs font-sans tracking-widest font-semibold uppercase text-text-primary select-none">
                实时上架效果预览 (Mock Preview)
              </h4>
              <div className="border border-border-outline/10 rounded-sm bg-white overflow-hidden p-3 space-y-3">
                <div className="aspect-[4/3] bg-paper-secondary rounded-xs overflow-hidden flex items-center justify-center relative">
                  <img src={customImageBase64 || selectedPresetImage} alt="Realtime design mockup" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-accent-gold text-neutral-900 text-[8px] font-mono uppercase rounded-sm">
                    {postMethod === "online" ? "线上邮寄" : "线下核销"}
                  </span>
                </div>
                <div className="space-y-1">
                  <h5 className="font-headline-custom text-xs font-bold text-text-primary truncate">
                    {postTitle || "（还未设置物品名称）"}
                  </h5>
                  <p className="font-sans text-[10px] text-text-muted line-clamp-2 leading-relaxed">
                    {postStory || "（在这里预览感人肺腑的岁月故事...）"}
                  </p>
                </div>
                <div className="border-t border-border-outline/10 pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-text-muted font-sans font-light">
                    起拍价: 🐚 {postPrice} 贝币
                  </span>
                  <span className="text-[9px] text-[#A38E6D] font-mono uppercase tracking-wider">
                    by {postOwner || "神秘好物主"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER MODAL OVERLAY: DETAILED MULTI-DIMENSIONAL GOODIES STORY SCREEN */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/65 backdrop-blur-md z-999 flex items-center justify-center p-4 md:p-6 select-text overflow-y-auto"
          >
            <motion.div
              layoutId={`item-card-${selectedItem.id}`}
              className="bg-paper-warm border-[0.5px] border-border-variant/60 rounded-sm w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] text-left"
            >
              {/* Left Column: Visual display */}
              <div className="md:w-1/2 aspect-[4/3] md:aspect-auto bg-[#F4F1E9] relative flex items-center justify-center">
                
                {/* Method badge tag */}
                <span className={`absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full shadow-md text-white ${
                  selectedItem.deliveryMethod === "online" ? "bg-[#5f9fa6]" : "bg-[#e5989b]"
                }`}>
                  {selectedItem.deliveryMethod === "online" ? "🚚 线上邮寄" : "📍 线下核销"}
                </span>

                {/* Image */}
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center font-sans space-y-2 select-none">
                    <span className="text-4xl">📦</span>
                    <p className="text-xs text-text-muted">无图片展示</p>
                  </div>
                )}
                
                {selectedItem.status === "sold" && (
                  <div className="absolute inset-0 bg-neutral-900/75 z-10 flex flex-col items-center justify-center backdrop-blur-xs select-none">
                    <span className="text-white text-sm font-sans tracking-widest font-bold border border-white/60 px-4 py-1.5 uppercase rounded-xs scale-102">
                      已被暖心流通 (SOLD OUT)
                    </span>
                    <span className="text-white/60 text-[10px] font-mono mt-1.5">
                      已经由贝币平台见证交换
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Narrative details and bid comment desk split */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                
                {/* Close Button overlay */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 inline-block shrink-0 cursor-pointer z-50 text-text-muted hover:text-text-primary select-none"
                  title="关闭详情 / CLOSE"
                >
                  <X size={15} />
                </button>

                {/* Post Body story content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-mono text-[#A38E6D] uppercase font-bold tracking-[0.2em] select-none block">
                      MEMORIES SHARE / 好物与故事
                    </span>
                    <span className="text-[10px] text-text-muted select-none">
                      {new Date(selectedItem.timestamp).toLocaleDateString("zh-CN")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-headline-custom text-xl font-bold text-text-primary leading-tight">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted select-none">
                      <div className="w-4 h-4 rounded-full bg-accent-gold/10 flex items-center justify-center">
                        <User size={10} className="text-[#A38E6D]" />
                      </div>
                      <span>宝贝主: <strong>{selectedItem.owner}</strong></span>
                      <span>|</span>
                      <span>💡 围观人气: {selectedItem.views + 1} 浏览</span>
                    </div>
                  </div>

                  <div className="border-t border-border-outline/5 pt-4">
                    <div className="font-headline-custom italic text-[13.5px] text-[#A38E6D] font-medium select-none mb-1">
                      好物故事 (Our Story) :
                    </div>
                    <p className="font-sans text-[13px] text-text-variant font-light leading-relaxed text-justify pr-2 whitespace-wrap select-text">
                      "{selectedItem.story}"
                    </p>
                  </div>

                  {/* Delivery Detail information */}
                  <div className="p-3 bg-paper-secondary rounded-sm border border-border-outline/5 space-y-1 text-xs select-none">
                    <div className="font-sans font-semibold text-text-primary flex items-center gap-1">
                      {selectedItem.deliveryMethod === "online" ? <Truck size={12} className="text-text-primary" /> : <MapPin size={12} className="text-text-primary" />}
                      <span>交付与提物渠道 (Fulfillment details) :</span>
                    </div>
                    <p className="text-text-muted font-sans font-light pl-4">
                      {selectedItem.deliveryDetail}
                    </p>
                  </div>
                </div>

                {/* EMOTION AUCTION VALUE COMMENTS & FEEDBACK */}
                <div className="border-t border-border-outline/10 pt-4 space-y-4">
                  <div className="flex justify-between items-center select-none">
                    <h4 className="text-xs font-sans tracking-widest font-bold uppercase text-[#A38E6D] flex items-center gap-1">
                      <Sparkles size={11} className="text-[#A38E6D]" />
                      <span>情绪拍卖定价评价 ({selectedItem.bids.length})</span>
                    </h4>
                    <span className="text-[10px] text-text-muted">（发言留言奖励 +5 贝币）</span>
                  </div>

                  {/* Comments scroll window */}
                  <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 font-sans text-xs scrollbar-thin">
                    {selectedItem.bids.length === 0 ? (
                      <p className="text-text-muted text-center py-4 italic font-light">暂未收到情绪拍卖评价，快在这件物品下留下你认为它值多少贝币吧！</p>
                    ) : (
                      selectedItem.bids.map((bid) => (
                        <div key={bid.id} className="p-2 border border-border-outline/5 rounded-sm bg-white/50 space-y-1 relative pr-12">
                          <div className="flex items-center gap-1.5 font-bold text-text-primary">
                            <span className="text-[10px] text-[#A38E6D]">👤 {bid.bidder}</span>
                            <span className="text-[10px] font-light font-mono text-text-muted opacity-80">
                              认为值 <strong className="text-teal-600 font-bold">🐚 {bid.suggestedPrice}</strong> 贝币
                            </span>
                          </div>
                          <p className="text-text-variant font-light leading-relaxed select-text italic">
                            "{bid.comment}"
                          </p>
                          <span className="absolute top-2 right-2 text-[8px] font-mono text-text-muted opacity-60">
                            {new Date(bid.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Bid commenting form */}
                  {selectedItem.status === "available" && (
                    <form onSubmit={handleAddBid} className="border-t border-dashed border-border-outline/10 pt-3 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={bidderName}
                          onChange={(e) => setBidderName(e.target.value)}
                          placeholder="您的有爱昵称 *"
                          className="bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-[#A38E6D] text-xs outline-none py-1 h-7 font-sans placeholder-text-muted/50"
                        />
                        <div className="flex items-center gap-1 font-sans">
                          <span className="text-[10px] text-text-muted shrink-0 select-none">我认为值 * : 🐚</span>
                          <input
                            type="number"
                            required
                            min={5}
                            max={2000}
                            value={bidPrice}
                            onChange={(e) => setBidPrice(Number(e.target.value))}
                            className="bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-[#A38E6D] text-xs outline-none py-0.5 text-center w-full focus:font-bold"
                          />
                          <span className="text-[10px] text-text-muted select-none">贝币</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={bidComment}
                          onChange={(e) => setBidComment(e.target.value)}
                          placeholder="在此写下对它温暖的评语或者故事共鸣... *"
                          className="bg-transparent border-b-[0.5px] border-border-outline/40 focus:border-[#A38E6D] text-xs outline-none py-1 flex-1 font-sans placeholder-text-muted/40"
                        />
                        <button
                          type="submit"
                          disabled={isBidding || !bidComment.trim()}
                          className="px-3 py-1 bg-text-primary text-bg-primary hover:bg-[#A38E6D] rounded-full text-[10px] font-sans font-bold uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0 disabled:opacity-45"
                        >
                          <Send size={10} />
                          <span>留言</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* PURCHASE / CIRCULATION DRAWER */}
                <div className="border-t border-border-outline/10 pt-4 flex items-center justify-between gap-4 select-none">
                  <div className="flex flex-col leading-tight">
                    <span className="text-[8px] text-text-muted uppercase tracking-wider block">情绪定价贝金</span>
                    <span className="text-base font-bold font-headline-custom italic text-[#A38E6D] flex items-center gap-0.5">
                      🐚 {selectedItem.suggestedOriginalPrice} 贝币
                    </span>
                  </div>

                  {selectedItem.status === "available" ? (
                    <button
                      onClick={() => handleBuy(selectedItem)}
                      className="flex-1 py-3 bg-gradient-to-r from-[#e5989b] to-[#b56576] hover:from-[#e28387] hover:to-[#a95c6c] text-neutral-900 border border-[#807050]/15 shadow-sm text-xs font-sans tracking-[0.12em] rounded-full font-bold transition-all uppercase flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101 active:scale-99"
                    >
                      <ShoppingBag size={12} className="text-neutral-900" />
                      <span>情绪币交换物品购买 / BUY ITEM</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-3 bg-neutral-100 text-neutral-400 border border-neutral-200 text-xs font-sans tracking-wider rounded-full font-semibold uppercase cursor-not-allowed text-center select-none"
                    >
                      已被温馨流通，故事仍在岁月中闪烁
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
