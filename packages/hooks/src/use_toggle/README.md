# useToggle

Manages toggle state with support for both boolean toggling and cycling through predefined values.

## Usage

```typescript
import { useToggle } from '@your-org/hooks';

// Boolean mode
function LightSwitch() {
  const [isOn, toggle] = useToggle(false);
  return <button onClick={toggle}>{isOn ? 'On' : 'Off'}</button>;
}

// Array cycling mode
function ThemeSelector() {
  const [theme, toggle] = useToggle(['light', 'dark', 'auto']);
  return <button onClick={toggle}>Theme: {theme}</button>;
}
```

## Parameters

- `initialValue` (boolean | string[]) - Initial state as either a boolean or array of values to cycle through

## Returns

- `[value: boolean | string, toggle: () => void]`

## Description

Provides toggle functionality for managing binary states or cycling through a predefined set of values. In boolean mode, it alternates between `true` and `false`. In array mode, it cycles through each value sequentially, wrapping around to undefined after the last value.

## Examples

### Boolean Toggle

```typescript
function DarkModeToggle() {
  const [isDarkMode, toggle] = useToggle(false);

  return (
    <button onClick={toggle}>
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

### Theme Cycling

```typescript
function ThemeToggle() {
  const [theme, toggleTheme] = useToggle(['light', 'dark', 'auto']);

  return (
    <div>
      <button onClick={toggleTheme}>Current Theme: {theme}</button>
      <style>{`body { background: ${theme === 'dark' ? '#222' : '#fff'} }`}</style>
    </div>
  );
}
```

### Visibility Toggle

```typescript
function PasswordInput() {
  const [showPassword, toggleVisibility] = useToggle(false);

  return (
    <div>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
      />
      <button onClick={toggleVisibility}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
```

### Layout Mode Toggle

```typescript
function LayoutToggle() {
  const [layout, toggleLayout] = useToggle(['grid', 'list']);

  return (
    <>
      <button onClick={toggleLayout}>
        View: {layout === 'grid' ? '📊 Grid' : '📋 List'}
      </button>
      <div className={`layout-${layout}`}>
        {/* Content renders based on layout */}
      </div>
    </>
  );
}
```

### Sort Order Cycling

```typescript
function SortableTable() {
  const [sortOrder, cycleSortOrder] = useToggle(['asc', 'desc']);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={cycleSortOrder}>
            Name {sortOrder === 'asc' ? '↑' : '↓'}
          </th>
        </tr>
      </thead>
    </table>
  );
}
```

### Comparison Mode Toggle

```typescript
function ComparisonView() {
  const [compareMode, toggleCompare] = useToggle(['side-by-side', 'overlay', 'diff']);

  return (
    <>
      <button onClick={toggleCompare}>Mode: {compareMode}</button>
      <div className={`compare-${compareMode}`}>
        {/* Render based on comparison mode */}
      </div>
    </>
  );
}
```

### Step Navigator

```typescript
function Stepper() {
  const [step, nextStep] = useToggle(['info', 'payment', 'confirmation']);

  return (
    <div>
      <div>Step: {step}</div>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
```

## Common Use Cases

- Light/dark mode toggles
- Theme switching
- Password visibility toggles
- Layout mode switching
- Sort order cycling
- View mode selection
- Tab/panel navigation
- Feature flags
- Comparison modes
- Multi-step workflows

## Features

- **Dual Mode** - Toggle between boolean states or cycle through values
- **Type-safe** - Full TypeScript support
- **Memoized Function** - Toggle function is stable across renders
- **Lightweight** - Minimal overhead with clean implementation
- **Intuitive API** - Simple and predictable behavior

## Notes

- In array mode, toggling past the last element results in `undefined`
- The toggle function is memoized and won't change between renders
- Each hook instance maintains its own independent state
- In array mode, the cycle wraps around after the last value (transitions to `undefined`)
