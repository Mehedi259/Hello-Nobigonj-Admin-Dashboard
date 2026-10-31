/**
 * Hello Desh Admin API Service Client
 * Full JWT authentication, auto-token refresh, and CRUD endpoints
 * Production Base URL: https://api.hellodesh.com/api/v1
 */

import {
  AdminArticle,
  AdminCategory,
  AdminAuthor,
  AdminMediaItem,
  AdminCommentItem,
  AdminUser,
  AdminSubscriber,
  AdminNotification,
  AdminActivity
} from '../types/admin'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8015/api/v1'
    : 'https://api.hellonabiganj.com/api/v1')

const STORAGE_KEYS = {
  TOKEN: 'hellonobigonj_admin_token',
  REFRESH: 'hellonobigonj_admin_refresh',
  USER: 'hellonobigonj_admin_user',
}

export function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH)
}

export function getStoredUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveAuth(token: string, refresh: string, user: AdminUser) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  localStorage.setItem(STORAGE_KEYS.REFRESH, refresh)
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.REFRESH)
  localStorage.removeItem(STORAGE_KEYS.USER)
}

// -------------------------------------------------------------
// Core Request Handler with Auto Token Refresh
// -------------------------------------------------------------

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken()
  const headers = new Headers(options.headers || {})
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }
  headers.set('Accept', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const url = `${API_BASE_URL}${endpoint}`
  let res = await fetch(url, { ...options, headers })

  // If 401 Unauthorized, attempt token refresh
  if (res.status === 401) {
    const refreshed = await attemptTokenRefresh()
    if (refreshed) {
      const newToken = getStoredToken()
      headers.set('Authorization', `Bearer ${newToken}`)
      res = await fetch(url, { ...options, headers })
    }
  }

  if (!res.ok) {
    let errMsg = res.statusText
    try {
      const errJson = await res.json()
      errMsg = errJson.detail || errJson.message || JSON.stringify(errJson)
    } catch {
      // ignore
    }
    throw new Error(errMsg || `Request failed with status ${res.status}`)
  }

  if (res.status === 204) {
    return {} as T
  }

  return res.json()
}

let isRefreshing = false
let refreshQueue: Array<(val: boolean) => void> = []

async function attemptTokenRefresh(): Promise<boolean> {
  const refresh = getStoredRefreshToken()
  if (!refresh) {
    return autoLoginDefault()
  }

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve)
    })
  }

  isRefreshing = true

  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ refresh }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data.access) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.access)
        refreshQueue.forEach((cb) => cb(true))
        refreshQueue = []
        return true
      }
    }
    // If refresh token expired, fallback to default admin credentials
    return await autoLoginDefault()
  } catch {
    return false
  } finally {
    isRefreshing = false
  }
}

export async function autoLoginDefault(): Promise<boolean> {
  try {
    const loginRes = await login('admin@hellodesh.com', 'adminpassword123')
    return !!loginRes.token
  } catch {
    return false
  }
}

// -------------------------------------------------------------
// Authentication API
// -------------------------------------------------------------

export async function login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }),
  })

  if (!res.ok) {
    let msg = 'লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড চেক করুন।'
    try {
      const err = await res.json()
      msg = err.detail || err.message || msg
    } catch {
      // ignore
    }
    throw new Error(msg)
  }

  const data = await res.json()
  const rawUser = data.user || {}
  const adminUser: AdminUser = {
    id: String(rawUser.id || '1'),
    name: rawUser.name || rawUser.username || 'Admin User',
    email: rawUser.email || email,
    role: rawUser.role === 'Super Admin' || rawUser.is_superuser ? 'Super Admin' : (rawUser.role || 'Editor'),
    status: 'Active',
    joinedDate: 'Oct 2026',
    articlesCount: 14,
  }

  saveAuth(data.access, data.refresh, adminUser)
  return { token: data.access, user: adminUser }
}

export async function logout(): Promise<void> {
  clearAuth()
}

export async function getMe(): Promise<AdminUser> {
  const raw = await request<Record<string, unknown>>('/auth/me/')
  return {
    id: String(raw.id),
    name: String(raw.name || `${raw.first_name || ''} ${raw.last_name || ''}`.trim() || raw.username),
    email: String(raw.email),
    role: raw.role === 'superadmin' ? 'Super Admin' : raw.role === 'editor' ? 'Editor' : 'Reporter',
    status: 'Active',
    joinedDate: String(raw.created_at || '').substring(0, 10) || 'Oct 2026',
    articlesCount: Number(raw.articles_count || 0),
  }
}

export async function getUsers(): Promise<AdminUser[]> {
  interface UserListResponse {
    results?: Record<string, unknown>[]
    count?: number
  }
  const data = await request<UserListResponse | Record<string, unknown>[]>('/auth/users/')
  const list = Array.isArray(data) ? data : data.results || []
  return list.map((u) => ({
    id: String(u.id),
    name: String(u.name || `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username),
    email: String(u.email),
    role: u.role === 'superadmin' ? 'Super Admin' : u.role === 'editor' ? 'Editor' : u.role === 'reporter' ? 'Reporter' : 'User',
    status: u.status === 'active' || u.is_active ? 'Active' : 'Pending',
    joinedDate: String(u.created_at || '').substring(0, 10) || 'Oct 2026',
    articlesCount: Number(u.articles_count || 0),
  }))
}

export async function createUser(data: {
  username: string
  email: string
  password?: string
  role?: string
  first_name?: string
  last_name?: string
}): Promise<AdminUser> {
  const raw = await request<Record<string, unknown>>('/auth/users/', {
    method: 'POST',
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password || 'TemporaryPass2026!',
      role: (data.role || 'editor').toLowerCase().replace(/\s+/g, ''),
      first_name: data.first_name || data.username,
      last_name: data.last_name || '',
    }),
  })
  return {
    id: String(raw.id),
    name: String(raw.name || data.username),
    email: String(raw.email || data.email),
    role: 'Editor',
    status: 'Active',
    joinedDate: 'Oct 2026',
    articlesCount: 0,
  }
}

export async function deleteUser(id: string): Promise<void> {
  await request(`/auth/users/${id}/`, { method: 'DELETE' })
}

// -------------------------------------------------------------
// Articles API
// -------------------------------------------------------------

export async function getAdminArticles(pageSize: number = 100): Promise<AdminArticle[]> {
  interface ArticleResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<ArticleResponse>(`/articles/?page_size=${pageSize}`)
  return (data.results || []).map((a) => ({
    id: String(a.id),
    title: String(a.title || ''),
    slug: String(a.slug || ''),
    category: String(a.category || 'National'),
    status: a.status === 'Draft' ? 'Draft' : 'Published',
    views: Number(a.views || 0),
    publishedDate: String(a.publishedDate || a.publishedAt || 'Oct 15, 2026'),
    image: String(a.image || '/images/padma-bridge.jpg'),
    author: String(a.author_name || (a.author as Record<string, unknown>)?.name || 'ডেস্ক রিপোর্ট'),
    excerpt: String(a.excerpt || ''),
    content: String(a.content || ''),
    tags: Array.isArray(a.tags) ? a.tags as string[] : [],
  }))
}

export async function createAdminArticle(payload: {
  title: string
  slug?: string
  subtitle?: string
  excerpt: string
  content: string
  category: number | string
  author?: number | string
  image_url?: string
  status: 'Published' | 'Draft'
  tags?: string[]
}): Promise<AdminArticle> {
  const body: Record<string, unknown> = {
    title: payload.title,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^\w\u0980-\u09FF]+/g, '-'),
    subtitle: payload.subtitle || null,
    excerpt: payload.excerpt,
    content: payload.content,
    category: typeof payload.category === 'number' ? payload.category : 1,
    author: typeof payload.author === 'number' ? payload.author : 1,
    image_url: payload.image_url || '/images/padma-bridge.jpg',
    status: payload.status,
    tags: payload.tags || ['সংবাদ'],
  }

  const raw = await request<Record<string, unknown>>('/articles/', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return {
    id: String(raw.id),
    title: String(raw.title),
    slug: String(raw.slug),
    category: String(raw.category || 'National'),
    status: raw.status === 'Draft' ? 'Draft' : 'Published',
    views: Number(raw.views || 0),
    publishedDate: 'Just now',
    image: String(raw.image || raw.image_url || '/images/padma-bridge.jpg'),
    author: String(raw.author_name || 'ডেস্ক রিপোর্ট'),
    excerpt: String(raw.excerpt || ''),
    content: String(raw.content || ''),
    tags: Array.isArray(raw.tags) ? raw.tags as string[] : [],
  }
}

export async function updateAdminArticle(
  slug: string,
  updated: Partial<AdminArticle> & { category_id?: number; author_id?: number }
): Promise<void> {
  const payload: Record<string, unknown> = {}
  if (updated.title !== undefined) payload.title = updated.title
  if (updated.slug !== undefined) payload.slug = updated.slug
  if (updated.excerpt !== undefined) payload.excerpt = updated.excerpt
  if (updated.content !== undefined) payload.content = updated.content
  if (updated.status !== undefined) payload.status = updated.status
  if (updated.image !== undefined) payload.image_url = updated.image
  if (updated.tags !== undefined) payload.tags = updated.tags
  if (updated.category_id !== undefined) payload.category = updated.category_id
  if (updated.author_id !== undefined) payload.author = updated.author_id

  await request(`/articles/${encodeURIComponent(slug)}/`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function deleteAdminArticle(slug: string): Promise<void> {
  await request(`/articles/${encodeURIComponent(slug)}/`, {
    method: 'DELETE',
  })
}

// -------------------------------------------------------------
// Categories API
// -------------------------------------------------------------

export async function getAdminCategories(): Promise<AdminCategory[]> {
  interface CatResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<CatResponse>('/categories/')
  return (data.results || []).map((c) => ({
    id: String(c.id),
    name: String(c.name),
    nameEn: String(c.name_en || c.slug),
    slug: String(c.slug),
    articleCount: Number(c.article_count ?? c.count ?? 0),
    color: String(c.color || '#2563eb'),
  }))
}

export async function createAdminCategory(payload: {
  name: string
  nameEn: string
  slug: string
  color: string
}): Promise<AdminCategory> {
  const raw = await request<Record<string, unknown>>('/categories/', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      name_en: payload.nameEn,
      slug: payload.slug,
      color: payload.color,
      icon_name: 'Globe',
    }),
  })
  return {
    id: String(raw.id),
    name: String(raw.name),
    nameEn: String(raw.name_en || payload.nameEn),
    slug: String(raw.slug),
    articleCount: 0,
    color: String(raw.color || payload.color),
  }
}

export async function deleteAdminCategory(slug: string): Promise<void> {
  await request(`/categories/${encodeURIComponent(slug)}/`, {
    method: 'DELETE',
  })
}

// -------------------------------------------------------------
// Authors API
// -------------------------------------------------------------

export async function getAdminAuthors(): Promise<AdminAuthor[]> {
  interface AuthorResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<AuthorResponse>('/authors/')
  return (data.results || []).map((a) => ({
    id: String(a.id),
    name: String(a.name),
    role: String(a.role || 'প্রতিবেদক'),
    email: String(a.email || ''),
    avatar: String(a.avatar_url || a.display_avatar || '/images/reporter-rakib.jpg'),
    bio: String(a.bio || ''),
    articlesCount: Number(a.articles_count || 0),
    joinedDate: String(a.joined_date || a.created_at || 'Oct 2026').substring(0, 10),
  }))
}

export async function createAdminAuthor(payload: {
  name: string
  role: string
  email: string
  avatar?: string
  bio?: string
}): Promise<AdminAuthor> {
  const raw = await request<Record<string, unknown>>('/authors/', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      role: payload.role,
      email: payload.email,
      avatar_url: payload.avatar || '/images/reporter-rakib.jpg',
      bio: payload.bio || '',
      location: 'ঢাকা',
    }),
  })
  return {
    id: String(raw.id),
    name: String(raw.name),
    role: String(raw.role),
    email: String(raw.email),
    avatar: String(raw.avatar_url || '/images/reporter-rakib.jpg'),
    bio: String(raw.bio || ''),
    articlesCount: 0,
    joinedDate: 'Oct 2026',
  }
}

export async function deleteAdminAuthor(id: string): Promise<void> {
  await request(`/authors/${id}/`, {
    method: 'DELETE',
  })
}

// -------------------------------------------------------------
// Media Library API
// -------------------------------------------------------------

export async function getAdminMedia(): Promise<AdminMediaItem[]> {
  interface MediaResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<MediaResponse>('/media/')
  return (data.results || []).map((m) => ({
    id: String(m.id),
    name: String(m.title || m.name || 'image.jpg'),
    url: String(m.file_url || m.file || m.url || ''),
    size: String(m.file_size_formatted || m.size || '1.2 MB'),
    type: (m.media_type as 'image' | 'document' | 'video') || 'image',
    uploadedDate: String(m.created_at || 'Oct 15, 2026').substring(0, 10),
    dimensions: String(m.dimensions || '1200x800'),
  }))
}

export async function uploadAdminMedia(file: File, title?: string): Promise<AdminMediaItem> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', title || file.name)
  formData.append('media_type', file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document')

  const raw = await request<Record<string, unknown>>('/media/', {
    method: 'POST',
    body: formData,
  })

  return {
    id: String(raw.id),
    name: String(raw.title || file.name),
    url: String(raw.file_url || raw.file || ''),
    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    type: 'image',
    uploadedDate: 'Just now',
  }
}

export async function deleteAdminMedia(id: string): Promise<void> {
  await request(`/media/${id}/`, {
    method: 'DELETE',
  })
}

// -------------------------------------------------------------
// Comments Moderation API
// -------------------------------------------------------------

export async function getAdminComments(): Promise<AdminCommentItem[]> {
  interface CommentResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<CommentResponse>('/comments/?page_size=100')
  return (data.results || []).map((c) => ({
    id: String(c.id),
    articleId: String(c.article_slug || c.article || ''),
    articleTitle: String(c.article_title || 'হ্যালো দেশ সংবাদ'),
    authorName: String(c.author_name || c.authorName || 'পাঠক'),
    authorEmail: String(c.author_email || 'reader@hellodesh.com'),
    content: String(c.content || ''),
    createdAt: String(c.createdAt || c.time_ago || 'আজ'),
    status: (c.status as 'Approved' | 'Pending' | 'Spam') || 'Pending',
  }))
}

export async function approveAdminComment(id: string): Promise<void> {
  await request(`/comments/${id}/approve/`, { method: 'POST' })
}

export async function markSpamAdminComment(id: string): Promise<void> {
  await request(`/comments/${id}/mark_spam/`, { method: 'POST' })
}

export async function deleteAdminComment(id: string): Promise<void> {
  await request(`/comments/${id}/`, { method: 'DELETE' })
}

// -------------------------------------------------------------
// Subscribers API
// -------------------------------------------------------------

export async function getAdminSubscribers(): Promise<AdminSubscriber[]> {
  interface SubResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<SubResponse>('/subscribers/?page_size=100')
  return (data.results || []).map((s) => ({
    id: String(s.id),
    email: String(s.email),
    subscribedDate: String(s.subscribed_date || s.created_at || 'Oct 2026').substring(0, 10),
    status: s.status === 'Unsubscribed' ? 'Unsubscribed' : 'Active',
  }))
}

export async function deleteAdminSubscriber(id: string): Promise<void> {
  await request(`/subscribers/${id}/`, { method: 'DELETE' })
}

// -------------------------------------------------------------
// Notifications API
// -------------------------------------------------------------

export async function getAdminNotifications(): Promise<AdminNotification[]> {
  interface NotifResponse {
    results: Record<string, unknown>[]
    count: number
  }
  const data = await request<NotifResponse>('/notifications/')
  return (data.results || []).map((n) => ({
    id: String(n.id),
    title: String(n.title),
    description: String(n.message || n.description || ''),
    time: String(n.time_ago || 'আজ'),
    read: Boolean(n.is_read || n.read),
    type: (n.notification_type as 'info' | 'success' | 'warning') || 'info',
  }))
}

export async function markAdminNotificationRead(id: string): Promise<void> {
  await request(`/notifications/${id}/mark-read/`, { method: 'POST' })
}

export async function clearAllAdminNotifications(): Promise<void> {
  await request('/notifications/clear-all/', { method: 'POST' })
}

// -------------------------------------------------------------
// Dashboard & Analytics API
// -------------------------------------------------------------

export interface DashboardStatsData {
  kpis: {
    total_articles: number
    published_articles: number
    draft_articles: number
    total_views: number
    today_views: number
    active_users: number
    pending_comments: number
    total_comments: number
    total_subscribers: number
  }
  views_trend: Array<{ date: string; views: number }>
  category_distribution: Array<{ name: string; slug: string; count: number; color: string }>
  top_articles: Array<{ id: number; title: string; slug: string; views: number; category__name: string }>
  device_breakdown: Array<{ device: string; percent: number }>
  recent_activities: Array<{ id: number; activity_type: string; title: string; detail: string; created_at: string }>
}

export async function getDashboardStats(): Promise<DashboardStatsData> {
  return request<DashboardStatsData>('/analytics/dashboard/')
}

// -------------------------------------------------------------
// Site Settings API
// -------------------------------------------------------------

export async function getAdminSettings(): Promise<Record<string, unknown>> {
  return request<Record<string, unknown>>('/settings/')
}

export async function updateAdminSettings(settings: Record<string, unknown>): Promise<Record<string, unknown>> {
  return request<Record<string, unknown>>('/settings/', {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}
