import React from 'react'
import { Mail, Download } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const SubscribersPage: React.FC = () => {
  const { subscribers, showToast } = useAdmin()

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Email,SubscribedDate,Status\n' +
      subscribers.map((s) => `${s.email},${s.subscribedDate},${s.status}`).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'hellodesh_subscribers.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Subscribers list exported as CSV!')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Newsletter Subscribers
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Total {8921 + subscribers.length - 4} active readers subscribed to daily alerts
          </p>
        </div>
        <button
          className="quick-action-link"
          onClick={handleExport}
          style={{ padding: '8px 14px', background: '#fff', border: '1px solid var(--border-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Date Subscribed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td style={{ fontWeight: 600 }}>{sub.email}</td>
                <td style={{ color: 'var(--text-light)', fontSize: '12px' }}>{sub.subscribedDate}</td>
                <td>
                  <span className="badge-tag badge-published">{sub.status}</span>
                </td>
                <td>
                  <span
                    style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => showToast(`Sent test email to ${sub.email}`)}
                  >
                    Send Digest
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
