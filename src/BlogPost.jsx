import React, { useState, useEffect } from 'react'
import { useBlogContext } from './BlogProvider'
import BlogHero from './sections/BlogHero'
import BlogIntroduction from './sections/BlogIntroduction'
import BlogContent from './sections/BlogContent'
import BlogAuthor from './sections/BlogAuthor'
import BlogTags from './sections/BlogTags'
import BlogSectionRenderer from './sections/BlogSectionRenderer'
import RelatedBlogPosts from './RelatedBlogPosts'

/**
 * BlogPost — renders a single published blog post by slug.
 *
 * @param {string} slug - The post slug (usually from your router params)
 */
const BlogPost = ({ slug, className = '' }) => {
  const { getPostBySlug } = useBlogContext()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getPostBySlug(slug)
        if (!data) throw new Error('Post not found')
        setPost(data)

        // Set document title + OG tags
        document.title = data.title || 'Blog Post'
        const setMeta = (prop, val, byName = false) => {
          const attr = byName ? `name` : `property`
          let el = document.querySelector(`meta[${attr}="${prop}"]`)
          if (!el) {
            el = document.createElement('meta')
            el.setAttribute(attr, prop)
            document.head.appendChild(el)
          }
          el.setAttribute('content', val)
        }
        const img = data.content?.hero?.image_url || data.featured_image_url || ''
        setMeta('og:title', data.title || '')
        setMeta('og:description', data.excerpt || '')
        setMeta('og:type', 'article')
        if (img) setMeta('og:image', img)
        setMeta('description', data.excerpt || '', true)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug])

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-20 ${className}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className={`text-center py-20 text-gray-500 ${className}`}>
        {error || 'Post not found'}
      </div>
    )
  }

  // Extract sections from post content
  const content = post.content || {}
  const introSection = content.introduction
    ? { type: 'introduction', content: content.introduction }
    : content.sections?.find((s) => s.type === 'introduction')

  const additionalSections = content.sections?.filter(
    (s) => s.type !== 'introduction' && s.type !== 'main_content' && s.type !== 'conclusion'
  ) || []

  const mainContentSections = content.sections?.filter((s) => s.type === 'main_content') || []
  const conclusionSection = content.sections?.find((s) => s.type === 'conclusion')

  return (
    <div className={className}>
      <BlogHero post={post} />

      {introSection && <BlogIntroduction section={introSection} />}

      {/* Additional section types (comparison, pricing cards, etc.) after intro */}
      {additionalSections
        .filter((s) => s.position === 'after_intro')
        .map((section, i) => (
          <BlogSectionRenderer key={section.id || i} section={section} index={i} />
        ))}

      {mainContentSections.map((section, i) => (
        <BlogContent key={section.id || i} section={section} sectionIndex={i} />
      ))}

      {/* Additional sections in content */}
      {additionalSections
        .filter((s) => s.position === 'in_content' || !s.position)
        .map((section, i) => (
          <BlogSectionRenderer key={section.id || i} section={section} index={i} />
        ))}

      {conclusionSection && (
        <BlogContent section={conclusionSection} sectionIndex={mainContentSections.length} />
      )}

      <BlogAuthor post={post} />
      <BlogTags post={post} />
      <RelatedBlogPosts currentPost={post} />
    </div>
  )
}

export default BlogPost
