import React, { useState } from 'react'
import {
  Search,
  X,
  FileText,
  Plus,
  Users,
  Grid,
  TrendingUp,
  Settings,
  ArrowRight
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { AdminTab } from '../../types/admin'

export const CommandPaletteModal: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentTab,
    setIsCreateArticleOpen,
    articles
  } = useAdmin()

  const [query, setQuery] = useState('')

  if (!isCommandPaletteOpen) return null

  const actions = [
    {
      id: 'create-article',
      label: 'Create New Article',
      icon: <Plus size={16} />,
      run: () => {
        setIsCreateArticleOpen(true)
        setIsCommandPaletteOpen(false)
      }
    },
    {
      id: 'goto-articles',
      label: 'Go to Articles Management',
      icon: <FileText size={16} />,
      run: () => {
        setCurrentTab('articles')
        setIsCommandPaletteOpen(false)
      }
    },
    {
      id: 'goto-categories',
      label: 'Go to Categories',
      icon: <Grid size={16} />,
      run: () => {
        setCurrentTab('categories')
        setIsCommandPaletteOpen(false)
      }
    },
    {
      id: 'goto-users',
      label: 'Go to Users',
      icon: <Users size={16} />,
      run: () => {
        setCurrentTab('users')
        setIsCommandPaletteOpen(false)
      }
    },
    {
      id: 'goto-analytics',
      label: 'Go to Analytics',
      icon: <TrendingUp size={16} />,
      run: () => {
        setCurrentTab('analytics')
        setIsCommandPaletteOpen(false)
      }
    },
    {
      id: 'goto-settings',
      label: 'Go to Settings',
      icon: <Settings size={16} />,
      run: () => {
        setCurrentTab('website-settings')
        setIsCommandPaletteOpen(false)
      }
    }
  ]

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  const matchingArticles = query.trim()
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div
      className="admin-modal-overlay"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="admin-modal-box"
        style={{ maxWidth: '540px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={18} color="var(--color-primary)" />
          <input
            type="text"
            placeholder="Type a command or search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px' }}
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{ color: 'var(--text-light)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '8px', maxHeight: '350px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', padding: '6px 10px', textTransform: 'uppercase' }}>
            Actions
          </div>
          {filteredActions.map((act) => (
            <div
              key={act.id}
              onClick={act.run}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13.5px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-primary)' }}>{act.icon}</span>
                <span>{act.label}</span>
              </div>
              <ArrowRight size={13} color="var(--text-light)" />
            </div>
          ))}

          {matchingArticles.length > 0 && (
            <>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', padding: '10px 10px 4px', textTransform: 'uppercase' }}>
                Matching Articles
              </div>
              {matchingArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setCurrentTab('articles')
                    setIsCommandPaletteOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <FileText size={15} color="var(--text-muted)" />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{art.title}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
