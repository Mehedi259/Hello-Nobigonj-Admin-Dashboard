import React, { useState, useEffect } from 'react'
import { X, Save, Edit3 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const EditArticleModal: React.FC = () => {
  const {
    isEditArticleOpen,
    setIsEditArticleOpen,
    editingArticle,
    updateArticle,
    categories
  } = useAdmin()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published')
  const [author, setAuthor] = useState('')
  const [image, setImage] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title || '')
      setCategory(editingArticle.category || 'National')
      setStatus(editingArticle.status || 'Published')
      setAuthor(editingArticle.author || '')
      setImage(editingArticle.image || '/images/hero-yunus.jpg')
      setExcerpt(editingArticle.excerpt || '')
      setContent(editingArticle.content || '')
    }
  }, [editingArticle])

  if (!isEditArticleOpen || !editingArticle) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    updateArticle(editingArticle.id, {
      title: title.trim(),
      category,
      status,
      author: author.trim(),
      image,
      excerpt: excerpt.trim(),
      content: content.trim()
    })

    setIsEditArticleOpen(false)
  }

  return (
    <div
      className="admin-modal-overlay"
      onClick={() => setIsEditArticleOpen(false)}
    >
      <div
        className="admin-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Edit Article</h3>
          </div>
          <button
            onClick={() => setIsEditArticleOpen(false)}
            style={{ color: 'var(--text-light)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.nameEn}>
                    {c.nameEn} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Publication Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className="form-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Featured Image</label>
              <select
                className="form-select"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              >
                <option value="/images/hero-yunus.jpg">Hero (Dr. Yunus)</option>
                <option value="/images/students-rally.jpg">Students Rally</option>
                <option value="/images/padma-bridge.jpg">Padma Bridge</option>
                <option value="/images/metro-rail.jpg">Metro Rail</option>
                <option value="/images/cec-briefing.jpg">CEC Press Briefing</option>
                <option value="/images/dollar-market.jpg">Dollar Market</option>
                <option value="/images/cricket-win.jpg">Cricket Win</option>
                <option value="/images/ai-bangladesh.jpg">AI Technology</option>
                <option value="/images/faria.jpg">Nusrat Faria</option>
                <option value="/images/national-memorial.jpg">National Memorial</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt / Summary</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Article Body Content</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              className="action-btn"
              style={{ width: 'auto', padding: '8px 16px', borderRadius: '6px' }}
              onClick={() => setIsEditArticleOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-create-btn"
              style={{ padding: '8px 20px' }}
            >
              <Save size={16} />
              <span>Update Article</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
