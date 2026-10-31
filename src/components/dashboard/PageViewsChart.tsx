import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { PAGE_VIEWS_DATA } from '../../data/mockAdminData'
import { TrendingUp } from 'lucide-react'

export const PageViewsChart: React.FC = () => {
  const [filterRange, setFilterRange] = useState('7d')

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <TrendingUp size={18} color="var(--color-primary)" />
          <span>Page Views Overview</span>
        </div>
        <select
          className="chart-filter-select"
          value={filterRange}
          onChange={(e) => setFilterRange(e.target.value)}
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">This Quarter</option>
        </select>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PAGE_VIEWS_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15803d" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
              formatter={(val: any) => [`${Number(val).toLocaleString()} views`, 'Page Views']}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#15803d"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorViews)"
              dot={{ r: 3, fill: '#15803d' }}
              activeDot={{ r: 6, fill: '#15803d' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
