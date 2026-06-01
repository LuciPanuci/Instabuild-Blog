import React from 'react'
import { useBlogContext } from '../BlogProvider'
import {
  BlogEditableSection,
  BlogEditableText,
  BlogEditableImage,
  BlogEditableContent,
} from '../internal/EditableStubs'

const BlogContent = ({ section, sectionIndex = 0 }) => {
  const { onCtaClick } = useBlogContext()

  if (!section || section.type === 'introduction') return null

  const isReversed = sectionIndex % 2 === 1
  const hasImage =
    section?.type === 'main_content' ||
    (section?.image_url && section.image_url !== 'GENERATE_SECTION_IMAGE')

  const getTextColor = () =>
    section?.type === 'conclusion'
      ? 'var(--secondary, #8B5CF6)'
      : 'var(--primary-dark, #1E40AF)'

  return (
    <BlogEditableSection>
      <div className="content-section mb-16">
        {hasImage ? (
          <div className="space-y-8">
            {/* Mobile: title → image → content */}
            <div className="lg:hidden space-y-6">
              <BlogEditableText
                text={section?.title || 'Content Section'}
                className="block text-3xl font-bold text-gray-900 mb-4"
              />
              {section?.image_url && (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <div className="relative w-full aspect-square">
                    <BlogEditableImage
                      src={section.image_url}
                      alt={section.title || 'Section image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <BlogEditableContent
                content={section?.content || ''}
                className="text-lg text-gray-600 leading-relaxed"
              />
            </div>

            {/* Desktop: alternating */}
            <div className={`hidden lg:grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`space-y-8 ${isReversed ? 'lg:col-start-2' : ''}`}>
                <BlogEditableText
                  text={section?.title || 'Content Section'}
                  className="block text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                />
                <BlogEditableContent
                  content={section?.content || ''}
                  className="text-lg text-gray-600 leading-relaxed"
                />
                <div className="flex items-center space-x-4 pt-8">
                  <div className="w-12 h-px" style={{ backgroundColor: getTextColor() }} />
                  <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: getTextColor() }} />
                  <div className="w-6 h-px opacity-30" style={{ backgroundColor: getTextColor() }} />
                </div>
              </div>

              <div className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}>
                {section?.image_url && (
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <BlogEditableImage
                      src={section.image_url}
                      alt={section.title || 'Section image'}
                      className="w-full h-[500px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                      <p className="text-white/90 text-sm italic font-light">{section.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Text-only layout
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <BlogEditableText
                text={section?.title || 'Content Section'}
                className="block text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              />
            </div>

            <BlogEditableContent
              content={section?.content || ''}
              className="text-lg text-gray-600 leading-relaxed"
            />

            {/* CTA for conclusion */}
            {section?.type === 'conclusion' && (section?.show_primary_button !== false) && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => onCtaClick && onCtaClick(section)}
                    className="px-8 py-4 text-white font-semibold rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary-dark, #1E40AF)' }}
                  >
                    {section?.primary_button_text || 'Get in Touch'}
                  </button>

                  {(section?.show_secondary_button === true || section?.show_secondary_button === 'true') && (
                    <button
                      onClick={() => onCtaClick && onCtaClick(section, 'secondary')}
                      className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
                    >
                      {section?.secondary_button_text || 'Contact Us'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {section?.type !== 'conclusion' && (
              <div className="flex justify-center pt-16">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px opacity-30" style={{ backgroundColor: getTextColor() }} />
                  <div className="w-3 h-3 rounded-full border-2 opacity-50" style={{ borderColor: getTextColor() }} />
                  <div className="w-8 h-px opacity-30" style={{ backgroundColor: getTextColor() }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </BlogEditableSection>
  )
}

export default BlogContent
