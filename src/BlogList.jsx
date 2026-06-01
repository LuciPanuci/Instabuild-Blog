import React, { useState } from 'react'
import { useBlogContext } from './BlogProvider'
import { FaCalendarAlt, FaUser, FaThumbtack, FaSearch, FaTh, FaList } from 'react-icons/fa'

const BlogPostCard = ({ post, viewMode, defaultAuthorName, onClick }) => {
  const authorName = post?.author?.name || post?.author_name || defaultAuthorName || null

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
        onClick={() => onClick(post)}
      >
        <div className="flex flex-row">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-64 lg:h-auto overflow-hidden flex-shrink-0">
            <img
              src={post.featured_image_url || post.content?.hero?.image_url || '/blog-placeholder.jpg'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-3 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              {post.is_pinned && (
                <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100 flex items-center gap-1">
                  <FaThumbtack className="text-xs" /> Pinned
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
              {post.excerpt || post.content?.hero?.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {authorName && (
                <span className="flex items-center gap-1">
                  <FaUser /> {authorName}
                </span>
              )}
              {post.created_at && (
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> {formatDate(post.created_at)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid card (default)
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col"
      onClick={() => onClick(post)}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={post.featured_image_url || post.content?.hero?.image_url || '/blog-placeholder.jpg'}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {post.is_pinned && (
          <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-white/90 backdrop-blur-sm flex items-center gap-1 shadow-sm">
            <FaThumbtack className="text-xs" /> Pinned
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
          {post.excerpt || post.content?.hero?.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {authorName && (
              <span className="flex items-center gap-1">
                <FaUser /> {authorName}
              </span>
            )}
            {post.created_at && (
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {formatDate(post.created_at)}
              </span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * BlogList — renders all published posts for the configured org.
 * Navigation is handled by the `onPostClick` prop on BlogProvider.
 */
const BlogList = ({ className = '' }) => {
  const { posts, settings, loading, error, onPostClick } = useBlogContext()
  const [viewMode, setViewMode] = useState('grid')
  const [search, setSearch] = useState('')

  const handlePostClick = (post) => {
    if (onPostClick) onPostClick(post)
  }

  const filteredPosts = posts.filter((post) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      post.tags?.some((t) => t.toLowerCase().includes(q))
    )
  })

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-20 ${className}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-center py-20 text-red-500 ${className}`}>
        Failed to load blog posts: {error}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-20 text-gray-400 ${className}`}>
        No posts published yet.
      </div>
    )
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-10 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        {settings?.blog_title && (
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{settings.blog_title}</h1>
        )}
        {settings?.blog_description && (
          <p className="text-gray-500">{settings.blog_description}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaTh />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No posts match your search.</div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              viewMode={viewMode}
              defaultAuthorName={settings?.default_author_name}
              onClick={handlePostClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
