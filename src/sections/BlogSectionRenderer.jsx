import React from 'react'
import BlogComparison from './BlogComparison'
import BlogPricingCards from './BlogPricingCards'
import BlogColumnGrid from './BlogColumnGrid'

const SECTION_COMPONENTS = {
  comparison:    BlogComparison,
  pricing_cards: BlogPricingCards,
  column_grid:   BlogColumnGrid,
}

const BlogSectionRenderer = ({ section }) => {
  if (!section?.type) return null

  const Component = SECTION_COMPONENTS[section.type]
  if (!Component) return null

  return <Component section={section} />
}

export default BlogSectionRenderer
