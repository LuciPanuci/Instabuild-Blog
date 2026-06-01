import React, { useState, useEffect } from 'react'
import { useBlogContext } from './BlogProvider'
import { FaCalendarAlt, FaUser } from 'react-icons/fa'

const RelatedBlogPosts = ({ currentPost }) => {
  const { posts, settings, onPostClick } = useBlogContext()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const relatedPosts = posts
    .filter((p) => p.id !== currentPost?.id)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getAuthorName = (post) =>
    post?.author?.name || post?.author_name || settings?.default_author_name || null

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore Other Posts
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {relatedPosts.map((post) => {
                const imageUrl =
                  post.content?.hero?.image_url || post.featured_image_url || null
                return (
                  <div
                    key={post.id}
                    className="flex-shrink-0 snap-start cursor-pointer"
                    style={{ width: isMobile ? '92%' : '30%', minWidth: 240 }}
                    onClick={() => onPostClick && onPostClick(post)}
                  >
                    <div className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors h-full">
                      {imageUrl && (
                        <div className="aspect-video overflow-hidden rounded-lg mb-4">
                          <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {post.excerpt || post.content?.hero?.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                          {getAuthorName(post) && (
                            <span className="flex items-center gap-1">
                              <FaUser className="w-3 h-3" /> {getAuthorName(post)}
                            </span>
                          )}
                          {post.created_at && (
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" /> {formatDate(post.created_at)}
                            </span>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-100"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedBlogPosts
