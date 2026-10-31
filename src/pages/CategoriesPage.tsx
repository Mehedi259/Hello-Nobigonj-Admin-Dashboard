import React from 'react'
import { Plus, Grid, Trash2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const CategoriesPage: React.FC = () => {
  const { categories, setIsAddCategoryOpen, showToast } = useAdmin()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Category Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Configure news topics, slugs, and navigation tags
          </p>
        </div>
        <button
          className="primary-create-btn"
          onClick={() => setIsAddCategoryOpen(true)}
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              background: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: cat.color || 'var(--color-primary)'
                  }}
                />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{cat.name}</h3>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>
                {cat.nameEn}
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Slug: <code style={{ background: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>/{cat.slug}</code>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                {cat.articleCount} articles
              </span>
              <button
                className="action-btn"
                style={{ width: '28px', height: '28px', color: 'var(--text-light)' }}
                onClick={() => showToast('Default categories cannot be deleted')}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
