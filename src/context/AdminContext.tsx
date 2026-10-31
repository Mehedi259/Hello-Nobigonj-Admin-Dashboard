import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  AdminArticle,
  AdminCategory,
  AdminAuthor,
  AdminMediaItem,
  AdminCommentItem,
  AdminUser,
  AdminSubscriber,
  AdminActivity,
  AdminNotification,
  AdminTab
} from '../types/admin'
import {
  INITIAL_ADMIN_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_AUTHORS,
  INITIAL_MEDIA,
  INITIAL_COMMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS
} from '../data/mockAdminData'
import {
  login as apiLogin,
  logout as apiLogout,
  getStoredUser,
  autoLoginDefault,
  getAdminArticles,
  createAdminArticle,
  updateAdminArticle,
  deleteAdminArticle,
  getAdminCategories,
  createAdminCategory,
  deleteAdminCategory,
  getAdminAuthors,
  createAdminAuthor,
  deleteAdminAuthor,
  getAdminMedia,
  deleteAdminMedia,
  getAdminComments,
  approveAdminComment,
  markSpamAdminComment,
  deleteAdminComment,
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  getAdminSubscribers,
  deleteAdminSubscriber,
  getAdminNotifications,
  markAdminNotificationRead,
  clearAllAdminNotifications,
  getDashboardStats,
  DashboardStatsData
} from '../services/api'

interface AdminContextType {
  currentTab: AdminTab
  setCurrentTab: (tab: AdminTab) => void
  currentUser: AdminUser | null
  login: (email: string, pass: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  articles: AdminArticle[]
  addArticle: (article: Omit<AdminArticle, 'id' | 'views' | 'publishedDate'>) => Promise<void>
  updateArticle: (id: string, updated: Partial<AdminArticle>) => Promise<void>
  deleteArticle: (id: string) => Promise<void>
  toggleArticleStatus: (id: string) => Promise<void>
  editingArticle: AdminArticle | null
  setEditingArticle: (art: AdminArticle | null) => void
  isEditArticleOpen: boolean
  setIsEditArticleOpen: (open: boolean) => void
  categories: AdminCategory[]
  addCategory: (cat: Omit<AdminCategory, 'id' | 'articleCount'>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  authors: AdminAuthor[]
  addAuthor: (author: Omit<AdminAuthor, 'id' | 'articlesCount' | 'joinedDate'>) => Promise<void>
  deleteAuthor: (id: string) => Promise<void>
  mediaList: AdminMediaItem[]
  addMedia: (item: Omit<AdminMediaItem, 'id' | 'uploadedDate'>) => Promise<void>
  deleteMedia: (id: string) => Promise<void>
  comments: AdminCommentItem[]
  updateCommentStatus: (id: string, status: 'Approved' | 'Pending' | 'Spam') => Promise<void>
  deleteComment: (id: string) => Promise<void>
  users: AdminUser[]
  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'articlesCount'>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  subscribers: AdminSubscriber[]
  deleteSubscriber: (id: string) => Promise<void>
  activities: AdminActivity[]
  notifications: AdminNotification[]
  markNotificationAsRead: (id: string) => Promise<void>
  clearAllNotifications: () => Promise<void>
  dashboardStats: DashboardStatsData | null
  isCreateArticleOpen: boolean
  setIsCreateArticleOpen: (open: boolean) => void
  isAddCategoryOpen: boolean
  setIsAddCategoryOpen: (open: boolean) => void
  isCommandPaletteOpen: boolean
  setIsCommandPaletteOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void
  toastMessage: string | null
  showToast: (msg: string) => void
  refreshData: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const SHARED_STORAGE_KEY = 'hellodesh_articles_v2'

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Auth state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => getStoredUser())

  // Modals
  const [isCreateArticleOpen, setIsCreateArticleOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isEditArticleOpen, setIsEditArticleOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null)

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Articles state
  const [articles, setArticles] = useState<AdminArticle[]>(() => {
    try {
      const saved = localStorage.getItem(SHARED_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return INITIAL_ADMIN_ARTICLES
  })

  // Entities state
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES)
  const [authors, setAuthors] = useState<AdminAuthor[]>(INITIAL_AUTHORS)
  const [mediaList, setMediaList] = useState<AdminMediaItem[]>(INITIAL_MEDIA)
  const [comments, setComments] = useState<AdminCommentItem[]>(INITIAL_COMMENTS)
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS)
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([
    { id: 's1', email: 'rakesh@example.com', subscribedDate: 'Oct 14, 2026', status: 'Active' },
    { id: 's2', email: 'tanvir.dev@gmail.com', subscribedDate: 'Oct 13, 2026', status: 'Active' },
    { id: 's3', email: 'media.bangla@yahoo.com', subscribedDate: 'Oct 12, 2026', status: 'Active' },
    { id: 's4', email: 'arif_dhaka@outlook.com', subscribedDate: 'Oct 11, 2026', status: 'Active' },
  ])
  const [activities, setActivities] = useState<AdminActivity[]>(INITIAL_ACTIVITIES)
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS)
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsData | null>(null)

  // Save helper to maintain compatibility
  const persistArticles = (newArticles: AdminArticle[]) => {
    setArticles(newArticles)
    try {
      localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(newArticles))
      localStorage.setItem('hellodesh_admin_articles', JSON.stringify(newArticles))
    } catch {
      // ignore
    }
  }

  // -------------------------------------------------------------
  // Data Synchronization with API
  // -------------------------------------------------------------

  const refreshData = useCallback(async () => {
    try {
      // Ensure authenticated
      const user = getStoredUser()
      if (!user) {
        await autoLoginDefault()
        const newUser = getStoredUser()
        if (newUser) setCurrentUser(newUser)
      } else {
        setCurrentUser(user)
      }

      // Fetch all entities in parallel
      const [
        artRes,
        catRes,
        authRes,
        commRes,
        medRes,
        userRes,
        subRes,
        notifRes,
        statsRes
      ] = await Promise.allSettled([
        getAdminArticles(100),
        getAdminCategories(),
        getAdminAuthors(),
        getAdminComments(),
        getAdminMedia(),
        apiGetUsers(),
        getAdminSubscribers(),
        getAdminNotifications(),
        getDashboardStats()
      ])

      if (artRes.status === 'fulfilled' && artRes.value.length > 0) {
        persistArticles(artRes.value)
      }
      if (catRes.status === 'fulfilled' && catRes.value.length > 0) {
        setCategories(catRes.value)
      }
      if (authRes.status === 'fulfilled' && authRes.value.length > 0) {
        setAuthors(authRes.value)
      }
      if (commRes.status === 'fulfilled' && commRes.value.length > 0) {
        setComments(commRes.value)
      }
      if (medRes.status === 'fulfilled' && medRes.value.length > 0) {
        setMediaList(medRes.value)
      }
      if (userRes.status === 'fulfilled' && userRes.value.length > 0) {
        setUsers(userRes.value)
      }
      if (subRes.status === 'fulfilled' && subRes.value.length > 0) {
        setSubscribers(subRes.value)
      }
      if (notifRes.status === 'fulfilled' && notifRes.value.length > 0) {
        setNotifications(notifRes.value)
      }
      if (statsRes.status === 'fulfilled') {
        setDashboardStats(statsRes.value)
      }
    } catch (err) {
      console.warn('API sync notification: operating with offline fallback cache', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // -------------------------------------------------------------
  // Auth Handlers
  // -------------------------------------------------------------

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await apiLogin(email, pass)
      setCurrentUser(res.user)
      showToast(`Welcome back, ${res.user.name}!`)
      await refreshData()
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      showToast(msg)
      return false
    }
  }

  const logout = () => {
    apiLogout()
    setCurrentUser(null)
    showToast('Logged out successfully')
  }

  // -------------------------------------------------------------
  // Article Handlers
  // -------------------------------------------------------------

  const addArticle = async (data: Omit<AdminArticle, 'id' | 'views' | 'publishedDate'>) => {
    // Find matching category ID
    const cat = categories.find(
      c => c.name.toLowerCase() === data.category.toLowerCase() ||
           c.nameEn.toLowerCase() === data.category.toLowerCase() ||
           c.slug.toLowerCase() === data.category.toLowerCase()
    )
    const categoryId = cat ? Number(cat.id) : 1

    // Find matching author ID
    const aut = authors.find(a => a.name.toLowerCase() === data.author.toLowerCase())
    const authorId = aut ? Number(aut.id) : 1

    try {
      const created = await createAdminArticle({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || data.title,
        content: data.content || data.title,
        category: categoryId,
        author: authorId,
        image_url: data.image,
        status: data.status,
        tags: data.tags || ['সংবাদ'],
      })
      const updated = [created, ...articles]
      persistArticles(updated)
      showToast('Article created and published to live website!')
    } catch {
      // Optimistic local fallback
      const fallback: AdminArticle = {
        ...data,
        id: `art-${Date.now()}`,
        views: 0,
        publishedDate: 'Just now'
      }
      persistArticles([fallback, ...articles])
      showToast('Article created (saved to cache)!')
    }

    const newAct: AdminActivity = {
      id: `act-${Date.now()}`,
      type: 'publish',
      title: 'New article published',
      detail: data.title,
      timeAgo: 'Just now',
      timestamp: Date.now()
    }
    setActivities(prev => [newAct, ...prev])
  }

  const updateArticle = async (id: string, updated: Partial<AdminArticle>) => {
    const existing = articles.find(a => a.id === id)
    const slug = existing?.slug || id

    let categoryId: number | undefined
    if (updated.category) {
      const cat = categories.find(
        c => c.name.toLowerCase() === updated.category!.toLowerCase() ||
             c.nameEn.toLowerCase() === updated.category!.toLowerCase() ||
             c.slug.toLowerCase() === updated.category!.toLowerCase()
      )
      if (cat) categoryId = Number(cat.id)
    }

    let authorId: number | undefined
    if (updated.author) {
      const aut = authors.find(a => a.name.toLowerCase() === updated.author!.toLowerCase())
      if (aut) authorId = Number(aut.id)
    }

    try {
      await updateAdminArticle(slug, {
        ...updated,
        category_id: categoryId,
        author_id: authorId
      })
      const nextList = articles.map(a => a.id === id ? { ...a, ...updated } : a)
      persistArticles(nextList)
      showToast('Article updated on live database!')
    } catch {
      const nextList = articles.map(a => a.id === id ? { ...a, ...updated } : a)
      persistArticles(nextList)
      showToast('Article updated locally!')
    }

    const newAct: AdminActivity = {
      id: `act-${Date.now()}`,
      type: 'update',
      title: 'Article updated',
      detail: updated.title || existing?.title || 'Details modified',
      timeAgo: 'Just now',
      timestamp: Date.now()
    }
    setActivities(prev => [newAct, ...prev])
  }

  const deleteArticle = async (id: string) => {
    const existing = articles.find(a => a.id === id)
    const slug = existing?.slug || id

    try {
      await deleteAdminArticle(slug)
      const nextList = articles.filter(a => a.id !== id)
      persistArticles(nextList)
      showToast('Article removed from live database!')
    } catch {
      const nextList = articles.filter(a => a.id !== id)
      persistArticles(nextList)
      showToast('Article removed!')
    }
  }

  const toggleArticleStatus = async (id: string) => {
    const existing = articles.find(a => a.id === id)
    if (!existing) return

    const newStatus = existing.status === 'Published' ? ('Draft' as const) : ('Published' as const)
    await updateArticle(id, { status: newStatus })
  }

  // -------------------------------------------------------------
  // Category Handlers
  // -------------------------------------------------------------

  const addCategory = async (cat: Omit<AdminCategory, 'id' | 'articleCount'>) => {
    try {
      const created = await createAdminCategory(cat)
      setCategories(prev => [...prev, created])
      showToast('Category added to live database!')
    } catch {
      const newCat: AdminCategory = {
        ...cat,
        id: `cat-${Date.now()}`,
        articleCount: 0
      }
      setCategories(prev => [...prev, newCat])
      showToast('Category created locally!')
    }
  }

  const deleteCategory = async (id: string) => {
    const existing = categories.find(c => c.id === id)
    const slug = existing?.slug || id

    try {
      await deleteAdminCategory(slug)
      setCategories(prev => prev.filter(c => c.id !== id))
      showToast('Category deleted from live database!')
    } catch {
      setCategories(prev => prev.filter(c => c.id !== id))
      showToast('Category removed!')
    }
  }

  // -------------------------------------------------------------
  // Author Handlers
  // -------------------------------------------------------------

  const addAuthor = async (authData: Omit<AdminAuthor, 'id' | 'articlesCount' | 'joinedDate'>) => {
    try {
      const created = await createAdminAuthor(authData)
      setAuthors(prev => [created, ...prev])
      showToast('Author added to live database!')
    } catch {
      const newAuthor: AdminAuthor = {
        ...authData,
        id: `auth-${Date.now()}`,
        articlesCount: 0,
        joinedDate: 'Oct 2026'
      }
      setAuthors(prev => [newAuthor, ...prev])
      showToast('Author added!')
    }
  }

  const deleteAuthor = async (id: string) => {
    try {
      await deleteAdminAuthor(id)
      setAuthors(prev => prev.filter(a => a.id !== id))
      showToast('Author removed from live database!')
    } catch {
      setAuthors(prev => prev.filter(a => a.id !== id))
      showToast('Author removed!')
    }
  }

  // -------------------------------------------------------------
  // Media Handlers
  // -------------------------------------------------------------

  const addMedia = async (item: Omit<AdminMediaItem, 'id' | 'uploadedDate'>) => {
    const newMedia: AdminMediaItem = {
      ...item,
      id: `m-${Date.now()}`,
      uploadedDate: 'Oct 15, 2026'
    }
    setMediaList(prev => [newMedia, ...prev])
    showToast('Media file added to library!')
  }

  const deleteMedia = async (id: string) => {
    try {
      await deleteAdminMedia(id)
      setMediaList(prev => prev.filter(m => m.id !== id))
      showToast('Media file deleted from server!')
    } catch {
      setMediaList(prev => prev.filter(m => m.id !== id))
      showToast('Media file removed!')
    }
  }

  // -------------------------------------------------------------
  // Comment Handlers
  // -------------------------------------------------------------

  const updateCommentStatus = async (id: string, status: 'Approved' | 'Pending' | 'Spam') => {
    try {
      if (status === 'Approved') {
        await approveAdminComment(id)
      } else if (status === 'Spam') {
        await markSpamAdminComment(id)
      }
      setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      showToast(`Comment marked as ${status} on database!`)
    } catch {
      setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      showToast(`Comment marked as ${status}!`)
    }
  }

  const deleteComment = async (id: string) => {
    try {
      await deleteAdminComment(id)
      setComments(prev => prev.filter(c => c.id !== id))
      showToast('Comment deleted from live database!')
    } catch {
      setComments(prev => prev.filter(c => c.id !== id))
      showToast('Comment deleted!')
    }
  }

  // -------------------------------------------------------------
  // User Handlers
  // -------------------------------------------------------------

  const addUser = async (userData: Omit<AdminUser, 'id' | 'joinedDate' | 'articlesCount'>) => {
    try {
      const created = await apiCreateUser({
        username: userData.name.toLowerCase().replace(/\s+/g, '_'),
        email: userData.email,
        role: userData.role,
        first_name: userData.name,
      })
      setUsers(prev => [...prev, created])
      showToast('User created on live database!')
    } catch {
      const newUser: AdminUser = {
        ...userData,
        id: `u-${Date.now()}`,
        joinedDate: 'Oct 15, 2026',
        articlesCount: 0
      }
      setUsers(prev => [...prev, newUser])
      showToast('User created!')
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await apiDeleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
      showToast('User deleted from live database!')
    } catch {
      setUsers(prev => prev.filter(u => u.id !== id))
      showToast('User deleted!')
    }
  }

  // -------------------------------------------------------------
  // Subscriber Handlers
  // -------------------------------------------------------------

  const deleteSubscriber = async (id: string) => {
    try {
      await deleteAdminSubscriber(id)
      setSubscribers(prev => prev.filter(s => s.id !== id))
      showToast('Subscriber removed from live database!')
    } catch {
      setSubscribers(prev => prev.filter(s => s.id !== id))
      showToast('Subscriber removed!')
    }
  }

  // -------------------------------------------------------------
  // Notification Handlers
  // -------------------------------------------------------------

  const markNotificationAsRead = async (id: string) => {
    try {
      await markAdminNotificationRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }
  }

  const clearAllNotifications = async () => {
    try {
      await clearAllAdminNotifications()
      setNotifications([])
      showToast('All notifications cleared on database!')
    } catch {
      setNotifications([])
      showToast('All notifications cleared!')
    }
  }

  return (
    <AdminContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentUser,
        login,
        logout,
        isLoading,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        toggleArticleStatus,
        editingArticle,
        setEditingArticle,
        isEditArticleOpen,
        setIsEditArticleOpen,
        categories,
        addCategory,
        deleteCategory,
        authors,
        addAuthor,
        deleteAuthor,
        mediaList,
        addMedia,
        deleteMedia,
        comments,
        updateCommentStatus,
        deleteComment,
        users,
        addUser,
        deleteUser,
        subscribers,
        deleteSubscriber,
        activities,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        dashboardStats,
        isCreateArticleOpen,
        setIsCreateArticleOpen,
        isAddCategoryOpen,
        setIsAddCategoryOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        searchQuery,
        setSearchQuery,
        sidebarCollapsed,
        setSidebarCollapsed,
        toastMessage,
        showToast,
        refreshData
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
