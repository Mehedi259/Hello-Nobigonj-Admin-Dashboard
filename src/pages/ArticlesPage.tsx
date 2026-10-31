import React, { useState } from 'react'
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle,
  FileText
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const ArticlesPage: React.FC = () => {
  const {
    articles,
    deleteArticle,
    toggleArticleStatus,
    setIsCreateArticleOpen,
    setEditingArticle,
    setIsEditArticleOpen
  } = useAdmin()

  const [filterStatus, setFilterStatus] = useState<'All' | 'Published' | 'Draft'>('All')
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filtered = articles.filter((a) => {
    const matchStatus = filterStatus === 'All' || a.status === filterStatus
    const matchCategory = filterCategory === 'All' || a.category === filterCategory
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchCategory && matchSearch
  })

  const handleEdit = (art: any) => {
    setEditingArticle(art)
    setIsEditArticleOpen(true)
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Article Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Total {articles.length} articles published and drafts
          </p>
        </div>

        <button
          className="primary-create-btn"
          onClick={() => setIsCreateArticleOpen(true)}
        >
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by title, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13.5px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: '6px', padding: '2px' }}>
            {(['All', 'Published', 'Draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  background: filterStatus === st ? '#fff' : 'transparent',
                  color: filterStatus === st ? 'var(--color-primary)' : 'var(--text-muted)',
                  boxShadow: filterStatus === st ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12.5px', outline: 'none', background: '#fff' }}
          >
            <option value="All">All Categories</option>
            <option value="Politics">Politics</option>
            <option value="National">National</option>
            <option value="City">City</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Views</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="article-row-title-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="article-row-thumb"
                    />
                    <div>
                      <div
                        className="article-row-title"
                        style={{ maxWidth: '320px', cursor: 'pointer' }}
                        onClick={() => handleEdit(item)}
                        title="Click to edit"
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                        /{item.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge-tag badge-category">
                    {item.category}
                  </span>
                </td>
                <td style={{ fontSize: '12.5px', fontWeight: 500 }}>
                  {item.author}
                </td>
                <td>
                  <span
                    className={`badge-tag ${
                      item.status === 'Published'
                        ? 'badge-published'
                        : 'badge-draft'
                    }`}
                    onClick={() => toggleArticleStatus(item.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle status"
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>
                  {item.views.toLocaleString()}
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                  {item.publishedDate}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <a
                      href="https://hellodesh.com"
                      target="_blank"
                      rel="noreferrer"
                      className="action-btn"
                      style={{ width: '30px', height: '30px' }}
                      title="View on Public Website"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      className="action-btn"
                      style={{ width: '30px', height: '30px' }}
                      onClick={() => handleEdit(item)}
                      title="Edit Article"
                    >
                      <Edit2 size={14} color="var(--color-primary)" />
                    </button>
                    <button
                      className="action-btn"
                      style={{ width: '30px', height: '30px', color: 'var(--color-brand-red)' }}
                      onClick={() => deleteArticle(item.id)}
                      title="Delete Article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
