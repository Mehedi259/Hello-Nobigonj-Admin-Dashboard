import React from 'react'
import { Calendar } from 'lucide-react'
import { StatCards } from '../components/dashboard/StatCards'
import { QuickActions } from '../components/dashboard/QuickActions'
import { PageViewsChart } from '../components/dashboard/PageViewsChart'
import { ContentDistributionChart } from '../components/dashboard/ContentDistributionChart'
import { LatestArticlesTable } from '../components/dashboard/LatestArticlesTable'
import { TopPerformingArticles } from '../components/dashboard/TopPerformingArticles'
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      {/* 1. Header Banner */}
      <div className="dashboard-header-banner">
        <div>
          <h1 className="welcome-title">Good Morning, Mehedi Hasan 👋</h1>
          <p className="welcome-sub">
            Here's what's happening with HelloDesh today.
          </p>
        </div>
        <div className="date-badge-card">
          <Calendar size={15} color="var(--color-primary)" />
          <span>Oct 14, 2026 Wednesday</span>
        </div>
      </div>

      {/* 2. Top Stats + Quick Actions Grid */}
      <div className="stats-actions-grid">
        <StatCards />
        <QuickActions />
      </div>

      {/* 3. Charts Row */}
      <div className="charts-grid">
        <PageViewsChart />
        <ContentDistributionChart />
      </div>

      {/* 4. Bottom 3-Column Grid */}
      <div className="dashboard-bottom-grid">
        <LatestArticlesTable />
        <TopPerformingArticles />
        <RecentActivityFeed />
      </div>
    </div>
  )
}
