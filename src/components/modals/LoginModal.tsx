import React, { useState } from 'react'
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const LoginModal: React.FC = () => {
  const { currentUser, login } = useAdmin()
  const [email, setEmail] = useState('admin@hellodesh.com')
  const [password, setPassword] = useState('adminpassword123')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Only show if user is signed out
  if (currentUser) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)
    try {
      const ok = await login(email, password)
      if (!ok) {
        setErrorMsg('ইমেইল বা পাসওয়ার্ড সঠিক নয়। পুনরায় চেষ্টা করুন।')
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'লগইন ব্যর্থ হয়েছে')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-modal-overlay" style={{ zIndex: 1000, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="admin-modal-box" style={{ maxWidth: '440px', padding: '32px 28px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={32} color="var(--color-primary)" />
          </div>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Hello Desh - Admin Login
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Sign in to access editorial controls, publish articles, and moderate content.
        </p>

        {errorMsg && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', textAlign: 'left' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@hellodesh.com"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="action-btn primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '6px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>

          <div style={{ marginTop: '16px', background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <strong>Default Superadmin Credentials:</strong><br />
            Email: <code>admin@hellodesh.com</code><br />
            Password: <code>adminpassword123</code>
          </div>
        </form>
      </div>
    </div>
  )
}
