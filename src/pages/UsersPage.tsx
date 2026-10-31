import React, { useState } from 'react'
import { Plus, UserCheck, Shield, Trash2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const UsersPage: React.FC = () => {
  const { users, addUser, showToast } = useAdmin()
  const [showAddUser, setShowAddUser] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'Editor' | 'Reporter' | 'User'>('Reporter')

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    addUser({
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Active'
    })

    setName('')
    setEmail('')
    setShowAddUser(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            User Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Administrators, editors, reporters, and staff access
          </p>
        </div>
        <button
          className="primary-create-btn"
          onClick={() => setShowAddUser(true)}
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {showAddUser && (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Create New Staff User</h3>
          <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" placeholder="e.g. Tanvir Hasan" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" placeholder="e.g. tanvir@hellodesh.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Role</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="Reporter">Reporter</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="primary-create-btn" style={{ padding: '10px 16px' }}>Save</button>
              <button type="button" className="action-btn" style={{ height: '40px', padding: '0 12px', borderRadius: '6px' }} onClick={() => setShowAddUser(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Articles</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className="badge-tag"
                    style={{
                      background: u.role === 'Super Admin' ? '#fef2f2' : '#eff6ff',
                      color: u.role === 'Super Admin' ? '#b91c1c' : '#1d4ed8'
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className="badge-tag badge-published">{u.status}</span>
                </td>
                <td style={{ fontWeight: 600 }}>{u.articlesCount}</td>
                <td style={{ color: 'var(--text-light)', fontSize: '12px' }}>{u.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
