import React, { useState } from 'react'
import { Plus, Users, Mail, Trash2, Edit2, BookOpen } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const AuthorsPage: React.FC = () => {
  const { authors, addAuthor, deleteAuthor } = useAdmin()

  const [showAddAuthor, setShowAddAuthor] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addAuthor({
      name: name.trim(),
      role: role.trim() || 'Staff Reporter',
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@hellodesh.com`,
      avatar: '/images/reporter-rakib.jpg',
      bio: bio.trim() || 'Journalist at Hello Desh News Network.'
    })

    setName('')
    setRole('')
    setEmail('')
    setBio('')
    setShowAddAuthor(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Editorial Authors & Columnists
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Manage newsroom staff, guest columnists, and reporter profiles
          </p>
        </div>
        <button
          className="primary-create-btn"
          onClick={() => setShowAddAuthor(true)}
        >
          <Plus size={16} />
          <span>Add Author</span>
        </button>
      </div>

      {showAddAuthor && (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Add New Editorial Author</h3>
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" placeholder="e.g. আনিসুল হক" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Editorial Designation</label>
              <input type="text" className="form-input" placeholder="e.g. ফিচার সম্পাদক" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Official Email</label>
              <input type="email" className="form-input" placeholder="e.g. author@hellodesh.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Short Bio</label>
              <input type="text" className="form-input" placeholder="e.g. লেখক ও সাহিত্যিক" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="action-btn" style={{ padding: '0 14px', height: '36px' }} onClick={() => setShowAddAuthor(false)}>Cancel</button>
              <button type="submit" className="primary-create-btn" style={{ padding: '0 20px', height: '36px' }}>Save Author</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {authors.map((auth) => (
          <div
            key={auth.id}
            style={{
              background: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <img
                  src={auth.avatar}
                  alt={auth.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>{auth.name}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>{auth.role}</div>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                {auth.bio}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <BookOpen size={14} color="var(--color-primary)" />
                {auth.articlesCount} articles
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="action-btn"
                  style={{ width: '28px', height: '28px', color: 'var(--color-brand-red)' }}
                  onClick={() => deleteAuthor(auth.id)}
                  title="Remove Author"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
