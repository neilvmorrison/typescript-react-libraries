# Quick Start Guide

## 🎯 Installation

### For Your Own Applications

Install packages individually from npm (after publishing):

```bash
npm install @libraries/utilities @libraries/hooks @libraries/primitives
```

### During Development

For local development, link packages:

```bash
cd /path/to/your-app
npm link /Users/neilmorrison/libraries/packages/utilities/dist
npm link /Users/neilmorrison/libraries/packages/hooks/dist
npm link /Users/neilmorrison/libraries/packages/primitives/dist
```

## 📚 Usage Examples

### TypeScript Utilities

```typescript
import {
  get_user_initials,
  format_date,
  clamp,
  debounce,
  throttle,
} from '@libraries/utilities';

// Get initials
const initials = get_user_initials('John Doe'); // 'JD'

// Format dates
const date = new Date('2024-01-15');
format_date(date, 'short'); // '01/15/2024'
format_date(date, 'long'); // 'Monday, January 15, 2024'

// Clamp values
clamp(150, 0, 100); // 100

// Debounce
const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 500);

// Throttle
const throttledResize = throttle(() => {
  console.log('Resizing...');
}, 250);
```

### React Hooks

```typescript
import {
  useForm,
  useKeyboardShortcut,
  usePrevious,
  useLocalStorage,
} from '@libraries/hooks';

// useForm
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validate: (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    return errors;
  },
  onSubmit: async (values) => {
    await api.login(values);
  },
});

// useKeyboardShortcut
useKeyboardShortcut({
  key: 's',
  modifiers: ['ctrl'],
  onPress: () => console.log('Ctrl+S pressed'),
});

// usePrevious
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

// useLocalStorage
const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');
```

### React Primitives

```typescript
import {
  Button,
  Input,
  Alert,
  Modal,
  Drawer,
  Icon,
  Toast,
  useToast,
  ModalProvider,
} from '@libraries/primitives';
import { FiCheck } from 'react-icons/fi';

// Button
<Button variant="primary" size="lg">
  Submit
</Button>

// Input with error
<Input
  label="Email"
  type="email"
  error={errors.email}
  value={values.email}
  onChange={handleChange}
/>

// Alert
<Alert variant="success" title="Success" onClose={() => {}}>
  Operation completed successfully
</Alert>

// Modal
const [isOpen, setIsOpen] = useState(false);
<Modal
  isOpen={isOpen}
  title="Confirm Delete"
  onClose={() => setIsOpen(false)}
  onConfirm={() => deleteItem()}
>
  Are you sure you want to delete this item?
</Modal>

// Drawer
<Drawer
  isOpen={isOpen}
  position="right"
  onClose={() => setIsOpen(false)}
  width="400px"
>
  <h2>Sidebar Content</h2>
</Drawer>

// Icon
<Icon icon={<FiCheck />} size="md" color="#10b981" />

// Toast
const toast = useToast();
toast.success('Saved!');
toast.error('Something went wrong');
toast.promise(
  api.fetchData(),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load',
  }
);

// Modal Context Provider - wrap your app
<ModalProvider>
  <YourApp />
</ModalProvider>
```

## 🛠️ Development Workflow

### Start Development

Watch mode for all packages:

```bash
npm run dev
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Formatting

```bash
npm run format
npm run format:check
```

### Building

Build all packages:

```bash
npm run build
```

Each package's `dist/` directory contains production-ready code with:

- ESM JavaScript
- TypeScript declarations
- Source maps

### Testing

Run all tests:

```bash
npm test
```

With UI:

```bash
npm run test:ui
```

## 📦 Publishing to npm

1. Build all packages:

   ```bash
   npm run build
   ```

2. Update versions in each package's `package.json`

3. Publish each package:
   ```bash
   cd packages/utilities && npm publish
   cd packages/hooks && npm publish
   cd packages/primitives && npm publish
   ```

## 🎨 Theming with CSS Modules

All primitives components use CSS modules for scoped styling. Customize by:

1. Creating a CSS module override
2. Importing the component normally
3. Using CSS modules composition:

```css
.customButton {
  composes: button from '@libraries/primitives/dist/components/button.module';
  background-color: #your-color;
}
```

## ✅ Best Practices

- **Type Safety**: Always import types, never use `any`
- **Tree Shaking**: Import specific utilities, not entire packages
- **Performance**: Wrap hooks and contexts appropriately
- **Accessibility**: All components follow WCAG guidelines
- **CSS Modules**: Use BEM naming in CSS for clarity

## 🚀 Next Steps

1. Update package versions to match your release cycle
2. Configure `.npmrc` for publishing to your registry
3. Set up CI/CD for automated testing and publishing
4. Create Storybook for component documentation
5. Add changeset management for semantic versioning
