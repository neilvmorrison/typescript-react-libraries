# Component Library Test Setup

## Overview

The component library includes comprehensive tests for all components with a target coverage of **80%+** across lines, functions, branches, and statements.

## Test Files

- **`button/button.test.tsx`** - Button component tests (11 test cases)
- **`typography/typography.test.tsx`** - Typography component tests (20 test cases)
- **`surface/surface.test.tsx`** - Surface component tests (13 test cases)

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests with UI

```bash
npm test:ui
```

### Run tests with coverage report

```bash
npm test:coverage
```

### Run specific test file

```bash
npm test button.test.tsx
```

### Watch mode

```bash
npm test -- --watch
```

## Coverage Goals

The project enforces **80% minimum coverage** for:

- **Lines**: Code execution coverage
- **Functions**: All function invocations covered
- **Branches**: All conditional branches tested
- **Statements**: All statements executed

Current coverage targets are configured in `vitest.config.ts`.

## Test Structure

Each test file follows this pattern:

1. **Rendering Tests**: Verify components render correctly
2. **Props Tests**: Test all component props and prop combinations
3. **Ref Tests**: Verify `forwardRef` functionality
4. **Attribute Tests**: Test HTML attributes and accessibility
5. **Event Handling**: Test user interactions
6. **Edge Cases**: Handle empty content, nested components, etc.

## Component Coverage

### Button Component

- Rendering and text content
- Variant and size props
- Click event handling
- Ref forwarding
- HTML attribute spreading
- Disabled state
- Multiple children
- Display name

### Typography Component

- Default element rendering (p)
- All element types (h1-h6, span, div, label, blockquote)
- Polymorphic rendering
- Size, weight, and color props
- Text alignment and truncation
- Custom className and attributes
- Complex children rendering
- Ref forwarding for all element types
- Display name

### Surface Component

- Rendering as div
- Text and JSX children
- Ref forwarding
- HTML attributes and styling
- ARIA attributes
- Event handlers
- Nested surfaces
- Display name
- Data attributes

## Testing Libraries

- **vitest**: Fast unit test framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM simulation for Node.js

## Best Practices

1. **Use semantic queries**: `getByRole`, `getByText`, `getByTestId`
2. **Test behavior, not implementation**: Test what users see/do
3. **Isolate tests**: Use `unmount()` when testing multiple components in one test
4. **Accessibility first**: Use ARIA attributes and semantic HTML
5. **Clean up**: Component tests properly clean up after themselves

## Next Steps

To maintain coverage:

1. Write tests for new components before adding them
2. Run coverage reports regularly
3. Update tests when component props/behavior changes
4. Add edge case tests for complex components
