# Libraries Monorepo

A comprehensive TypeScript monorepo for developing, testing, packaging, and deploying reusable utilities, hooks, and UI primitives.

## 📦 Packages

### [@libraries/utilities](./packages/utilities)
Pure TypeScript utility functions with zero dependencies.

**Features:**
- `get_user_initials` - Extract user initials from full names
- `format_date` - Format dates in short or long format
- `clamp` - Clamp numeric values between min/max
- `debounce` - Debounce function calls
- `throttle` - Throttle function calls

```typescript
import { get_user_initials, format_date, debounce } from '@libraries/utilities';
```

### [@libraries/hooks](./packages/hooks)
React hooks following React best practices and patterns.

**Features:**
- `useForm` - Form state management with validation
- `useKeyboardShortcut` - Handle keyboard events
- `usePrevious` - Track previous value
- `useLocalStorage` - Persist state to localStorage

```typescript
import { useForm, useKeyboardShortcut } from '@libraries/hooks';
```

### [@libraries/primitives](./packages/primitives)
Modern React UI components with CSS modules for themeing.

**Features:**
- `Button` - Flexible button component with variants
- `Input` - Form input with labels and error states
- `Alert` - Dismissible alert component
- `Modal` - Dialog component with overlay
- `Drawer` - Slide-in drawer from left/right
- `Icon` - Wrapper for react-icons
- `Toast` - Toast notifications using Sonner
- `ModalProvider` - Global modal management context

```typescript
import { Button, Input, Alert, Modal, Drawer } from '@libraries/primitives';
import { ModalProvider } from '@libraries/primitives';
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Build all packages in watch mode:

```bash
npm run dev
```

### Building

Build all packages for distribution:

```bash
npm run build
```

### Testing

Run tests across all packages:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

### Code Quality

Type checking:

```bash
npm run type-check
```

Linting:

```bash
npm run lint
npm run lint:fix
```

Formatting:

```bash
npm run format
npm run format:check
```

## 📋 Project Structure

```
libraries/
├── packages/
│   ├── utilities/
│   │   ├── src/
│   │   │   ├── index.ts           # Main exports
│   │   │   └── index.test.ts      # Tests
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── dist/                  # Built output
│   │
│   ├── hooks/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── use_form.ts
│   │   │   ├── use_keyboard_shortcut.ts
│   │   │   ├── use_previous.ts
│   │   │   └── use_local_storage.ts
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── dist/
│   │
│   └── primitives/
│       ├── src/
│       │   ├── index.ts
│       │   ├── components/
│       │   │   ├── button.tsx
│       │   │   ├── button.module.css
│       │   │   ├── input.tsx
│       │   │   ├── input.module.css
│       │   │   ├── alert.tsx
│       │   │   ├── alert.module.css
│       │   │   ├── modal.tsx
│       │   │   ├── modal.module.css
│       │   │   ├── drawer.tsx
│       │   │   ├── drawer.module.css
│       │   │   ├── icon.tsx
│       │   │   ├── icon.module.css
│       │   │   └── toast.tsx
│       │   ├── context/
│       │   │   └── modal_context.tsx
│       │   ├── types/
│       │   │   └── index.ts
│       │   ├── tsconfig.json
│       │   ├── package.json
│       │   └── dist/
│
├── tsconfig.json                  # Root TypeScript config
├── package.json                   # Root package with workspaces
├── turbo.json                     # Turbo build orchestration
├── vitest.config.ts              # Testing configuration
├── .eslintrc.json                # Linting rules
└── .prettierrc.json              # Formatting rules
```

## 🎯 Design Principles

- **DRY**: Reusable, composable utilities and components
- **Type-Safe**: Full TypeScript with strict settings, no `any` types
- **Modular**: Each package is independently buildable and publishable
- **Production-Ready**: Follows best practices for enterprise applications
- **Themeable**: CSS modules enable consistent styling across components
- **Minimal Dependencies**: Peer dependencies only, encouraging tree-shaking

## 📦 Publishing

Each package has:
- Proper ESM/CJS exports configured
- TypeScript definitions included
- Source maps for debugging
- Ready for npm/npm-compatible registries

```bash
# Build all packages
npm run build

# Each package's dist/ contains production-ready code
```

## 🔧 Adding New Packages

1. Create directory under `packages/`
2. Add `package.json` with unique scoped name (`@libraries/*`)
3. Create `src/` and `tsconfig.json`
4. Add scripts to root `package.json` if needed
5. Turbo will automatically include it in pipelines

## 🤝 Contributing

All code follows these standards:
- Snake_case for server-side TypeScript code
- camelCase for React components and hooks
- Comprehensive TypeScript types (no `any`)
- Minimal comments in source
- ESLint and Prettier enforced

## 📄 License

MIT

