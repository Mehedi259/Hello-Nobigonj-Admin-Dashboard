import React from 'react'
import {
  LayoutDashboard,
  FileText,
  Grid,
  Users,
  Image as ImageIcon,
  MessageSquare,
  UserCheck,
  Mail,
  Bell,
  TrendingUp,
  BarChart2,
  Settings,
  Globe,
  Search,
  Sparkles
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { AdminTab } from '../../types/admin'

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, sidebarCollapsed } = useAdmin()

  const navGroups: {
    title: string;
    items: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[]
  }[] = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      ]
    },
    {
      title: 'CONTENT MANAGEMENT',
      items: [
        { id: 'articles', label: 'Articles', icon: <FileText size={18} /> },
        { id: 'categories', label: 'Categories', icon: <Grid size={18} /> },
        { id: 'authors', label: 'Authors', icon: <Users size={18} /> },
        { id: 'media', label: 'Media Library', icon: <ImageIcon size={18} /> },
        { id: 'comments', label: 'Comments', icon: <MessageSquare size={18} /> },
      ]
    },
    {
      title: 'USERS & ENGAGEMENT',
      items: [
        { id: 'users', label: 'Users', icon: <UserCheck size={18} /> },
        { id: 'subscribers', label: 'Subscribers', icon: <Mail size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} /> },
        { id: 'reports', label: 'Reports', icon: <BarChart2 size={18} /> },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { id: 'general-settings', label: 'General Settings', icon: <Settings size={18} /> },
        { id: 'website-settings', label: 'Website Settings', icon: <Globe size={18} /> },
        { id: 'seo', label: 'SEO', icon: <Search size={18} /> },
      ]
    }
  ]

  return (
    <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div>
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="sidebar-nav-group">
            {group.title !== 'MAIN' && (
              <div className="sidebar-group-title">{group.title}</div>
            )}
            <ul className="sidebar-nav-list">
              {group.items.map((item) => {
                const isActive = currentTab === item.id
                return (
                  <li
                    key={item.id}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentTab(item.id)}
                    title={item.label}
                  >
                    {item.icon}
                    <span className="nav-text">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Promo Card */}
      <div className="sidebar-bottom-card">
        <div className="sidebar-bottom-tagline">
          <Sparkles size={14} color="var(--color-primary)" />
          <span>Build a better</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
          Bangladesh together
        </div>
        <div className="sidebar-bottom-sub">সত্যের পক্ষে, মানুষের পাশে</div>
      </div>
    </aside>
  )
}
