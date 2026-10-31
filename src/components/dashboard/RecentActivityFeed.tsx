import React from 'react'
import {
  Clock,
  FilePlus,
  UserPlus,
  MessageCircle,
  MailCheck,
  RefreshCw
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const RecentActivityFeed: React.FC = () => {
  const { activities, setCurrentTab } = useAdmin()

  const getIcon = (type: string) => {
    switch (type) {
      case 'publish':
        return (
          <div className="activity-icon-bubble" style={{ background: '#dcfce7', color: '#166534' }}>
            <FilePlus size={14} />
          </div>
        )
      case 'register':
        return (
          <div className="activity-icon-bubble" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <UserPlus size={14} />
          </div>
        )
      case 'comment':
        return (
          <div className="activity-icon-bubble" style={{ background: '#f3e8ff', color: '#9333ea' }}>
            <MessageCircle size={14} />
          </div>
        )
      case 'subscribe':
        return (
          <div className="activity-icon-bubble" style={{ background: '#ecfdf5', color: '#059669' }}>
            <MailCheck size={14} />
          </div>
        )
      case 'update':
      default:
        return (
          <div className="activity-icon-bubble" style={{ background: '#f1f5f9', color: '#475569' }}>
            <RefreshCw size={14} />
          </div>
        )
    }
  }

  return (
    <div className="dashboard-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <Clock size={18} color="var(--color-primary)" />
          <span>Recent Activity</span>
        </div>
        <span
          className="panel-view-all"
          onClick={() => setCurrentTab('analytics')}
        >
          View All
        </span>
      </div>

      <div className="activity-feed-list">
        {activities.slice(0, 5).map((act) => (
          <div key={act.id} className="activity-item">
            {getIcon(act.type)}
            <div className="activity-content">
              <div className="activity-title">{act.title}</div>
              <div className="activity-detail">{act.detail}</div>
              <div className="activity-time">{act.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
