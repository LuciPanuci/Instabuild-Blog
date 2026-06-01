import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'

// Baked in at build time via vite.config.js define
const SUPABASE_URL = __INSTABUILD_SUPABASE_URL__
const SUPABASE_ANON_KEY = __INSTABUILD_SUPABASE_ANON_KEY__

const BlogContext = createContext(null)

export const useBlogContext = () => {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error('useBlogContext must be used within a BlogProvider')
  return ctx
}

/**
 * BlogProvider — the only thing consumers need to configure.
 *
 * @param {string}   orgId       - Your InstaBuild organization UUID (from your dashboard)
 * @param {function} onPostClick - Called with (post) when a post card is clicked. Use this
 *                                 to navigate: e.g. navigate(`/blog/${post.slug}`)
 * @param {function} onCtaClick  - Called when a CTA button in a blog post is clicked.
 *                                 Receives the section data so you can route however you want.
 */
export const BlogProvider = ({ orgId, children, onPostClick, onCtaClick }) => {
  const [posts, setPosts] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const supabase = useMemo(
    () => createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } }),
    []
  )

  useEffect(() => {
    if (!orgId) {
      setError('orgId is required')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [postsResult, settingsResult] = await Promise.all([
          supabase
            .from('blog_posts')
            .select('*')
            .eq('organization_id', orgId)
            .eq('status', 'published')
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false }),
          supabase
            .from('blog_settings')
            .select('*')
            .eq('organization_id', orgId)
            .single(),
        ])

        if (postsResult.error) throw postsResult.error
        setPosts(postsResult.data || [])
        setSettings(settingsResult.data || {})
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [orgId])

  const getPostBySlug = useCallback(
    async (slug) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('organization_id', orgId)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) throw error
      return data
    },
    [orgId, supabase]
  )

  const value = {
    posts,
    blogPosts: posts, // alias used internally by section components
    settings,
    blogSettings: settings, // alias used internally by section components
    loading,
    error,
    canEdit: false, // always false in the package — no write ops
    getPostBySlug,
    onPostClick,
    onCtaClick,
  }

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

// Internal hook used by section components (mirrors the original useBlog API)
export const useBlog = () => useBlogContext()
