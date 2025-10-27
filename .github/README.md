# 📦 Libraries Monorepo - Start Here

Welcome to your production-ready TypeScript monorepo! This directory contains three fully configured packages ready for development, testing, and publishing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development (watch mode)
npm run dev

# Build all packages
npm run build

# Run tests
npm test

# Check types
npm run type-check

# Fix linting issues
npm run lint:fix
```

## 📚 Documentation

1. **[README.md](../README.md)** - Complete project documentation with features and design principles
2. **[QUICK_START.md](../QUICK_START.md)** - Practical usage examples for each package
3. **[SETUP_SUMMARY.md](../SETUP_SUMMARY.md)** - Setup overview and next steps

## 🎯 Your Three Packages

### 1. TypeScript Utilities (`@libraries/utilities`)
Pure, dependency-free utility functions.

```typescript
import { get_user_initials, format_date, debounce } from '@libraries/utilities';
```

- Get user initials from names
- Format dates
- Clamp, debounce, throttle

### 2. React Hooks (`@libraries/hooks`)
Production-ready React hooks following best practices.

```typescript
import { useForm, useKeyboardShortcut, useLocalStorage } from '@libraries/hooks';
```

- Form management
- Keyboard shortcuts
- Local storage sync
- Track previous values

### 3. UI Primitives (`@libraries/primitives`)
Beautiful, accessible React components with CSS modules.

```typescript
import { Button, Input, Modal, Drawer, Alert, Icon } from '@libraries/primitives';
```

- Buttons with variants (primary, secondary, danger, success, warning)
- Forms with validation
- Modals and drawers
- Alerts and toast notifications
- Global modal context

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Watch mode for active development |
| `npm run build` | Build all packages for distribution |
| `npm test` | Run tests across all packages |
| `npm run test:ui` | Open Vitest UI dashboard |
| `npm run type-check` | Verify all TypeScript types |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Automatically fix linting issues |
| `npm run format` | Format code with Prettier |

## 📦 Package Information

Each package is fully self-contained with:
- ✅ Standalone `tsconfig.json`
- ✅ Independent `package.json`
- ✅ Proper ESM exports
- ✅ TypeScript declarations
- ✅ Source maps for debugging

Built output is in `packages/*/dist/` directories.

## 🎨 Architecture

### Monorepo Structure
- **Root workspace** - Manages all packages
- **Turbo** - Orchestrates builds and caching
- **npm workspaces** - Local dependency management
- **Shared TypeScript config** - Consistent compiler settings

### Type Safety
- Strict TypeScript (no `any` types)
- Interfaces prefixed with `I`
- snake_case for utilities
- camelCase for React code

### Styling
- CSS Modules for all components
- Theme-friendly color palette
- BEM-like naming conventions
- Mobile-responsive design

## 🔄 Workflow Example

```bash
# 1. Start developing
npm run dev

# 2. Edit files in packages/*/src/
# 3. Turbo automatically rebuilds

# 4. Run tests
npm test

# 5. Fix issues
npm run lint:fix
npm run format

# 6. Type check before commit
npm run type-check

# 7. Build for production
npm run build

# 8. Publish (when ready)
cd packages/utilities && npm publish
```

## 📋 Key Files

```
libraries/
├── README.md                  ← Full documentation
├── QUICK_START.md            ← Usage examples
├── SETUP_SUMMARY.md          ← Setup details
├── package.json              ← Root workspace config
├── tsconfig.json             ← Shared TS config
├── turbo.json                ← Build config
├── vitest.config.ts          ← Test config
├── .eslintrc.json            ← Linting config
├── .prettierrc.json          ← Formatting config
└── packages/
    ├── utilities/
    ├── hooks/
    └── primitives/
```

## ✅ Verification Checklist

Your setup is verified:
- ✅ Dependencies installed
- ✅ TypeScript configured
- ✅ ESLint + Prettier ready
- ✅ Vitest configured
- ✅ All packages build successfully
- ✅ Type checking passes
- ✅ Ready for production use

## 🎯 Next Steps

1. **Explore the code** - Check each package's `src/` directory
2. **Run the dev server** - `npm run dev`
3. **Read QUICK_START.md** - See practical examples
4. **Add your first feature** - Create a new utility or hook
5. **Publish when ready** - See SETUP_SUMMARY.md for publishing guide

## 🤔 Need Help?

- Check individual package README files
- Review QUICK_START.md for usage examples
- Look at existing code as reference
- All code is well-typed for IDE autocomplete

## 🚀 Ready to Build!

Your monorepo is production-ready. Start coding and building amazing things! 🎉

---

**Happy coding!** Feel free to expand this with more packages, utilities, hooks, and components as needed.
