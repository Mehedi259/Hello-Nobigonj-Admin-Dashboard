import React from 'react'
import { Flame, MoreVertical } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const TopPerformingArticles: React.FC = () => {
  const { articles, setCurrentTab } = useAdmin()

  // Sort by views descending
  const sorted = [...articles].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <div className="dashboard-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <Flame size={18} color="#ea580c" />
          <span>Top Performing Articles</span>
        </div>
        <span
          className="panel-view-all"
          onClick={() => setCurrentTab('analytics')}
        >
          View All
        </span>
      </div>

      <div className="top-perf-list">
        {sorted.map((item, index) => (
          <div key={item.id} className="top-perf-item">
            <span className="top-perf-rank">{index + 1}</span>
            <img
              src={item.image}
              alt={item.title}
              className="top-perf-thumb"
            />
            <div className="top-perf-info">
              <div className="top-perf-title" title={item.title}>
                {item.title}
              </div>
              <div className="top-perf-meta">
                {(item.views / 1000).toFixed(1)}K views • {item.publishedDate}
              </div>
            </div>
            <button
              style={{ color: 'var(--text-light)', cursor: 'pointer' }}
              onClick={() => setCurrentTab('articles')}
            >
              <MoreVertical size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
