// Fix for 'erasableSyntaxOnly': Use const object instead of enum
export const Role = {
  CLIENT: "CLIENT",
  FREELANCER: "FREELANCER",
  ADMIN: "ADMIN"
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface AuthResponse {
  token: string;
  role: Role;
  userId: number;
  fullName: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  clientId: number;
  clientName: string;
}

export interface Message {
  id: number;
  messageText: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  projectId: number;
  timestamp: string;
}

// --- NEW TYPES ---

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface ProjectRequest {
  title: string;
  description: string;
  budget: number;
}

export interface ChatConversation {
  projectId: number;
  projectTitle: string;
  otherUserId: number;
  otherUserName: string;
  lastMessage: string;
}

export interface SendMessageRequest {
  projectId: number;
  receiverId: number;
  messageText: string;
}