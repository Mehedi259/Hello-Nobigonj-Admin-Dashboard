import React from 'react'
import { FileText, Eye, Users, Mail, TrendingUp } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const StatCards: React.FC = () => {
  const { articles, users, subscribers, dashboardStats } = useAdmin()

  const totalArticles = dashboardStats?.kpis?.total_articles ?? articles.length
  const totalViews = dashboardStats?.kpis?.total_views ?? articles.reduce((acc, a) => acc + (a.views || 0), 0)
  const totalUsers = dashboardStats?.kpis?.active_users ?? users.length
  const totalSubscribers = dashboardStats?.kpis?.total_subscribers ?? subscribers.length

  const stats = [
    {
      label: 'Total Articles',
      value: totalArticles.toLocaleString(),
      change: '+14%',
      icon: <FileText size={18} color="var(--color-primary)" />,
      bgColor: 'var(--color-primary-bg)',
      color: 'var(--color-primary)'
    },
    {
      label: 'Total Page Views',
      value: totalViews.toLocaleString(),
      change: '+22%',
      icon: <Eye size={18} color="#059669" />,
      bgColor: '#ecfdf5',
      color: '#059669'
    },
    {
      label: 'Registered Users',
      value: totalUsers.toLocaleString(),
      change: '+8%',
      icon: <Users size={18} color="#2563eb" />,
      bgColor: '#eff6ff',
      color: '#2563eb'
    },
    {
      label: 'Subscribers',
      value: totalSubscribers.toLocaleString(),
      change: '+18%',
      icon: <Mail size={18} color="#0d9488" />,
      bgColor: '#f0fdfa',
      color: '#0d9488'
    }
  ]

  return (
    <>
      {stats.map((s, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrap" style={{ background: s.bgColor }}>
              {s.icon}
            </div>
            <span className="stat-label">{s.label}</span>
          </div>
          <div className="stat-number">{s.value}</div>
          <div className="stat-trend trend-up">
            <TrendingUp size={13} />
            <span>{s.change}</span>
            <span className="trend-period">vs. last 7 days</span>
          </div>
        </div>
      ))}
    </>
  )
}
