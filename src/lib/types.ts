export interface Item {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  purchaseUrl: string;
  categoryId: string;
  emoji: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export type ItemStatus = "sufficient" | "low" | "out";

export interface UserProfile {
  name: string;
  avatarUrl: string;
  isLoggedIn: boolean;
  uid?: string;
  email?: string;
}
