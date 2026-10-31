import React from 'react'
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useAdmin()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            System & Editorial Notifications
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Alerts regarding server health, breaking articles, traffic spikes, and moderation queues
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            className="action-btn"
            style={{ width: 'auto', padding: '8px 14px', borderRadius: '6px', color: 'var(--color-brand-red)', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={clearAllNotifications}
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Bell size={40} color="var(--text-light)" style={{ marginBottom: '12px' }} />
          <h3>All caught up! No active notifications.</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                background: '#fff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                opacity: n.read ? 0.7 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  className="stat-icon-wrap"
                  style={{
                    background:
                      n.type === 'warning'
                        ? '#fef3c7'
                        : n.type === 'success'
                        ? '#dcfce7'
                        : '#eff6ff',
                    color:
                      n.type === 'warning'
                        ? '#b45309'
                        : n.type === 'success'
                        ? '#166534'
                        : '#2563eb'
                  }}
                >
                  {n.type === 'warning' ? <AlertTriangle size={18} /> : n.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                    {n.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{n.description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{n.time}</span>
                {!n.read && (
                  <button
                    className="action-btn"
                    style={{ width: '28px', height: '28px', color: 'var(--color-primary)' }}
                    onClick={() => markNotificationAsRead(n.id)}
                    title="Mark as Read"
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
