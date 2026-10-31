import React from 'react'
import { Download, FileText, TrendingUp, BarChart2, CheckCircle2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const ReportsPage: React.FC = () => {
  const { articles, showToast } = useAdmin()

  const exportArticlesCSV = () => {
    const csv = 'Title,Category,Status,Views,Date,Author\n' +
      articles.map(a => `"${a.title.replace(/"/g, '""')}",${a.category},${a.status},${a.views},"${a.publishedDate}","${a.author}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'hellodesh_articles_report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Articles report generated and downloaded!')
  }

  const exportTrafficSummary = () => {
    const csv = 'Metric,Value,Period\nTotal Articles,1248,All time\nPage Views,48320,Last 7 days\nActive Users,12643,Registered\nSubscribers,8921,Daily Digest\n'
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'hellodesh_traffic_summary.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Traffic summary downloaded!')
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
          Executive Reports & Analytics Export
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Downloadable statistical data for editorial meetings, sponsors, and stakeholders
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="stat-icon-wrap" style={{ background: 'var(--color-primary-bg)' }}>
              <FileText size={18} color="var(--color-primary)" />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Editorial Articles Report</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Comprehensive spreadsheet containing all published articles, author credits, category mappings, and view stats.
          </p>
          <button className="primary-create-btn" onClick={exportArticlesCSV} style={{ width: '100%' }}>
            <Download size={15} />
            <span>Export CSV Spreadsheet</span>
          </button>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="stat-icon-wrap" style={{ background: '#eff6ff' }}>
              <TrendingUp size={18} color="#2563eb" />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Audience Traffic Summary</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Key performance indicators, daily active reader volume, engagement time, and device distribution metrics.
          </p>
          <button className="primary-create-btn" onClick={exportTrafficSummary} style={{ width: '100%', background: '#2563eb' }}>
            <Download size={15} />
            <span>Export Traffic Data</span>
          </button>
        </div>
      </div>
    </div>
  )
}
