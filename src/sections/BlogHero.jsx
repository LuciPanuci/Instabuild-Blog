import React from 'react'
import { FaCalendarAlt, FaBookOpen, FaUserEdit } from 'react-icons/fa'
import { BlogEditableSection, BlogEditableText, BlogEditableImage } from '../internal/EditableStubs'

const BlogHero = ({ post }) => {
  const heroData = post?.content?.hero || {}

  return (
    <BlogEditableSection>
      <section className="relative bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 21:9 Featured Image */}
            <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
              <BlogEditableImage
                src={heroData?.image_url || post?.featured_image_url || '/blog-placeholder.jpg'}
                alt={heroData?.title || post?.title || 'Blog post'}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'contrast(1.1) saturate(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content Below Image */}
            <div className="p-6">
              {/* Badge */}
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: 'var(--primary-very-light, #EFF6FF)',
                  color: 'var(--primary-dark, #1E40AF)',
                }}
              >
                {heroData?.section_badge || 'Blog Post'}
              </div>

              {/* Title */}
              <BlogEditableText
                text={heroData?.title || post?.title || 'Untitled Blog Post'}
                className="block text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              />

              {/* Excerpt */}
              <BlogEditableText
                text={heroData?.excerpt || post?.excerpt || ''}
                className="block text-lg text-gray-600 leading-relaxed mb-6"
                multiline
              />

              {/* Meta */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: 'var(--primary, #3B82F6)' }}
                  >
                    <FaCalendarAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Published</div>
                    <div className="font-medium text-gray-900">
                      {new Date(post?.created_at || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: 'var(--secondary, #8B5CF6)' }}
                  >
                    <FaBookOpen className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Reading Time</div>
                    <div className="font-medium text-gray-900">
                      {post?.metadata?.reading_time || '5-7 minutes'}
                    </div>
                  </div>
                </div>

                {(post?.author?.name || post?.author_name) && (
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: 'var(--accent, #F59E0B)' }}
                    >
                      <FaUserEdit className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Author</div>
                      <div className="font-medium text-gray-900">
                        {post?.author?.name || post?.author_name}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogHero
