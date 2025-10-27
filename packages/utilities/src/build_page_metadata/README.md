# build_page_metadata

Build Next.js 15+ compatible page metadata objects for SEO and social sharing.

## Usage

```typescript
import { build_page_metadata } from '@repo/utilities';

export const metadata = build_page_metadata({
  title: 'My Page',
  description: 'Page description',
  canonical_url: 'https://example.com/page',
  keywords: ['react', 'seo'],
  og: {
    type: 'article',
    images: [{ url: 'https://example.com/og.png', alt: 'Page preview' }],
    article: {
      published_time: '2025-10-27',
      authors: ['John Doe'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@myhandle',
  },
});
```

## Features

- Open Graph support (website, article, product, book, profile)
- Twitter Card integration
- Multi-language support via alternate URLs
- Author attribution
- Publication metadata
- Zero external dependencies
- Full TypeScript support
