export interface Reply {
  id: string;
  content: string;
  english?: string;
  author: string;
  timestamp: string;
}

export interface ShellItem {
  id: string;
  type: "emotion" | "shell" | "sound";
  title: string;
  content: string;
  english?: string;
  ambientSound?: "sea_breeze" | "laughter" | "whisper" | "rain";
  timestamp: string;
  likes?: number;
  replies: Reply[];
}

export interface EchoReply {
  replyCn: string;
  replyEn: string;
}
