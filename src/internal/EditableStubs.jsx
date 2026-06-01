/**
 * No-op stubs for InstaBuild's internal editable components.
 * In the npm package canEdit is always false, so these just render display mode.
 */
import React from 'react'

// Renders children directly — no edit overlay
export const BlogEditableSection = ({ children }) => <>{children}</>

// Renders text in a styled element
export const BlogEditableText = ({ text, className, style, multiline }) => {
  if (multiline) {
    return (
      <div className={className} style={style}>
        {text}
      </div>
    )
  }
  return (
    <span className={className} style={style}>
      {text}
    </span>
  )
}

// Renders rich HTML content
export const BlogEditableContent = ({ content, className, style }) => (
  <div
    className={className}
    style={style}
    dangerouslySetInnerHTML={{ __html: content || '' }}
  />
)

// Renders a plain image
export const BlogEditableImage = ({ src, alt, className, style }) => (
  <img src={src} alt={alt || ''} className={className} style={style} />
)
