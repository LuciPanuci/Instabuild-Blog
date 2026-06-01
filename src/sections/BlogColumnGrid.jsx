import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { BlogEditableSection } from '../internal/EditableStubs'

const getColumnWidthClass = (width) => {
  if (width >= 1)    return 'w-full'
  if (width >= 0.5)  return 'w-full md:w-1/2'
  if (width >= 0.33) return 'w-full md:w-1/3'
  return 'w-full md:w-1/4'
}

const Card = ({ card }) => (
  <div
    className={`rounded-xl p-4 border flex flex-col h-full ${
      card.featured
        ? 'border-blue-200 bg-white shadow-lg ring-1 ring-blue-100'
        : 'border-gray-200 bg-white shadow-sm'
    }`}
  >
    <h4 className="font-bold text-gray-900 mb-1">{card.title}</h4>
    {card.price && (
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold" style={{ color: 'var(--primary, #3B82F6)' }}>
          {card.price}
        </span>
        {card.period && <span className="text-xs text-gray-500">{card.period}</span>}
      </div>
    )}
    {card.description && <p className="text-sm text-gray-500 mb-3">{card.description}</p>}
    {card.features?.length > 0 && (
      <ul className="space-y-1.5 mb-4 flex-1">
        {card.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <FaCheck className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary, #3B82F6)' }} />
            {f}
          </li>
        ))}
      </ul>
    )}
    {card.buttonText && (
      <button
        className={`w-full mt-auto px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
          card.featured
            ? 'text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        style={card.featured ? { backgroundColor: 'var(--primary, #3B82F6)' } : {}}
      >
        {card.buttonText}
      </button>
    )}
  </div>
)

const ColumnCards = ({ column }) => {
  const cards = column.cards || []
  const fillMode = column.fillMode || 'full'

  if (fillMode === 'full' || cards.length === 1) {
    return <Card card={cards[0]} />
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {cards.map((card) => (
        <div key={card.id} className="flex-1">
          <Card card={card} />
        </div>
      ))}
    </div>
  )
}

const BlogColumnGrid = ({ section }) => {
  if (!section || section.type !== 'column_grid') return null

  const columns = section?.column_grid_data?.columns || []

  return (
    <BlogEditableSection>
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)' }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {section?.title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{section.title}</h2>
            </div>
          )}

          <div className="flex flex-wrap gap-6 items-stretch">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`${getColumnWidthClass(column.width)} flex-shrink-0`}
                style={{ flex: `${column.width} 1 0` }}
              >
                <ColumnCards column={column} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogColumnGrid
