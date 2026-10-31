import React, { useState } from 'react'
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  User,
  LogOut,
  Settings
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const Topbar: React.FC = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    notifications,
    markNotificationAsRead,
    setIsCommandPaletteOpen,
    setCurrentTab,
    currentUser,
    logout,
    showToast
  } = useAdmin()

  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="admin-topbar">
      {/* Left: Logo & Hamburger */}
      <div className="topbar-left">
        <div
          onClick={() => setCurrentTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginRight: '8px' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #e11d48 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '18px'
          }}>H</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', lineHeight: 1.1 }}>
              Hello<span style={{ color: '#e11d48' }}>Nobigonj</span>
            </span>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Newsroom Admin</span>
          </div>
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar with Ctrl+K */}
        <div
          className="topbar-search-wrap"
          onClick={() => setIsCommandPaletteOpen(true)}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search articles, categories, users..."
            readOnly
          />
          <span className="search-shortcut-badge">Ctrl + K</span>
        </div>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="topbar-right">
        {/* Visit Live Website */}
        <a
          href={typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3015' : 'http://46.225.103.236:3015'}
          target="_blank"
          rel="noreferrer"
          className="quick-action-link"
          style={{ padding: '6px 12px', fontSize: '12px', gap: '6px', background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)', fontWeight: 600 }}
          title="Open Public News Website"
        >
          <span>View Site</span>
          <ExternalLink size={13} />
        </a>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="notification-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: '12px',
                zIndex: 50
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>Notifications</span>
                <span style={{ fontSize: '11px', color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}>Mark all as read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      background: n.read ? '#fff' : 'var(--bg-subtle)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{n.title}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{n.description}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '4px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile-menu"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <img
              src="/images/admin-avatar.jpg"
              alt={currentUser?.name || 'Mehedi Hasan'}
              className="user-avatar-img"
            />
            <div className="user-info-text">
              <div className="user-name">{currentUser?.name || 'Mehedi Hasan'}</div>
              <div className="user-role">{currentUser?.role || 'Super Admin'}</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {/* Profile Dropdown */}
          {userMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '180px',
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 50
              }}
            >
              <div
                style={{ padding: '8px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '4px' }}
                onClick={() => { setCurrentTab('general-settings'); setUserMenuOpen(false); }}
              >
                <User size={15} />
                <span>My Profile</span>
              </div>
              <div
                style={{ padding: '8px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '4px' }}
                onClick={() => { setCurrentTab('website-settings'); setUserMenuOpen(false); }}
              >
                <Settings size={15} />
                <span>Settings</span>
              </div>
              <div
                style={{ padding: '8px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '4px', color: 'var(--color-brand-red)' }}
                onClick={() => { logout(); setUserMenuOpen(false); }}
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
