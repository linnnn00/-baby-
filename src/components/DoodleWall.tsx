import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageSquare, ChevronLeft, ChevronRight, Send, User, Sparkles } from "lucide-react";
import { ShellItem } from "../types";

interface DoodleWallProps {
  shells: ShellItem[];
  onLike: (id: string) => Promise<void>;
  onReply: (id: string, content: string, author: string) => Promise<void>;
}

export const DoodleWall: React.FC<DoodleWallProps> = ({ shells, onLike, onReply }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedList, setLikedList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"desc" | "comments">("desc");

  // Filter out the 3 preloaded doodle objects
  const doodleItems = [
    {
      id: "seed-doodle-1",
      title: "广州塔下的霓虹星星",
      titleEn: "Stars of Canton Tower",
      image: "/src/assets/images/guangzhou_hd_1780401307427.png",
      tag: "🌉 广州回忆",
      bgColor: "from-slate-900/5 to-indigo-900/10",
      tapeColor: "bg-indigo-300/40",
      accent: "#6366f1"
    },
    {
      id: "seed-doodle-2",
      title: "古宇利岛的灿烂花田",
      titleEn: "The Sun-kissed Flower Fields",
      image: "/src/assets/images/flower_hd_1780401321111.png",
      tag: "🌸 冲绳春光",
      bgColor: "from-amber-100/10 to-rose-100/15",
      tapeColor: "bg-amber-300/40",
      accent: "#e11d48"
    },
    {
      id: "seed-doodle-3",
      title: "大头贴里的无忧无虑",
      titleEn: "Silly Smiles in Polaroid",
      image: "/src/assets/images/friends_hd_1780401337409.png",
      tag: "📸 毕业合照",
      bgColor: "from-teal-100/10 to-amber-100/10",
      tapeColor: "bg-emerald-300/40",
      accent: "#0d9488"
    }
  ];

  const currentDoodle = doodleItems[currentIndex];
  // Match with actual database shell item for likes and replies
  const shellData = shells.find(s => s.id === currentDoodle.id) || {
    id: currentDoodle.id,
    content: "",
    english: "",
    likes: 0,
    replies: []
  };

  const handleLike = async () => {
    if (likedList.includes(currentDoodle.id)) return;
    setLikedList(prev => [...prev, currentDoodle.id]);
    await onLike(currentDoodle.id);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const author = isAnonymous ? "匿名旅人" : authorName.trim() || "神秘客";
      await onReply(currentDoodle.id, commentText, author);
      setCommentText("");
      // Keep state clean
      if (!isAnonymous) {
        setAuthorName("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % doodleItems.length);
    setActiveTab("desc");
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + doodleItems.length) % doodleItems.length);
    setActiveTab("desc");
  };

  return (
    <div id="memory-doodle-wall" className="w-full bg-[#FCFBF7] border border-[#E9E4DC] p-6 md:p-8 rounded-sm relative overflow-hidden select-none">
      {/* Crayon scribbles ambient elements / Grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#a38e6d_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Polaroid mock layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Hand Column: Polaroid-styled Crayon Doodle frame with adhesive tape */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-[420px] bg-white p-4 pb-8 border border-[#EADFCB] shadow-[0_8px_20px_rgba(163,142,109,0.15)] rounded-xs transform rotate-[-1deg] hover:rotate-[0deg] transition-all duration-500 group">
            
            {/* Washi Tape Accent */}
            <div className={`absolute -top-3 left-[35%] w-28 h-6 ${currentDoodle.tapeColor} backdrop-blur-[1px] rotate-[2deg] shadow-sm pointer-events-none`} />
            
            {/* Main Picture Frame */}
            <div className="relative aspect-[4/5] bg-slate-900 border border-[#eee] overflow-hidden rounded-xs shadow-inner">
              <img
                src={currentDoodle.image}
                alt={currentDoodle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Colorful Pencil scribble indicators layer */}
              <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-md p-1 px-2.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase text-[#5a4a35] flex items-center gap-1 shadow-sm">
                <Sparkles size={8} className="animate-spin text-[#A38E6D]" />
                {currentDoodle.tag}
              </div>
            </div>

            {/* Handwritten Title and Indicator Area */}
            <div className="mt-5 text-center px-2">
              <h4 className="font-headline-custom text-base font-bold text-text-primary tracking-wide">
                《{currentDoodle.title}》
              </h4>
              <p className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-widest opacity-80">
                {currentDoodle.titleEn}
              </p>
            </div>
            
            {/* Tiny cute markers (crayon heart or star) */}
            <span className="absolute bottom-2 right-4 text-xs select-none opacity-60">✏️ sketch</span>
          </div>

          {/* Simple Bullet Index & Navigation Buttons under Image */}
          <div className="flex items-center gap-5 mt-6">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full border border-border-outline/15 hover:border-[#A38E6D] hover:bg-[#F8F7F2] flex items-center justify-center text-text-primary hover:text-[#A38E6D] transition-colors cursor-pointer active:scale-95"
              title="上一个 / PREV"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5">
              {doodleItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActiveTab("desc");
                  }}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                    currentIndex === idx ? "bg-[#A38E6D] w-4" : "bg-border-outline/20 hover:bg-border-outline/40"
                  }`}
                  title={`记忆 ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full border border-border-outline/15 hover:border-[#A38E6D] hover:bg-[#F8F7F2] flex items-center justify-center text-text-primary hover:text-[#A38E6D] transition-colors cursor-pointer active:scale-95"
              title="下一个 / NEXT"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Hand Column: Bookish/Notebook journaling details containing content or live comments */}
        <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E9E4DC] pt-6 lg:pt-0 lg:pl-10 relative">
          
          <div className="space-y-5 flex-1 flex flex-col">
            {/* Header Tabs for Notebook */}
            <div className="flex border-b border-[#E9E4DC] text-xs">
              <button
                onClick={() => setActiveTab("desc")}
                className={`pb-2 px-4 font-bold tracking-widest uppercase transition-all border-b-2 flex items-center gap-1 px-1.5 cursor-pointer ${
                  activeTab === "desc" 
                    ? "border-[#A38E6D] text-text-primary" 
                    : "border-transparent text-text-muted hover:text-text-primary"
                }`}
              >
                📖 故事手记 / DIARY
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`pb-2 px-4 font-bold tracking-widest uppercase transition-all border-b-2 flex items-center gap-1 px-1.5 relative cursor-pointer ${
                  activeTab === "comments" 
                    ? "border-[#A38E6D] text-text-primary" 
                    : "border-transparent text-text-muted hover:text-text-primary"
                }`}
              >
                💬 温暖回响 / COMMENTS
                {shellData.replies.length > 0 && (
                  <span className="ml-1 bg-[#A38E6D] text-white text-[9px] px-1.5 py-0.2 rounded-full scale-90">
                    {shellData.replies.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab Pane 1: Story Descriptions */}
            <AnimatePresence mode="wait">
              {activeTab === "desc" ? (
                <motion.div
                  key="diary-body"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 space-y-4 font-sans leading-relaxed"
                >
                  <p className="font-headline-custom text-[14.5px] text-text-primary leading-loose tracking-wide whitespace-pre-line text-justify pl-1 border-l-2 border-[#A38E6D]/50">
                    "{shellData.content || currentDoodle.title}"
                  </p>
                  
                  {shellData.english && (
                    <p className="font-mono text-[11px] text-text-muted/80 leading-relaxed italic border-t border-[#A38E6D]/10 pt-3">
                      {shellData.english}
                    </p>
                  )}

                  {/* Aesthetic stamp decoration */}
                  <div className="pt-4 flex items-center justify-between text-[11px] text-text-muted/65 font-mono">
                    <span>🕒 感应时间: {new Date(shellData.timestamp || "").toLocaleDateString("zh-CN")}</span>
                    <span className="border border-[#A38E6D]/30 p-1 px-2 uppercase tracking-widest text-[#A38E6D] rounded-xs select-none">
                      SHORE STATION
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* Tab Pane 2: Comments / Replies scroll room */
                <motion.div
                  key="comments-body"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Commments thread */}
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 flex-1 min-h-[160px]">
                    {shellData.replies && shellData.replies.length > 0 ? (
                      shellData.replies.map((reply) => (
                        <div key={reply.id} className="bg-[#FAF9F5] border border-[#EBE6DC]/80 p-3 rounded-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-[#A38E6D] font-bold">
                            <span className="flex items-center gap-1">
                              <User size={10} />
                              {reply.author}
                            </span>
                            <span className="font-mono text-text-muted/60">
                              {new Date(reply.timestamp).toLocaleDateString("zh-CN")}
                            </span>
                          </div>
                          <p className="text-xs text-text-primary leading-relaxed font-sans pl-3.5">
                            {reply.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center py-6 text-center text-text-muted/70 text-[11.5px] select-none font-sans">
                        <span>💬 潮水安静退去。写下你的微光，留存第一声温暖留言吧。</span>
                      </div>
                    )}
                  </div>

                  {/* Compact reply/comment form inside comments view */}
                  <form onSubmit={handlePostComment} className="border-t border-[#E9E4DC] pt-4 mt-3 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between text-xs">
                      {/* Name input conditional */}
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-text-primary text-[11px] font-bold cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded-xs focus:ring-[#A38E6D] border-[#A38E6D]/30 text-[#A38E6D]"
                          />
                          <span>匿名发表</span>
                        </label>

                        {!isAnonymous && (
                          <motion.input
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 130, opacity: 1 }}
                            type="text"
                            placeholder="自定义笔名（署名）"
                            required
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="border border-[#E9E4DC] bg-[#FFFdfb] text-[11px] p-1 px-2.5 rounded-sm focus:outline-none focus:border-[#A38E6D] text-text-primary font-sans w-32"
                          />
                        )}
                      </div>

                      <span className="font-mono text-[9.5px] text-text-muted opacity-80">
                        * 将漂流到此条留言的洋流中
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="输入你对这枚手记的温柔回响..."
                        required
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-white border border-[#E9E4DC] hover:border-[#A38E6D]/50 focus:border-[#A38E6D] focus:ring-0 p-2 text-xs rounded-sm focus:outline-none text-text-primary font-sans"
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || !commentText.trim()}
                        className="bg-[#A38E6D] hover:bg-[#8F7C5D] text-white p-2 px-3 rounded-sm flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 text-xs font-sans font-bold"
                      >
                        <Send size={11} className="mr-1" />
                        <span>评论</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent Social bar at container bottom (Hearts and Like Trigger) */}
          <div className="mt-6 pt-4 border-t border-[#E9E4DC] flex items-center justify-between text-xs">
            <button
              onClick={handleLike}
              disabled={likedList.includes(currentDoodle.id)}
              className={`flex items-center gap-2 border p-2 px-4 rounded-full transition-all cursor-pointer font-bold select-none ${
                likedList.includes(currentDoodle.id)
                  ? "bg-red-50 text-red-500 border-red-200"
                  : "border-[#EADFCB] hover:border-red-400 hover:bg-red-50/50 text-[#8c7454] hover:text-red-500 active:scale-95"
              }`}
            >
              <Heart size={14} className={likedList.includes(currentDoodle.id) ? "fill-red-500 text-red-500 animate-bounce" : ""} />
              <span>给手记点赞 ({shellData.likes || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === "comments" ? "desc" : "comments")}
              className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors hover:underline text-[11.5px] cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>查看回响 ({shellData.replies.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
