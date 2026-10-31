import React from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const QuickActions: React.FC = () => {
  const {
    setIsCreateArticleOpen,
    setIsAddCategoryOpen,
    setCurrentTab
  } = useAdmin()

  return (
    <div className="quick-actions-card">
      <button
        className="primary-create-btn"
        onClick={() => setIsCreateArticleOpen(true)}
      >
        <Plus size={16} />
        <span>Create New Article</span>
      </button>

      <div
        className="quick-action-link"
        onClick={() => setCurrentTab('articles')}
      >
        <span>Manage Articles</span>
        <ChevronRight size={14} color="var(--text-light)" />
      </div>

      <div
        className="quick-action-link"
        onClick={() => setIsAddCategoryOpen(true)}
      >
        <span>Add Category</span>
        <ChevronRight size={14} color="var(--text-light)" />
      </div>

      <div
        className="quick-action-link"
        onClick={() => setCurrentTab('users')}
      >
        <span>Manage Users</span>
        <ChevronRight size={14} color="var(--text-light)" />
      </div>

      <div
        className="quick-action-link"
        onClick={() => setCurrentTab('analytics')}
      >
        <span>View Analytics</span>
        <ChevronRight size={14} color="var(--text-light)" />
      </div>
    </div>
  )
}
