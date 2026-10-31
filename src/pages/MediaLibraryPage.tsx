import React, { useState } from 'react'
import { Plus, Image as ImageIcon, Copy, Trash2, Eye, Check } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const MediaLibraryPage: React.FC = () => {
  const { mediaList, addMedia, deleteMedia, showToast } = useAdmin()

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileSize, setFileSize] = useState('24 KB')

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    showToast('Image URL copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileName.trim() || !fileUrl.trim()) return

    addMedia({
      name: fileName.trim(),
      url: fileUrl.trim(),
      size: fileSize,
      type: 'image',
      dimensions: '800 x 450'
    })

    setFileName('')
    setFileUrl('')
    setShowUpload(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Media & Asset Library
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Manage featured photographs, banners, reporter avatars, and portal illustrations
          </p>
        </div>
        <button
          className="primary-create-btn"
          onClick={() => setShowUpload(true)}
        >
          <Plus size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      {showUpload && (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Add Media Asset</h3>
          <form onSubmit={handleUploadSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px auto', gap: '12px', alignItems: 'flex-end' }}>
            <div>
              <label className="form-label">Asset Name *</label>
              <input type="text" className="form-input" placeholder="e.g. press-briefing.jpg" value={fileName} onChange={(e) => setFileName(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Image Path / URL *</label>
              <input type="text" className="form-input" placeholder="e.g. /images/hero-yunus.jpg" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">File Size</label>
              <input type="text" className="form-input" value={fileSize} onChange={(e) => setFileSize(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="primary-create-btn" style={{ padding: '10px 18px' }}>Add</button>
              <button type="button" className="action-btn" style={{ height: '40px', padding: '0 12px' }} onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Media Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
        {mediaList.map((m) => (
          <div
            key={m.id}
            style={{
              background: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '140px', background: '#0f172a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={m.url}
                alt={m.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }} title={m.name}>
                  {m.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{m.size}</span>
                  <span>{m.dimensions || 'Image'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px' }}>
                <button
                  className="quick-action-link"
                  style={{ padding: '4px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => handleCopy(m.id, m.url)}
                  title="Copy URL"
                >
                  {copiedId === m.id ? <Check size={12} color="var(--color-primary)" /> : <Copy size={12} />}
                  <span>{copiedId === m.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  className="action-btn"
                  style={{ width: '26px', height: '26px', color: 'var(--color-brand-red)' }}
                  onClick={() => deleteMedia(m.id)}
                  title="Delete Media"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
