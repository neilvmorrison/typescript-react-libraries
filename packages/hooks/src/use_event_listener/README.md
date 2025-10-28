# useEventListener

Attaches an event listener to the window object with automatic cleanup on unmount and dependency management.

## Usage

```typescript
import { useEventListener } from '@your-org/hooks';

function ScrollPosition() {
  const handleScroll = (event: Event) => {
    console.log('Scroll event:', window.scrollY);
  };

  useEventListener('scroll', handleScroll);

  return <div>Check console for scroll events</div>;
}
```

## Parameters

- `event` (string) - The event type to listen for (e.g., 'click', 'scroll', 'keydown')
- `callback` ((event: Event) => void) - Function to execute when the event fires

## Returns

- (void)

## Description

Manages event listener lifecycle automatically. Adds the listener on mount, removes it on unmount, and re-attaches when either the event type or callback changes. Useful for global window events like scroll, resize, keydown, etc.

## Examples

### Window scroll listener

```typescript
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = (event: Event) => {
    setIsVisible(window.scrollY > 300);
  };

  useEventListener('scroll', handleScroll);

  return (
    <button style={{ display: isVisible ? 'block' : 'none' }} onClick={() => window.scrollTo(0, 0)}>
      Back to Top
    </button>
  );
}
```

### Keyboard shortcut handler

```typescript
function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event: Event) => {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === '/') {
      setIsOpen(true);
    }
  };

  useEventListener('keydown', handleKeyDown);

  return (
    <div>
      {isOpen && <SearchBox />}
      <p>Press / to search</p>
    </div>
  );
}
```

### Window resize handler

```typescript
function ResponsiveComponent() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const handleResize = (event: Event) => {
    setWindowWidth(window.innerWidth);
  };

  useEventListener('resize', handleResize);

  return <div>Window width: {windowWidth}px</div>;
}
```

### Keyboard event tracking

```typescript
function KeyLogger() {
  const [lastKey, setLastKey] = useState('');

  const handleKeyPress = (event: Event) => {
    const keyEvent = event as KeyboardEvent;
    setLastKey(keyEvent.key);
  };

  useEventListener('keydown', handleKeyPress);

  return <p>Last key pressed: {lastKey}</p>;
}
```

### Outside click detection

```typescript
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  useEventListener('click', handleClick);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

### Window blur/focus tracking

```typescript
function TabActivity() {
  const [isActive, setIsActive] = useState(true);

  const handleFocus = (event: Event) => {
    setIsActive(true);
  };

  const handleBlur = (event: Event) => {
    setIsActive(false);
  };

  useEventListener('focus', handleFocus);
  useEventListener('blur', handleBlur);

  return <p>Tab is {isActive ? 'active' : 'inactive'}</p>;
}
```

### Storage change listener

```typescript
function SyncedCounter() {
  const [count, setCount] = useState(0);

  const handleStorageChange = (event: Event) => {
    const storageEvent = event as StorageEvent;
    if (storageEvent.key === 'count') {
      setCount(parseInt(storageEvent.newValue || '0'));
    }
  };

  useEventListener('storage', handleStorageChange);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => localStorage.setItem('count', String(count + 1))}>
        Increment
      </button>
    </div>
  );
}
```

### Online/offline status

```typescript
function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' && navigator.onLine);

  const handleOnline = (event: Event) => {
    setIsOnline(true);
  };

  const handleOffline = (event: Event) => {
    setIsOnline(false);
  };

  useEventListener('online', handleOnline);
  useEventListener('offline', handleOffline);

  return <div>Status: {isOnline ? 'Online' : 'Offline'}</div>;
}
```

## Common Use Cases

- Scroll events (infinite scroll, scroll to top button)
- Keyboard shortcuts and hotkeys
- Window resize handling
- Click outside detection
- Tab focus/blur tracking
- Visibility change detection
- Storage sync across tabs
- Network status monitoring
- Orientation changes

## Features

- **Automatic cleanup** - Event listeners removed on component unmount
- **Dependency management** - Automatically updates listeners when event or callback changes
- **Type-safe** - Full TypeScript support
- **Simple API** - Easy to use with minimal setup
- **Lightweight** - Minimal overhead with clean teardown

## Notes

- The hook listens to the `window` object
- Event type and callback dependencies trigger listener re-attachment
- Ensure callbacks are memoized if passed from parent components to avoid unnecessary re-attachments
- Use proper event type casting (e.g., `event as KeyboardEvent`) when accessing event-specific properties
