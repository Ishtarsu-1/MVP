export type FeedItem = {
  id: string;
  title: string;
  author: string;
  sub: string;
  score: number;
  commentsCount: number;
  createdAt: string; // ISO
  thumbnail?: string;
  url?: string;
  isPinned?: boolean;
};