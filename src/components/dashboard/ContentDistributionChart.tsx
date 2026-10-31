import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'
import { CONTENT_DISTRIBUTION_DATA } from '../../data/mockAdminData'
import { PieChart as PieIcon } from 'lucide-react'

export const ContentDistributionChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <PieIcon size={18} color="var(--color-primary)" />
          <span>Content Distribution</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', height: 260 }}>
        {/* Donut Chart */}
        <div style={{ width: '55%', height: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CONTENT_DISTRIBUTION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
              >
                {CONTENT_DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any, name: any) => [`${val} articles`, name]}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Stat */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
              1,248
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Total Articles
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ width: '45%', display: 'flex', flexDkirection: 'column', gap: '8px', paddingLeft: '8px' }}>
          {CONTENT_DISTRIBUTION_DATA.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0
                  }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                {item.value} ({item.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
