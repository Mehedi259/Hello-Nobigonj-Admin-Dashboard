import React, { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const SettingsPage: React.FC<{ type?: 'general' | 'website' | 'seo' }> = ({ type = 'website' }) => {
  const { showToast } = useAdmin()

  const [siteName, setSiteName] = useState('Hello Desh')
  const [tagline, setTagline] = useState('আমার বাংলা | সত্য খবর, সবার আগে')
  const [metaDescription, setMetaDescription] = useState('হ্যালো দেশ - বাংলাদেশের নির্ভরযোগ্য অনলাইন সংবাদ মাধ্যম।')
  const [contactEmail, setContactEmail] = useState('contact@hellodesh.com')
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [breakingTicker, setBreakingTicker] = useState(true)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('Settings saved successfully!')
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
          {type === 'seo' ? 'Search Engine Optimization (SEO)' : type === 'general' ? 'General Settings' : 'Website Settings'}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Manage portal configuration, meta tags, and global publication settings
        </p>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Portal Brand Name</label>
            <input type="text" className="form-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline (Bengali)</label>
            <input type="text" className="form-input" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Meta Description (SEO)</label>
            <textarea className="form-textarea" rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Official Contact Email</label>
            <input type="email" className="form-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', cursor: 'pointer' }}>
              <input type="checkbox" checked={commentsEnabled} onChange={(e) => setCommentsEnabled(e.target.checked)} />
              <span>Enable reader comments on published articles</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', cursor: 'pointer' }}>
              <input type="checkbox" checked={breakingTicker} onChange={(e) => setBreakingTicker(e.target.checked)} />
              <span>Show breaking news badge and hero alert banner</span>
            </label>
          </div>

          <button type="submit" className="primary-create-btn" style={{ padding: '10px 24px' }}>
            <Save size={15} />
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  )
}
