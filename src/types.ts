export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  linkText?: string;
  linkHref?: string;
  span?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarLetter: string;
  rating: number;
  content: string;
}
