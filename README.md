# instabuild-blog

Drop-in React blog powered by [InstaBuild](https://app.instabuild.website)'s AI blog engine.

- **App:** [app.instabuild.website](https://app.instabuild.website) — create posts, get your `orgId`
- **Source:** [github.com/LuciPanuci/Instabuild-Blog](https://github.com/LuciPanuci/Instabuild-Blog)

One prop. Full blog. Headless styling.

## Install

```bash
npm install instabuild-blog
```

## Usage

```jsx
import { BlogProvider, BlogList, BlogPost } from 'instabuild-blog'

// Blog list page
function BlogPage() {
  return (
    <BlogProvider
      orgId="your-org-uuid"
      onPostClick={(post) => navigate(`/blog/${post.slug}`)}
    >
      <BlogList />
    </BlogProvider>
  )
}

// Single post page
function BlogPostPage({ params }) {
  return (
    <BlogProvider
      orgId="your-org-uuid"
      onPostClick={(post) => navigate(`/blog/${post.slug}`)}
      onCtaClick={(section) => navigate('/contact')}
    >
      <BlogPost slug={params.slug} />
    </BlogProvider>
  )
}
```

## BlogProvider props

| Prop | Type | Required | Description |
|---|---|---|---|
| `orgId` | string | ✅ | Your InstaBuild organization UUID. Find it in your InstaBuild dashboard. |
| `onPostClick` | function | | Called with `(post)` when a post card is clicked. Use this to navigate. |
| `onCtaClick` | function | | Called with `(section, type)` when a CTA button in a blog post is clicked. |

## BlogList props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | string | `''` | Extra CSS classes on the wrapper |

## BlogPost props

| Prop | Type | Required | Description |
|---|---|---|---|
| `slug` | string | ✅ | The post slug (from your router params) |
| `className` | string | | Extra CSS classes on the wrapper |

## Styling

Headless by default — the package uses Tailwind utility classes but doesn't inject any CSS.
Add Tailwind to your project and it all works out of the box.

If you don't use Tailwind, you can override any class or wrap sections in your own containers
using the individually exported section components.

```jsx
import { BlogProvider, useBlog, BlogHero, BlogContent, BlogAuthor, BlogTags } from 'instabuild-blog'

function MyCustomPost({ slug }) {
  const { posts, getPostBySlug } = useBlog()
  // build your own layout using the section components
}
```

## License

MIT
