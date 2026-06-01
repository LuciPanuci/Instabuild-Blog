import React from 'react'
import { BlogEditableSection, BlogEditableContent } from '../internal/EditableStubs'

const BlogIntroduction = ({ section }) => {
  if (!section || section.type !== 'introduction') return null

  return (
    <BlogEditableSection>
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="relative">
                {/* Large opening quote */}
                <div
                  className="absolute -left-4 -top-4 text-8xl font-serif opacity-20"
                  style={{ color: 'var(--primary, #3B82F6)' }}
                >
                  "
                </div>

                <div
                  className="relative z-10"
                  style={{ color: '#1F2937', fontSize: '1.5rem', lineHeight: '1.7', fontFamily: 'Georgia, serif' }}
                >
                  <BlogEditableContent
                    content={section?.content || ''}
                    className="leading-relaxed text-2xl font-light italic"
                  />
                </div>

                {/* Decorative dots */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-px"
                      style={{ background: `linear-gradient(to right, transparent, var(--primary, #3B82F6))` }}
                    />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary, #3B82F6)' }} />
                    <div className="w-3 h-3 rounded-full opacity-50" style={{ backgroundColor: 'var(--primary, #3B82F6)' }} />
                    <div className="w-3 h-3 rounded-full opacity-25" style={{ backgroundColor: 'var(--primary, #3B82F6)' }} />
                    <div
                      className="w-12 h-px"
                      style={{ background: `linear-gradient(to left, transparent, var(--primary, #3B82F6))` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogIntroduction
