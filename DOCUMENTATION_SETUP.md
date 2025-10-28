# @libraries Documentation Setup

This guide documents the Nextra-based documentation site configuration for the @libraries monorepo following latest best practices.

## Overview

The documentation site showcases three main packages:

- **@libraries/hooks** - 7 React hooks for common use cases
- **@libraries/utilities** - 8 TypeScript utilities for data manipulation and API communication
- **@libraries/components** - Accessible React UI components

## Technology Stack

- **Framework**: Next.js 16.0.0
- **Documentation**: Nextra 4.6.0 with nextra-theme-docs
- **Styling**: Tailwind CSS 4 with PostCSS
- **Search**: Built-in Flexsearch with code block support
- **Search UI**: Pagefind integration for advanced search

## Project Structure

```
packages/docs/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Modern landing page
│   ├── layout.tsx               # Root layout with Nextra theme
│   ├── _meta.ts                 # Nextra navigation config
│   ├── introduction.mdx         # Getting started guide
│   ├── globals.css              # Global styles
│   │
│   ├── hooks/                   # Hooks documentation
│   │   ├── _meta.ts             # Hook section navigation
│   │   ├── page.mdx             # Hooks overview
│   │   ├── use-form.mdx
│   │   ├── use-disclosure.mdx
│   │   ├── use-keyboard-shortcut.mdx
│   │   ├── use-local-storage.mdx
│   │   ├── use-toggle.mdx
│   │   ├── use-event-listener.mdx
│   │   └── use-previous.mdx
│   │
│   ├── utilities/               # Utilities documentation
│   │   ├── _meta.ts             # Utilities section navigation
│   │   ├── page.mdx             # Utilities overview
│   │   ├── api-fetch.mdx
│   │   ├── build-page-metadata.mdx
│   │   ├── clamp.mdx
│   │   ├── debounce.mdx
│   │   ├── throttle.mdx
│   │   ├── try-catch.mdx
│   │   ├── format-date.mdx
│   │   └── get-user-initials.mdx
│   │
│   └── components/              # Components documentation
│       ├── _meta.ts             # Components section navigation
│       ├── page.mdx             # Components overview
│       └── button.mdx
│
├── mdx-components.ts            # Custom MDX component overrides
├── next.config.ts               # Next.js + Nextra configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── package.json
└── README.md
```

## Key Features Implemented

### 1. Landing Page (`app/page.tsx`)

- Modern hero section with brand messaging
- Feature cards for each package (hooks, utilities, components)
- Installation instructions
- Responsive design with dark mode support
- Quick navigation buttons to documentation sections

### 2. Navigation Structure (`_meta.ts` files)

- Root-level navigation with Home (hidden), Introduction, Hooks, Utilities, Components
- Organized sub-sections for each package
- Hooks: 7 individual hook pages
- Utilities: 8 individual utility pages
- Components: 1 button component page (extensible)

### 3. Nextra Configuration (`next.config.ts`)

- **Search**: Flexsearch with code block indexing
- **LaTeX**: Math formula support
- **Code**: Default copy button for code blocks
- **Redirects**: Old `/docs` URLs redirect to root

### 4. Theme Customization (`app/layout.tsx`)

- Custom navbar with `@libraries` branding
- Footer with copyright and license
- Edit link for GitHub contributions
- Repository link for GitHub access
- SEO metadata for the entire site

### 5. MDX Components (`mdx-components.ts`)

- Integration with nextra-theme-docs components
- Extensible for custom React components

### 6. Dark Mode Support

- Automatic light/dark theme detection
- Smooth transitions
- Tailwind-based styling

## Documentation Pages

### Hooks Section

Each hook has dedicated documentation with:

- Usage examples
- API reference
- Parameter documentation
- Return value documentation
- Common use cases

### Utilities Section

Each utility has dedicated documentation with:

- Usage examples with TypeScript
- API reference
- Parameter documentation
- Return types
- Common use cases

### Components Section

Each component has dedicated documentation with:

- Usage examples
- Props documentation
- Accessibility features
- Variant examples
- Size options

## Running the Documentation

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Search Index

The build process generates a Pagefind search index:

```bash
npm run build
# Generates .next/server/app and public/_pagefind
```

## Configuration Details

### Nextra Options (`next.config.ts`)

```typescript
{
  latex: true,                    // LaTeX/Math support
  search: {
    codeblocks: true              // Index code blocks
  },
  defaultShowCopyCode: true,       // Show copy button on code blocks
  flexsearch: {
    codeblocks: true              // Flexsearch code blocks
  }
}
```

### Theme Props (`Layout` component)

- `navbar` - Navigation bar with logo and links
- `pageMap` - Automatically generated from file structure
- `docsRepositoryBase` - GitHub edit links
- `footer` - Footer content
- `editLink` - Edit link text

## Best Practices Implemented

### 1. DRY (Don't Repeat Yourself)

- Reusable documentation templates
- Consistent structure across all pages
- Shared layout components

### 2. Performance

- Static page generation with Next.js
- Optimized bundle size with tree-shaking
- Search indexing with Flexsearch
- Code syntax highlighting

### 3. Accessibility

- Semantic HTML structure
- ARIA labels where needed
- High contrast dark/light modes
- Keyboard navigation support

### 4. Developer Experience

- MDX for flexible content
- Easy to add new documentation pages
- Hot reload during development
- Type-safe configuration

### 5. User Experience

- Modern landing page design
- Fast search with code block support
- Mobile-responsive layout
- Dark mode support
- Clear navigation structure

## Customization Guide

### Adding New Hook Documentation

1. Create `app/hooks/[hook-name].mdx`
2. Add entry to `app/hooks/_meta.ts`
3. Follow the template from existing hooks

### Adding New Utility Documentation

1. Create `app/utilities/[utility-name].mdx`
2. Add entry to `app/utilities/_meta.ts`
3. Follow the template from existing utilities

### Adding New Component Documentation

1. Create `app/components/[component-name].mdx`
2. Add entry to `app/components/_meta.ts`
3. Follow the template from existing components

### Customizing Theme

Edit `app/layout.tsx`:

- Change `logo` to update branding
- Change `projectLink` for GitHub repository
- Modify `footer` content
- Update `docsRepositoryBase` for edit links

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### GitHub Pages

Configure Next.js static export and deploy to GitHub Pages.

### Netlify

Connect the repository and deploy with automated builds.

## SEO Optimization

- Page titles and descriptions in metadata
- Open Graph meta tags
- Canonical URLs
- Structured heading hierarchy
- Descriptive image alt text
- Semantic HTML structure

## Next Steps

1. Update GitHub links in `app/layout.tsx`
2. Customize colors in `globals.css` if needed
3. Add more components to `app/components/` as library grows
4. Deploy to preferred hosting platform
5. Monitor search analytics

## References

- [Nextra Documentation](https://nextra.site)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)
