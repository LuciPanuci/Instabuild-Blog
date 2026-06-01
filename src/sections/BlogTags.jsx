import React from 'react'
import { FaBookOpen, FaChartBar } from 'react-icons/fa'
import { BlogEditableSection } from '../internal/EditableStubs'

const BlogTags = ({ post }) => {
  const metadataData = post?.metadata || {}
  const tags = metadataData?.tags || post?.tags || []
  const categories = metadataData?.categories || post?.categories || []

  if (tags.length === 0 && categories.length === 0) return null

  return (
    <BlogEditableSection>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 space-y-3">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs uppercase tracking-wide text-gray-500 border-r border-gray-200 pr-2 last:border-r-0"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat, i) => (
                        <span key={i} className="text-xs font-medium text-gray-700">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaBookOpen className="text-sm" />
                    <span>{metadataData?.reading_time || '5-7 minutes'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartBar className="text-sm" />
                    <span className="capitalize">{metadataData?.difficulty || 'Intermediate'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <div className="w-2 h-2 rounded-full bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlogEditableSection>
  )
}

export default BlogTags
