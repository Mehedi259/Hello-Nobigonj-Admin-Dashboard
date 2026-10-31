import React, { useState } from 'react'
import { X, Plus, Sparkles } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const CreateArticleModal: React.FC = () => {
  const {
    isCreateArticleOpen,
    setIsCreateArticleOpen,
    addArticle,
    categories
  } = useAdmin()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('National')
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published')
  const [author, setAuthor] = useState('Mehedi Hasan')
  const [image, setImage] = useState('/images/hero-yunus.jpg')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')

  if (!isCreateArticleOpen) return null

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0980-\u09FF]+/g, '-')
        .replace(/^-|-$/g, '')
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addArticle({
      title: title.trim(),
      slug: slug.trim() || `article-${Date.now()}`,
      category,
      status,
      author,
      image,
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim() || title.trim()
    })

    // Reset
    setTitle('')
    setSlug('')
    setExcerpt('')
    setContent('')
    setIsCreateArticleOpen(false)
  }

  return (
    <div
      className="admin-modal-overlay"
      onClick={() => setIsCreateArticleOpen(false)}
    >
      <div
        className="admin-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>
              Create New Article
            </h3>
          </div>
          <button
            onClick={() => setIsCreateArticleOpen(false)}
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
              placeholder="e.g. নতুন বাংলাদেশের উন্নয়ন ভাবনা"
              value={title}
              onChange={handleTitleChange}
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
              <label className="form-label">Status</label>
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
              placeholder="Short summary of the article..."
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Article Body Content</label>
            <textarea
              className="form-textarea"
              placeholder="Full article content..."
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
              onClick={() => setIsCreateArticleOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-create-btn"
              style={{ padding: '8px 20px' }}
            >
              <Plus size={16} />
              <span>Save & Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
