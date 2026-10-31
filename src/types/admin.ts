export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'Published' | 'Draft';
  views: number;
  publishedDate: string;
  image: string;
  author: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
}

export interface AdminCategory {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  articleCount: number;
  color: string;
}

export interface AdminAuthor {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  joinedDate: string;
}

export interface AdminMediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'image' | 'document' | 'video';
  uploadedDate: string;
  dimensions?: string;
}

export interface AdminCommentItem {
  id: string;
  articleId: string;
  articleTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'Approved' | 'Pending' | 'Spam';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Reporter' | 'User';
  status: 'Active' | 'Pending' | 'Banned';
  joinedDate: string;
  articlesCount: number;
}

export interface AdminSubscriber {
  id: string;
  email: string;
  subscribedDate: string;
  status: 'Active' | 'Unsubscribed';
}

export interface AdminActivity {
  id: string;
  type: 'publish' | 'register' | 'comment' | 'subscribe' | 'update';
  title: string;
  detail: string;
  timeAgo: string;
  timestamp: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export type AdminTab =
  | 'dashboard'
  | 'articles'
  | 'categories'
  | 'authors'
  | 'media'
  | 'comments'
  | 'users'
  | 'subscribers'
  | 'notifications'
  | 'analytics'
  | 'reports'
  | 'general-settings'
  | 'website-settings'
  | 'seo'
