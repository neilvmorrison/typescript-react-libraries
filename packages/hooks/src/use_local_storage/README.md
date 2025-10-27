# useLocalStorage

Syncs React state with localStorage with automatic serialization, SSR support, and cross-tab synchronization.

## Usage

```typescript
import { useLocalStorage } from '@your-org/hooks';

function ThemeToggle() {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

## Parameters

- `key` (string) - The localStorage key to use for storing the value
- `initialValue` (T) - The initial value if no value exists in localStorage

## Returns

- `value` (T) - The current value from localStorage
- `setValue` ((value: T | ((current: T) => T)) => void) - Function to update the value
- `removeValue` (() => void) - Function to remove the value from localStorage

## Description

Provides a seamless interface for persisting state in localStorage. Automatically handles JSON serialization/deserialization, syncs changes across browser tabs, and includes SSR safety. Supports function updates like React's useState.

## Examples

### Theme persistence

```typescript
function App() {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}
```

### User preferences

```typescript
interface IUserPreferences {
  fontSize: number;
  notifications: boolean;
  language: string;
}

function Settings() {
  const { value: preferences, setValue: setPreferences } =
    useLocalStorage<IUserPreferences>('preferences', {
      fontSize: 16,
      notifications: true,
      language: 'en',
    });

  const updateFontSize = (size: number) => {
    setPreferences({ ...preferences, fontSize: size });
  };

  const toggleNotifications = () => {
    setPreferences({
      ...preferences,
      notifications: !preferences.notifications,
    });
  };

  return (
    <div>
      <label>
        Font Size: {preferences.fontSize}px
        <input
          type="range"
          min={12}
          max={24}
          value={preferences.fontSize}
          onChange={(e) => updateFontSize(Number(e.target.value))}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={preferences.notifications}
          onChange={toggleNotifications}
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

### Shopping cart

```typescript
interface ICartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

function ShoppingCart() {
  const { value: cart, setValue: setCart, removeValue: clearCart } =
    useLocalStorage<ICartItem[]>('cart', []);

  const addItem = (item: ICartItem) => {
    setCart((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, item];
    });
  };

  const removeItem = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} - ${item.price * item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

### Form draft auto-save

```typescript
interface IFormData {
  title: string;
  content: string;
  tags: string[];
}

function BlogPostEditor() {
  const { value: draft, setValue: setDraft, removeValue: clearDraft } =
    useLocalStorage<IFormData>('blog-draft', {
      title: '',
      content: '',
      tags: [],
    });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [draft]);

  const handlePublish = async () => {
    await publishPost(draft);
    clearDraft();
  };

  return (
    <div>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        placeholder="Title"
      />

      <textarea
        value={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        placeholder="Write your post..."
      />

      {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}

      <button onClick={handlePublish}>Publish</button>
      <button onClick={clearDraft}>Discard Draft</button>
    </div>
  );
}
```

### Recent searches

```typescript
function SearchBar() {
  const { value: recentSearches, setValue: setRecentSearches } =
    useLocalStorage<string[]>('recent-searches', []);

  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches((current) => {
        const updated = [searchQuery, ...current.filter((q) => q !== searchQuery)];
        return updated.slice(0, 5); // Keep only 5 recent searches
      });
      performSearch(searchQuery);
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(query);
        }}
      />

      {recentSearches.length > 0 && (
        <div>
          <h4>Recent Searches:</h4>
          {recentSearches.map((search, index) => (
            <button key={index} onClick={() => handleSearch(search)}>
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Toggle collapse state

```typescript
function Sidebar() {
  const { value: isCollapsed, setValue: setIsCollapsed } =
    useLocalStorage('sidebar-collapsed', false);

  return (
    <aside className={isCollapsed ? 'collapsed' : 'expanded'}>
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      {!isCollapsed && (
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
        </nav>
      )}
    </aside>
  );
}
```

### Table column visibility

```typescript
function DataTable() {
  const { value: visibleColumns, setValue: setVisibleColumns } =
    useLocalStorage<string[]>('visible-columns', [
      'name',
      'email',
      'role',
      'status',
    ]);

  const toggleColumn = (column: string) => {
    setVisibleColumns((current) =>
      current.includes(column)
        ? current.filter((col) => col !== column)
        : [...current, column]
    );
  };

  return (
    <div>
      <div>
        {allColumns.map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(col)}
              onChange={() => toggleColumn(col)}
            />
            {col}
          </label>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            {visibleColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
      </table>
    </div>
  );
}
```

### Function updates

```typescript
function Counter() {
  const { value: count, setValue: setCount } = useLocalStorage('count', 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((current) => current + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((current) => current - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Auth token storage

```typescript
function useAuth() {
  const {
    value: token,
    setValue: setToken,
    removeValue: logout,
  } = useLocalStorage<string | null>('auth-token', null);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setToken(data.token);
  };

  return { token, login, logout, isAuthenticated: !!token };
}
```

## Common Use Cases

- Theme preferences (light/dark mode)
- User settings and preferences
- Shopping cart persistence
- Form draft auto-save
- Recent searches or history
- UI state (sidebar collapsed, table columns)
- Authentication tokens
- Onboarding progress
- Filters and sort preferences
- Language selection

## Features

- **Automatic serialization** - Handles JSON serialization/deserialization
- **Cross-tab sync** - Changes sync across browser tabs automatically
- **SSR safe** - Works with server-side rendering
- **Function updates** - Supports updater functions like useState
- **Error handling** - Gracefully handles localStorage errors
- **Type-safe** - Full TypeScript support with generics
- **Remove capability** - Clean removal from storage

## Notes

- Values are automatically serialized to JSON
- Works with primitives, objects, and arrays
- SSR safe - returns initial value on server
- Storage events sync changes across tabs
- Gracefully handles localStorage quota exceeded
- Invalid JSON in localStorage falls back to initial value
