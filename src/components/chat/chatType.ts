export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export interface Conversation {
  id: string;
  username: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unread?: boolean;
}
