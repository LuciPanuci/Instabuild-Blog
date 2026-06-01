import React, { useRef } from 'react'
import { BlogEditableSection } from '../internal/EditableStubs'

const BlogComparison = ({ section }) => {
  const tableRef = useRef(null)

  if (!section || section.type !== 'comparison') return null

  const { headers = [], rows = [] } = section?.comparison_data || {}

  return (
    <BlogEditableSection>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              {section?.title && (
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{section.title}</h2>
                </div>
              )}

              {/* Mobile card view */}
              <div className="md:hidden space-y-4">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">{row[0] || 'Feature'}</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {headers.slice(1).map((header, colIndex) => (
                        <div key={colIndex} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-500 mb-1">{header}</div>
                            <div className="text-sm text-gray-900">{row[colIndex + 1] || '-'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table view */}
              <div className="hidden md:block">
                <div
                  ref={tableRef}
                  className="overflow-x-auto pb-4"
                  style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}
                >
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr>
                        {headers.map((header, colIndex) => (
                          <th
                            key={colIndex}
                            className={`py-4 text-left font-semibold ${
                              colIndex === 0
                                ? 'px-2 bg-gray-50 text-gray-700 sticky left-0 z-20 min-w-[70px]'
                                : 'px-4 text-white min-w-[120px]'
                            }`}
                            style={
                              colIndex === 0
                                ? { position: 'sticky', left: 0, backgroundColor: '#F9FAFB', boxShadow: '2px 0 4px rgba(0,0,0,0.05)' }
                                : { backgroundColor: 'var(--primary, #3B82F6)' }
                            }
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          {row.map((cell, colIndex) => (
                            <td
                              key={colIndex}
                              className={`py-4 ${
                                colIndex === 0
                                  ? 'px-2 font-medium text-gray-900 sticky left-0 z-20 min-w-[70px]'
                                  : 'px-4 text-gray-600 min-w-[120px]'
                              }`}
                              style={
                                colIndex === 0
                                  ? {
                                      position: 'sticky',
                                      left: 0,
                                      backgroundColor: rowIndex % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                                      boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
                                    }
                                  : {}
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogComparison
