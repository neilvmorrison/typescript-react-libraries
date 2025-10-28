# @libraries Documentation

Comprehensive documentation site for the @libraries monorepo, built with [Nextra](https://nextra.site) and [Next.js](https://nextjs.org).

## About

This site documents three main packages:

- **@libraries/hooks** - React hooks for common use cases
- **@libraries/utilities** - TypeScript utilities
- **@libraries/components** - Accessible React components

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

### Build

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx              # Landing page
├── layout.tsx            # Root layout with Nextra theme
├── _meta.ts              # Navigation structure
├── introduction.mdx      # Introduction page
├── hooks/                # Hooks documentation
│   ├── _meta.ts
│   ├── page.mdx
│   └── [hook-name].mdx
├── utilities/            # Utilities documentation
│   ├── _meta.ts
│   ├── page.mdx
│   └── [utility-name].mdx
└── components/           # Components documentation
    ├── _meta.ts
    ├── page.mdx
    └── [component-name].mdx
```

## Key Features

- **MDX Support** - Write documentation with interactive React components
- **Full-text Search** - Built-in search with Flexsearch
- **Dark Mode** - Automatic light/dark theme support
- **Responsive Design** - Mobile-friendly documentation
- **Code Highlighting** - Syntax highlighting with copy button
- **Navigation** - Automatic sidebar and breadcrumb navigation

## Customization

### Theme Configuration

Edit `app/layout.tsx` to customize:

- Logo and branding
- Navigation links
- Footer content
- GitHub repository link

### MDX Components

Custom components can be added in `mdx-components.ts`.

## Deployment

Deploy to Vercel for free:

```bash
npm install -g vercel
vercel
```

Or deploy to your preferred hosting platform (Netlify, GitHub Pages, etc.).

## Learn More

- [Nextra Documentation](https://nextra.site/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
