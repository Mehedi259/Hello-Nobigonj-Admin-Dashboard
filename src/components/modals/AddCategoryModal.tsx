import React, { useState } from 'react'
import { X, Grid, Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const AddCategoryModal: React.FC = () => {
  const { isAddCategoryOpen, setIsAddCategoryOpen, addCategory } = useAdmin()

  const [name, setName] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState('#15803d')

  if (!isAddCategoryOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addCategory({
      name: name.trim(),
      nameEn: nameEn.trim() || name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
      color
    })

    setName('')
    setNameEn('')
    setSlug('')
    setIsAddCategoryOpen(false)
  }

  return (
    <div
      className="admin-modal-overlay"
      onClick={() => setIsAddCategoryOpen(false)}
    >
      <div
        className="admin-modal-box"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Grid size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Add New Category</h3>
          </div>
          <button
            onClick={() => setIsAddCategoryOpen(false)}
            style={{ color: 'var(--text-light)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="form-group">
            <label className="form-label">Category Name (Bengali) *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. পরিবেশ ও জলবায়ু"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">English Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Environment"
              value={nameEn}
              onChange={(e) => {
                setNameEn(e.target.value)
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
              }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Badge Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '100%', height: '40px', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button
              type="button"
              className="action-btn"
              style={{ width: 'auto', padding: '8px 16px', borderRadius: '6px' }}
              onClick={() => setIsAddCategoryOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-create-btn"
              style={{ padding: '8px 20px' }}
            >
              <Plus size={16} />
              <span>Save Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
