import React from 'react'
import { FaStar, FaCheck } from 'react-icons/fa'
import { BlogEditableSection } from '../internal/EditableStubs'

const getGridClass = (size) => {
  switch (size) {
    case 1:    return 'col-span-12'
    case 0.5:  return 'col-span-12 md:col-span-6'
    case 0.33: return 'col-span-12 sm:col-span-6 md:col-span-4'
    case 0.25: return 'col-span-6 sm:col-span-6 md:col-span-3'
    default:   return 'col-span-12 md:col-span-4'
  }
}

const getCardStyle = (card) => {
  if (card.featured || card.style === 'glass') {
    return {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: card.featured
        ? '0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
        : '0 10px 40px -10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
    }
  }
  return {
    background: 'white',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  }
}

const BlogPricingCards = ({ section }) => {
  if (!section || section.type !== 'pricing_cards') return null

  const cards = section?.pricing_cards_data?.cards || []

  return (
    <BlogEditableSection>
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, var(--primary, #3B82F6) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, var(--secondary, #8B5CF6) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {section?.title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{section.title}</h2>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${getGridClass(card.size)} transform hover:scale-[1.02] transition-transform duration-300`}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden h-full ${card.featured ? 'ring-2 ring-offset-2' : ''}`}
                  style={{ ...getCardStyle(card), '--tw-ring-color': 'var(--primary, #3B82F6)' }}
                >
                  {card.featured && (
                    <div
                      className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg"
                      style={{ backgroundColor: 'var(--primary, #3B82F6)' }}
                    >
                      <FaStar className="inline-block w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}

                  <div className={`p-6 ${card.size === 1 ? 'md:p-8' : ''} ${card.size === 0.25 ? 'p-4' : ''}`}>
                    <h3 className={`font-bold text-gray-900 mb-2 ${card.size === 0.25 ? 'text-base' : 'text-lg'}`}>
                      {card.title}
                    </h3>

                    {card.size >= 0.33 && (
                      <div className="flex items-baseline gap-1 mb-4">
                        <span
                          className={`font-bold ${card.size === 1 ? 'text-4xl' : 'text-3xl'}`}
                          style={{ color: 'var(--primary, #3B82F6)' }}
                        >
                          {card.price}
                        </span>
                        <span className="text-gray-500 text-sm">{card.period}</span>
                      </div>
                    )}

                    {card.size < 0.33 && (
                      <div className="mb-2">
                        <span className="font-bold text-xl" style={{ color: 'var(--primary, #3B82F6)' }}>
                          {card.price}
                          <span className="text-xs text-gray-500 ml-1">{card.period}</span>
                        </span>
                      </div>
                    )}

                    {card.size >= 0.5 && card.description && (
                      <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                    )}

                    {card.size >= 0.33 && card.features?.length > 0 && (
                      <ul className={`space-y-2 ${card.size === 1 ? 'mb-6' : 'mb-4'}`}>
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <FaCheck className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: 'var(--primary, #3B82F6)' }} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {card.size >= 0.33 && (
                      <button
                        className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                          card.featured
                            ? 'text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                        style={card.featured ? { backgroundColor: 'var(--primary, #3B82F6)' } : {}}
                      >
                        {card.buttonText || 'Get Started'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogPricingCards
