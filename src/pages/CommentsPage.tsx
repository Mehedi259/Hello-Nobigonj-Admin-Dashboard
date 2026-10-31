import React, { useState } from 'react'
import { MessageSquare, Check, AlertOctagon, Trash2 } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export const CommentsPage: React.FC = () => {
  const { comments, updateCommentStatus, deleteComment } = useAdmin()
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Spam'>('All')

  const filtered = comments.filter((c) => filter === 'All' || c.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
            Reader Comments Moderation
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Review, approve, and moderate reader comments across all published articles
          </p>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: '6px', padding: '2px' }}>
          {(['All', 'Approved', 'Pending', 'Spam'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 600,
                borderRadius: '4px',
                background: filter === tab ? '#fff' : 'transparent',
                color: filter === tab ? 'var(--color-primary)' : 'var(--text-muted)',
                boxShadow: filter === tab ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Commenter</th>
              <th>Comment Content</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.articleTitle}
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{item.authorName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{item.authorEmail}</div>
                </td>
                <td style={{ maxWidth: '300px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {item.content}
                  </p>
                </td>
                <td>
                  <span
                    className="badge-tag"
                    style={{
                      background:
                        item.status === 'Approved'
                          ? '#dcfce7'
                          : item.status === 'Pending'
                          ? '#fef3c7'
                          : '#fee2e2',
                      color:
                        item.status === 'Approved'
                          ? '#166534'
                          : item.status === 'Pending'
                          ? '#b45309'
                          : '#b91c1c'
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-light)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {item.createdAt}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {item.status !== 'Approved' && (
                      <button
                        className="action-btn"
                        style={{ width: '30px', height: '30px', color: 'var(--color-primary)' }}
                        onClick={() => updateCommentStatus(item.id, 'Approved')}
                        title="Approve Comment"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    {item.status !== 'Spam' && (
                      <button
                        className="action-btn"
                        style={{ width: '30px', height: '30px', color: 'var(--color-brand-amber)' }}
                        onClick={() => updateCommentStatus(item.id, 'Spam')}
                        title="Mark as Spam"
                      >
                        <AlertOctagon size={14} />
                      </button>
                    )}
                    <button
                      className="action-btn"
                      style={{ width: '30px', height: '30px', color: 'var(--color-brand-red)' }}
                      onClick={() => deleteComment(item.id)}
                      title="Delete Comment"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
