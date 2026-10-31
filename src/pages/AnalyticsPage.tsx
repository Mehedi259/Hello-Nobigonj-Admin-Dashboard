import React from 'react'
import { PageViewsChart } from '../components/dashboard/PageViewsChart'
import { ContentDistributionChart } from '../components/dashboard/ContentDistributionChart'
import { TrendingUp, Users, Smartphone, Globe, Eye } from 'lucide-react'

export const AnalyticsPage: React.FC = () => {
  const metrics = [
    { label: 'Avg. Daily Visitors', value: '24,650', change: '+14%', icon: <Users size={18} color="#2563eb" /> },
    { label: 'Avg. Time on Article', value: '3m 42s', change: '+8%', icon: <TrendingUp size={18} color="#059669" /> },
    { label: 'Mobile Readers', value: '78.4%', change: '+3.2%', icon: <Smartphone size={18} color="#ea580c" /> },
    { label: 'International Traffic', value: '18.2%', change: '+5.1%', icon: <Globe size={18} color="#7c3aed" /> },
  ]

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
          Audience & Traffic Analytics
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Detailed performance statistics, readership metrics, and device breakdowns
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {metrics.map((m, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrap" style={{ background: 'var(--bg-subtle)' }}>
                {m.icon}
              </div>
              <span className="stat-label">{m.label}</span>
            </div>
            <div className="stat-number">{m.value}</div>
            <div className="stat-trend trend-up">
              <span>{m.change}</span>
              <span className="trend-period">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <PageViewsChart />
        <ContentDistributionChart />
      </div>
    </div>
  )
}
