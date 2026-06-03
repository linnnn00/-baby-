import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Increase limit to allow base64 uploaded photo attachments
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// In-memory / file-based storage path for emotional shells and market goodies
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "shells.json");
const DATA_MARKET_FILE = path.join(DATA_DIR, "market.json");

interface Shell {
  id: string;
  type: "emotion" | "shell" | "sound";
  title: string;
  content: string;
  english?: string;
  ambientSound?: string; // 'sea_breeze' | 'laughter' | 'whisper' | 'rain'
  image?: string; // Base64 or image url
  timestamp: string;
  likes?: number;
  replies: Array<{
    id: string;
    content: string;
    english?: string;
    author: string; // 'Ocean Echo' | 'Stranger'
    timestamp: string;
  }>;
}

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

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Pre-seeded poetic shells for immediate emotional exchange
const seedShells: Shell[] = [
  {
    id: "seed-1",
    type: "emotion",
    title: "未说出口的话 (Unspoken Feelings)",
    content: "起风了，窗外的树叶沙沙作响。有些未说出口的话，终究只能藏在最深的呼吸里，任由岁月的沙滩将其掩埋。",
    english: "The wind rises, and the leaves rustle outside. Some unspoken words, in the end, can only be buried deep in the silent breath, left to the shifting sands of time.",
    ambientSound: "whisper",
    timestamp: "2026-06-01T09:33:46.744Z",
    replies: [
      {
        id: "reply-seed-1",
        content: "愿风带走你呼吸里的沉重，在某个不经意的清晨，还你一身轻盈与安静的回响。",
        english: "May the wind carry away the weight in your breath, and return to you, on some unexpected morning, an airy lightness and quiet echo.",
        author: "Ocean Echo",
        timestamp: "2026-06-01T13:33:46.744Z"
      }
    ]
  },
  {
    id: "seed-2",
    type: "shell",
    title: "海浪的低语 (The Tide's Keep)",
    content: "希望有一天，你能像海浪拥抱顽固的礁石一样，温柔地接纳并抚平那些深埋心底的遗憾。",
    english: "I hope that one day, you can gently embrace and heal those regrets buried deep inside, just like waves caressing the stubborn coastal reefs.",
    ambientSound: "sea_breeze",
    timestamp: "2026-05-31T09:33:46.744Z",
    replies: []
  },
  {
    id: "seed-3",
    type: "sound",
    title: "笑声的余温 (Echoes of Laughter)",
    content: "如果那个午后的欢笑声能永远储存在这只贝壳里，每当潮水涌起，我都想再次俯身，聆听你毫无防备的快乐。",
    english: "If only the laughter of that sunny afternoon could live forever in this shell. Whenever the tide reaches the shore, I wish to lean close and hear your pure, guarded joy.",
    ambientSound: "laughter",
    timestamp: "2026-06-02T07:33:46.744Z",
    replies: []
  },
  {
    id: "seed-4",
    type: "emotion",
    title: "第101次看日落 (The 101st Sunset)",
    content: "海边的黄昏有一种魔力，能把所有的疲惫拉得和影子一样长，然后悄悄溶进橙红色的海浪里。",
    english: "The seaside dusk possesses a certain magic, stretching all exhaustion as long as shadows, and then quietly dissolving them into the orange waves.",
    ambientSound: "sea_breeze",
    timestamp: "2026-06-02T01:10:00.000Z",
    replies: []
  },
  {
    id: "seed-5",
    type: "sound",
    title: "老旧收音机里的爵士乐 (Late Night Jazz)",
    content: "不知道是谁留下的，深夜潮水退去的时候，我仿佛在微弱的风声里听懂了那首古老爵士乐里的寂寞。",
    english: "Left behind by an unknown soul, when the tide recedes at midnight, I seem to comprehend the deep solitude of that ancient jazz tune from the wind.",
    ambientSound: "whisper",
    timestamp: "2026-06-02T02:15:00.000Z",
    replies: []
  },
  {
    id: "seed-6",
    type: "shell",
    title: "漂流瓶的最后一站 (The Last Drifter)",
    content: "我走了三千公里来到这片海。希望在未来的某一天，在这个最安静的角落，能有一朵浪花带你看到我见过的漫天繁星。",
    english: "I traveled three thousand kilometers to reach this sea. I hope that one day, in this quietest corner, a splash of water will show you the star-lit sky I once beheld.",
    ambientSound: "rain",
    timestamp: "2026-06-01T22:30:00.000Z",
    replies: []
  },
  {
    id: "seed-7",
    type: "emotion",
    title: "离别前的椰子树 (The Farewell Palm)",
    content: "在椰树清凉的阴影下，我们曾一起数过七只飞过海平面的海鸥。如今海鸥依旧，只是数海鸥的你，已在风的另一端。",
    english: "Under the cool shade of palm trees, we once counted seven seagulls flying past the distant horizon. The seagulls remain, but you are now on the other side of the wind.",
    ambientSound: "sea_breeze",
    timestamp: "2026-06-02T03:40:00.000Z",
    replies: []
  },
  {
    id: "seed-8",
    type: "sound",
    title: "倾盆大雨中的白色长椅 (Rainy Bench)",
    content: "雨水打在沙滩上沙沙地响，像情人走在细沙上的足音。那张长椅虽然空着，却装满了整场雨的情话。",
    english: "Raindrops pit-patter against the sandy shore, sounding like a lover's soft steps on the fine beach. The bench stands empty, yet it overflows with all the rainfall's tender whispers.",
    ambientSound: "rain",
    timestamp: "2026-06-02T04:20:00.000Z",
    replies: []
  },
  {
    id: "seed-9",
    type: "shell",
    title: "金黄沙粒里的宝藏 (Golden Grains)",
    content: "不要为明天的迷茫而烦恼，海边的风会吹散黑夜的云。愿你每一次低头，都能在沙粒中拾起自己坚硬而明亮的内核。",
    english: "Worry not for tomorrow's fog; the ocean breeze shall disperse the night clouds. May you find your own sparkling, resilient heart each time you look down.",
    ambientSound: "whisper",
    timestamp: "2026-06-02T05:12:00.000Z",
    replies: []
  },
  {
    id: "seed-10",
    "type": "emotion",
    "title": "初次相遇的晨曦 (The First Dawn)",
    "content": "黎明的第一线微白染湿了海，我忽然想起，你曾说过的，海是没有墙壁的城，只要呼吸，风便能带走任何哀愁。",
    "english": "The first pale sliver of dawn moistens the ocean. I suddenly recall your words: 'The sea is a city without walls; as long as you breathe, the wind will carry away any sorrow.'",
    "ambientSound": "sea_breeze",
    "timestamp": "2026-06-02T06:05:00.000Z",
    "replies": []
  },
  {
    "id": "seed-doodle-1",
    "type": "shell",
    "title": "广州塔下的霓虹星星 (Stars Under Guangzhou Tower)",
    "content": "那时候的广州塔很闪，我们在珠江边，海风夹着初夏的闷热，晚风吹得人有些微醺。你忽然指着亮起的夜空说‘快看！闪亮的小蛮腰！’ 其实，那一刻手心里全是汗的我，一直在看你，没看广州塔。",
    "english": "The Canton Tower was incredibly bright that night. Standing by the Pearl River, the summer breeze made us lightheaded. You suddenly pointed to the illuminating tower and yelled, 'Look!'... But in truth, with sweaty palms, I was only looking at you.",
    "ambientSound": "whisper",
    "timestamp": "2026-06-02T10:10:00.000Z",
    "likes": 88,
    "replies": [
      {
        "id": "reply-doodle-1-1",
        "content": "天哪！太甜了吧，所以现在你们在一起了吗？",
        "author": "草莓软糖",
        "timestamp": "2026-06-02T10:30:00.000Z"
      },
      {
        "id": "reply-doodle-1-2",
        "content": "当时的风一定很温柔。我也好想去广州玩一次！",
        "author": "匿名旅人",
        "timestamp": "2026-06-02T11:00:00.000Z"
      }
    ]
  },
  {
    "id": "seed-doodle-2",
    "type": "emotion",
    "title": "古宇利岛的灿烂花田 (The Radiant Fields of Kouri)",
    "content": "大一那年的春游，正好碰上山坡上开满了不知名的小黄花。我们几个人手拉着手在泥土小路上疯狂奔跑，风吹得衣服鼓鼓的，头发上落了好几片亮黄色的花瓣。那片金黄灿烂的无尽花海，成了我往后无数次疲惫梦里的温暖底色。",
    "english": "During our freshman spring outing, we stumbled upon hills blanketed in nameless little yellow blossoms. We ran hand-in-hand along the quiet dirt path, wind puffing up our clothes, petals catching on our hair. That endless sea of gold became the warm backdrop of my dreams whenever I felt lost.",
    "ambientSound": "laughter",
    "timestamp": "2026-06-02T09:20:00.000Z",
    "likes": 126,
    "replies": [
      {
        "id": "reply-doodle-2-1",
        "content": "好治愈的文字，看到这里仿佛也闻到了春天的味道。",
        "author": "春日信使",
        "timestamp": "2026-06-02T09:40:00.000Z"
      }
    ]
  },
  {
    "id": "seed-doodle-3",
    "type": "sound",
    "title": "大头贴里的无忧无虑 (Silly Smiles in the Polaroid)",
    "content": "大二暑假去冲绳的那次，我们三个人挤在廉价狭小的大头贴机里，做着最滑稽怪诞的鬼脸。相纸慢慢吐出来，我们在背面用签字笔一笔画写下：‘说好了，谁先结婚谁买单哦！’ 现在的我们离得好远好远，但我依然保留着这枚大头贴，照片里的每个人都笑得没有防备。",
    "english": "During our summer trip in sophomore year, we squeezed into a tiny, cheap photo booth, pulling the silliest faces. When the photo slid out, we scribbled on the back: 'Whoever marries first buys dinner!' Today, we are miles apart, but I still keep that little strip. Everyone in it smiles with unguarded joy.",
    "ambientSound": "laughter",
    "timestamp": "2026-06-02T08:15:00.000Z",
    "likes": 152,
    "replies": [
      {
        "id": "reply-doodle-3-1",
        "content": "“谁先结婚谁买单”，哈哈好真实的死党誓言！",
        "author": "冲绳的海风",
        "timestamp": "2026-06-02T08:45:00.000Z"
      },
      {
        "id": "reply-doodle-3-2",
        "content": "太经典了，青春里最珍贵的就是这样毫不做作的朋友了！",
        "author": "一只北极熊",
        "timestamp": "2026-06-02T09:05:00.000Z"
      }
    ]
  }
];

function getShells(): Shell[] {
  try {
    let shellsList: Shell[] = [];
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      shellsList = JSON.parse(raw);
    } else {
      shellsList = [...seedShells];
      fs.writeFileSync(DATA_FILE, JSON.stringify(shellsList, null, 2), "utf-8");
    }
    
    // Ensure all shells have a numeric likes count properly initialized
    let updated = false;
    shellsList.forEach((s, idx) => {
      if (s.likes === undefined) {
        // Seed some high-fidelity, organic likes to pre-populated seeded records
        s.likes = s.id.startsWith("seed") ? Math.floor(12 + (idx * 5) % 35) : 0;
        updated = true;
      }
    });
    if (updated) {
      saveShells(shellsList);
    }
    return shellsList;
  } catch (error) {
    console.error("Failed to read shells:", error);
    return seedShells;
  }
}

function saveShells(shells: Shell[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(shells, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save shells:", error);
  }
}

// Pre-seeded market items with emotional stories and hand-drawn styling images
const seedMarketItems: MarketItem[] = [
  {
    id: "market-1",
    title: "陪伴我高中三年的耳机",
    owner: "小陈",
    story: "这是陪伴了我高中三年的耳机，它塞满了无数个微光闪烁的深夜，听过贝多芬和英语听力，也听过少年的秘密心跳。如今它依旧能唱歌，我想把它传递给下一个需要力量的人。",
    suggestedOriginalPrice: 80,
    deliveryMethod: "online",
    deliveryDetail: "通过线上邮寄发送给您，包邮并赠送我手绘的手画书签明信片一张。",
    image: "/src/assets/images/handdrawn_headphones_1780450469139.png",
    status: "available",
    views: 128,
    timestamp: "2026-06-01T15:30:00.000Z",
    bids: [
      {
        id: "bid-1",
        bidder: "星光寄信人",
        suggestedPrice: 90,
        comment: "高中三年的回忆是珍贵的，听英语听力也伴着对未来的期盼。我认为它值得 90 贝币！",
        timestamp: "2026-06-01T16:00:00.000Z"
      },
      {
        id: "bid-2",
        bidder: "风中旅者",
        suggestedPrice: 95,
        comment: "想起我做模拟卷的时光了，我也想戴着耳机听听你当时度过深夜的那段安宁，为你出价 95 贝币！",
        timestamp: "2026-06-01T17:42:00.000Z"
      }
    ]
  },
  {
    id: "market-2",
    title: "高考备战的英语词典",
    owner: "阿林",
    story: "这是我高考备战的英语词典，封皮都已经磨损脱线，里面的每一个折角和红笔注记，都写满了那些披星戴月的决心。希望这本带有“金榜题名”好运的字典，能够继续托举下一位筑梦的学子！",
    suggestedOriginalPrice: 30,
    deliveryMethod: "offline",
    deliveryDetail: "建议在广州大学城当面自提核销交接，我带给你，椰子树下一起聊聊备考小经验吧！",
    image: "/src/assets/images/postcard_one_1780396511812.png",
    status: "available",
    views: 115,
    timestamp: "2026-06-02T09:12:00.000Z",
    bids: [
      {
        id: "bid-3",
        bidder: "高三冲刺小章",
        suggestedPrice: 40,
        comment: "带有学长拼搏精神和好运气，我出价 40 贝币！希望我也能像学长一样考上心仪的大学！",
        timestamp: "2026-06-02T10:15:00.000Z"
      }
    ]
  },
  {
    id: "market-3",
    title: "我养了三个月的温暖盆栽",
    owner: "小草",
    story: "这是我养了三个月的盆栽，它的嫩芽在清晨的阳光里舒展开，见证了我最艰难时的每一次默默忍耐和细微成长。它非常好养，希望它能每天为你奉献一点绿色的生机，治愈你的焦虑。",
    suggestedOriginalPrice: 45,
    deliveryMethod: "offline",
    deliveryDetail: "由于盆栽娇弱，建议在广州海珠艺术创意集市现场线下核销领取，配送一个手绘的素烧陶盆。",
    image: "/src/assets/images/handdrawn_plant_1780450485452.png",
    status: "available",
    views: 89,
    timestamp: "2026-06-02T11:00:00.000Z",
    bids: []
  },
  {
    id: "market-4",
    title: "我考研时用的小书桌",
    owner: "学姐",
    story: "这是我考研的时候用的小书桌，无数张草稿纸和干涸的墨水瓶堆缩在一角，它承载了我那年冬天最宁静、也最炽热的梦想。桌面上还写着‘一战成硕’。如今我成功上岸了，希望传递这张好运小书桌。",
    suggestedOriginalPrice: 150,
    deliveryMethod: "offline",
    deliveryDetail: "桌子偏重，只限线下提货（可在广州大学城宿舍自提核销），附赠我考研全科目复习框架脑图一份！",
    image: "/src/assets/images/postcard_two_1780396523160.png",
    status: "available",
    views: 245,
    timestamp: "2026-06-01T08:20:00.000Z",
    bids: [
      {
        id: "bid-4",
        bidder: "研友冲冲冲",
        suggestedPrice: 160,
        comment: "太需要学姐的上岸秘籍和好运书桌了，出 160 贝币，上门自提！祝学姐研究生生涯更出彩！",
        timestamp: "2026-06-01T09:00:00.000Z"
      }
    ]
  },
  {
    id: "market-5",
    title: "我手工折叠的第100个千纸鹤",
    owner: "千纸鹤女孩",
    story: "这是我叠的第100个千纸鹤，每一个纸褶里都藏着一个不曾说出口的祈愿。叠完这只，我终于和往日的困惑握手言和。它折射的是纯真与前行的勇气，希望在岁月的信风里吹向你。",
    suggestedOriginalPrice: 99,
    deliveryMethod: "online",
    deliveryDetail: "精致水晶瓶封装并进行线上邮寄寄送，附赠一封手写悄悄话信件。",
    image: "/src/assets/images/handdrawn_crane_1780450500734.png",
    status: "available",
    views: 92,
    timestamp: "2026-06-02T14:45:00.000Z",
    bids: []
  },
  {
    id: "market-6",
    title: "我做了一整学期的毕业设计作品",
    owner: "设计系小章",
    story: "这是我做了一学期的设计作品。为了它的比例、色彩和材质我度过了无数个不眠之夜，每一个像素和触感都曾倾注爱意。如今毕业展落幕，我想为它寻找一个共鸣的知音，而不是让其在角落落灰。",
    suggestedOriginalPrice: 199,
    deliveryMethod: "online",
    deliveryDetail: "通过防震加固泡沫盒线上邮寄购买发送，如需可视频讲解作品灵感设计图哦。",
    image: "/src/assets/images/flower_hd_1780401321111.png",
    status: "available",
    views: 312,
    timestamp: "2026-05-30T10:00:00.000Z",
    bids: [
      {
        id: "bid-5",
        bidder: "大写意策展人",
        suggestedPrice: 210,
        comment: "太好看了！手绘线条和颜色冲击很棒，强烈出价 210 贝币支持学弟/学妹，期待与美好的艺术品相遇！",
        timestamp: "2026-05-30T10:30:00.000Z"
      }
    ]
  }
];

function getMarketItems(): MarketItem[] {
  try {
    if (fs.existsSync(DATA_MARKET_FILE)) {
      const raw = fs.readFileSync(DATA_MARKET_FILE, "utf-8");
      return JSON.parse(raw);
    } else {
      fs.writeFileSync(DATA_MARKET_FILE, JSON.stringify(seedMarketItems, null, 2), "utf-8");
      return seedMarketItems;
    }
  } catch (error) {
    console.error("Failed to read market goods:", error);
    return seedMarketItems;
  }
}

function saveMarketItems(items: MarketItem[]) {
  try {
    fs.writeFileSync(DATA_MARKET_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save market goods:", error);
  }
}

// Lazy Gemini API Client Initialization
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not set. Using beautiful pre-set replies.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Get all shells
app.get("/api/shells", (req, res) => {
  res.json(getShells());
});

// API: Create a new shell
app.post("/api/shells", (req, res) => {
  const { type, content, english, ambientSound, image } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const newShell: Shell = {
    id: "shell-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
    type: type || "shell",
    title: type === "emotion" ? "留下情绪" : type === "sound" ? "收藏声音" : "海浪贝壳",
    content,
    english: english || "",
    ambientSound: ambientSound || "sea_breeze",
    image: image || "",
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: []
  };

  const shells = getShells();
  shells.unshift(newShell);
  saveShells(shells);

  res.json(newShell);
});

// GET: All market items
app.get("/api/market", (req, res) => {
  res.json(getMarketItems());
});

// POST: Create a new market item
app.post("/api/market", (req, res) => {
  const { title, owner, story, suggestedOriginalPrice, deliveryMethod, deliveryDetail, image } = req.body;
  if (!title || !story || !suggestedOriginalPrice) {
    return res.status(400).json({ error: "Title, story and emotional price are required" });
  }

  const newItem: MarketItem = {
    id: "market-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
    title,
    owner: owner || "神秘宝贝主",
    story,
    suggestedOriginalPrice: Number(suggestedOriginalPrice),
    deliveryMethod: deliveryMethod || "online",
    deliveryDetail: deliveryDetail || "",
    image: image || "",
    status: "available",
    views: 1,
    timestamp: new Date().toISOString(),
    bids: []
  };

  const items = getMarketItems();
  items.unshift(newItem);
  saveMarketItems(items);

  res.json(newItem);
});

// POST: Bid on a market item (Emotion Auction Price feedback comment)
app.post("/api/market/:id/bid", (req, res) => {
  const { id } = req.params;
  const { bidder, suggestedPrice, comment } = req.body;

  if (!bidder || !suggestedPrice || !comment) {
    return res.status(400).json({ error: "Bidder name, price note, and comment review are required" });
  }

  const items = getMarketItems();
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Market item was not found" });
  }

  const newBid: Bid = {
    id: "bid-" + Date.now(),
    bidder,
    suggestedPrice: Number(suggestedPrice),
    comment,
    timestamp: new Date().toISOString()
  };

  items[index].bids.push(newBid);
  // Also slightly increment view counts on activity
  items[index].views += 1;
  saveMarketItems(items);

  res.json(items[index]);
});

// POST: Buy a market item
app.post("/api/market/:id/buy", (req, res) => {
  const { id } = req.params;
  const items = getMarketItems();
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Market item was not found" });
  }

  if (items[index].status === "sold") {
    return res.status(400).json({ error: "This item has already been successfully purchased!" });
  }

  items[index].status = "sold";
  saveMarketItems(items);

  res.json(items[index]);
});

// POST: Increment view count
app.post("/api/market/:id/view", (req, res) => {
  const { id } = req.params;
  const items = getMarketItems();
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items[index].views += 1;
    saveMarketItems(items);
  }
  res.json({ success: true });
});

// API: Like a shell
app.post("/api/shells/:id/like", (req, res) => {
  const { id } = req.params;
  const shells = getShells();
  const index = shells.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Shell not found" });
  }

  shells[index].likes = (shells[index].likes || 0) + 1;
  saveShells(shells);

  res.json(shells[index]);
});

// API: Reply to a shell
app.post("/api/shells/:id/reply", (req, res) => {
  const { id } = req.params;
  const { content, english, author } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Reply content is required" });
  }

  const shells = getShells();
  const shellIndex = shells.findIndex(s => s.id === id);

  if (shellIndex === -1) {
    return res.status(404).json({ error: "Shell not found" });
  }

  const newReply = {
    id: "reply-" + Date.now(),
    content,
    english: english || "",
    author: author || "Stranger",
    timestamp: new Date().toISOString()
  };

  shells[shellIndex].replies.push(newReply);
  saveShells(shells);

  res.json(shells[shellIndex]);
});

// API: Generate Poetic Echo using Gemini AI
app.post("/api/shells/echo", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // Elegant system-generated fallback when no key is set
    const fallbacks = [
      {
        replyCn: "倾听在宁静的波涛中。你的话语像潮汐般在沙滩留下痕迹，虽会被带走，却已在海的心中留下久远的余响。",
        replyEn: "Listening in the calm waves. Your words leave marks in the sand like tides, though swept away, they linger as a quiet resonance in the ocean's depth."
      },
      {
        replyCn: "贝壳把声音收藏，不叫它流离。愿每一片轻风都带有治愈的咸意，拂去你衣襟上的沉重心绪。",
        replyEn: "The shell gathers your voice, letting it wander no more. May every breeze carry a healing saltiness, lifting the heavy burdens from your shoulders."
      },
      {
        replyCn: "生命里的那些没有说出口的话，都在海风中找到了栖息的树梢。无需着急，某一天它会以温柔的雨落回你手中。",
        replyEn: "Unsaid chapters of life find branches to perch on within the sea winds. There is no rush; one day, they will return to you as gentle rainfall."
      }
    ];
    const randomIndex = Math.floor(Math.random() * fallbacks.length);
    return res.json(fallbacks[randomIndex]);
  }

  try {
    const ai = getGemini();
    const systemPrompt = `You are a delicate, soulful empathetic Ocean Spirit (Whisper of the Ocean) for a romantic, vintage poetic shell website named "Finding Baby". 
The user is entrusting their deepest unspoken feeling, heavy emotion, or memories with you.
Analyze their sentiment, then respond as a poetic, wise, comforting companion with an atmospheric, beautiful response.
Keep your response short (under 90 words in Chinese, with an elegant English translation). Use imagery of the ocean, sand, sea breeze, light, dawn, or stars. 
Your tone must be deeply human, warm, and highly artistic (like high-end literature). Avoid any cliché AI helper words like '当然', '我可以帮您', etc.

You MUST respond strictly in a valid JSON string containing two fields: "replyCn" and "replyEn". Example:
{
  "replyCn": "有些风不求终点，只是路过你的树叶。愿这声轻叹随潮汐退去，在深海绽成宁静的温光。",
  "replyEn": "Some winds seek no destination, only passing your leaves. May this sigh fade with the tide, blooming as still light in the deep ocean."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `The user's entrusted message is: "${content}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.9,
      }
    });

    const resultText = response.text || "";
    const parsed = JSON.parse(resultText.trim());
    res.json(parsed);

  } catch (error: any) {
    console.error("Gemini integration error:", error);
    res.status(500).json({
      error: "The ocean is deep and quiet right now.",
      replyCn: "海浪此时深邃而宁静。有些情绪，不言语亦是最好的托付。",
      replyEn: "The ocean is deep and silent right now. Some feelings are best left to the silence of the undercurrents."
    });
  }
});


// Start Dev Server or Production configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Finding Baby server running on http://localhost:${PORT}`);
  });
}

startServer();
