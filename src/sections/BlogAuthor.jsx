import React from 'react'
import { useBlogContext } from '../BlogProvider'
import { BlogEditableSection, BlogEditableImage } from '../internal/EditableStubs'

const BlogAuthor = ({ post }) => {
  const { settings } = useBlogContext()

  const authorData = post?.author || {}
  const authorName =
    authorData?.name || authorData?.author_name || post?.author_name || settings?.default_author_name
  const authorBio =
    authorData?.bio || authorData?.author_bio || post?.author_bio ||
    'Professional content creator with expertise in the subject matter.'
  const avatarUrl =
    authorData?.avatar_url || authorData?.author_avatar_url ||
    post?.author_avatar_url || settings?.default_author_avatar_url ||
    '/author-placeholder.jpg'

  if (!authorName) return null

  return (
    <BlogEditableSection>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <BlogEditableImage
                    src={avatarUrl}
                    alt={authorName}
                    className="w-20 h-20 rounded-full object-cover"
                    style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide font-medium text-gray-500 mb-2">
                    About the Author
                  </p>
                  <div className="text-xl font-bold mb-3 font-serif" style={{ color: '#1F2937' }}>
                    {authorName}
                  </div>
                  <div
                    className="leading-relaxed text-gray-600"
                    style={{ fontSize: '0.95rem', lineHeight: '1.6' }}
                  >
                    {authorBio}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Published on{' '}
                      {new Date(post?.created_at || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
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

export default BlogAuthor
