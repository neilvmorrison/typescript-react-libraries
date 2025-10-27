# usePrevious

Returns the previous value of a variable from the last render. Useful for comparing current and previous values.

## Usage

```typescript
import { usePrevious } from '@your-org/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount ?? 'N/A'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Parameters

- `value` (T) - The value to track

## Returns

- (T | undefined) - The previous value (undefined on first render)

## Description

Stores and returns the value from the previous render cycle. Returns undefined on the first render since there is no previous value. Useful for animations, transitions, detecting changes, and comparisons.

## Examples

### Detect value changes

```typescript
function SearchResults({ query }: { query: string }) {
  const previousQuery = usePrevious(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query !== previousQuery) {
      console.log(`Search changed from "${previousQuery}" to "${query}"`);
      fetchResults(query).then(setResults);
    }
  }, [query, previousQuery]);

  return <div>{/* Render results */}</div>;
}
```

### Animation direction

```typescript
function Slider({ currentSlide }: { currentSlide: number }) {
  const previousSlide = usePrevious(currentSlide);
  const direction = previousSlide && currentSlide > previousSlide ? 'forward' : 'backward';

  return (
    <div className={`slide-${direction}`}>
      <p>Moving {direction}</p>
      <p>From slide {previousSlide ?? 'start'} to {currentSlide}</p>
    </div>
  );
}
```

### Track loading state changes

```typescript
function DataLoader({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const wasLoading = usePrevious(isLoading);

  useEffect(() => {
    if (wasLoading && !isLoading) {
      console.log('Loading complete!');
      showSuccessNotification();
    }
  }, [isLoading, wasLoading]);

  return <div>{isLoading ? 'Loading...' : 'Loaded'}</div>;
}
```

### Compare prop changes

```typescript
function UserProfile({ user }: { user: IUser }) {
  const previousUser = usePrevious(user);

  useEffect(() => {
    if (previousUser && previousUser.id !== user.id) {
      console.log('User changed:', {
        from: previousUser.name,
        to: user.name,
      });
      trackUserChange(previousUser.id, user.id);
    }
  }, [user, previousUser]);

  return <div>{user.name}</div>;
}
```

### Value delta calculation

```typescript
function PriceTracker({ price }: { price: number }) {
  const previousPrice = usePrevious(price);
  const delta = previousPrice ? price - previousPrice : 0;
  const percentChange = previousPrice
    ? ((delta / previousPrice) * 100).toFixed(2)
    : 0;

  return (
    <div>
      <p>Current Price: ${price}</p>
      {previousPrice && (
        <>
          <p>Previous Price: ${previousPrice}</p>
          <p className={delta >= 0 ? 'positive' : 'negative'}>
            Change: ${delta.toFixed(2)} ({percentChange}%)
          </p>
        </>
      )}
    </div>
  );
}
```

### Form field comparison

```typescript
function EmailInput() {
  const [email, setEmail] = useState('');
  const previousEmail = usePrevious(email);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (previousEmail !== undefined && email !== previousEmail) {
      setHasChanged(true);
    }
  }, [email, previousEmail]);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {hasChanged && <p>Email has been modified</p>}
    </div>
  );
}
```

### Pagination direction

```typescript
function PaginatedList({ page }: { page: number }) {
  const previousPage = usePrevious(page);
  const goingForward = previousPage !== undefined && page > previousPage;

  return (
    <div className={`transition-${goingForward ? 'forward' : 'backward'}`}>
      <p>Page {page}</p>
      {previousPage !== undefined && (
        <p>
          Navigated from page {previousPage}
          {goingForward ? ' →' : ' ←'}
        </p>
      )}
    </div>
  );
}
```

### Tab switching analytics

```typescript
function TabPanel({ activeTab }: { activeTab: string }) {
  const previousTab = usePrevious(activeTab);

  useEffect(() => {
    if (previousTab && previousTab !== activeTab) {
      analytics.track('Tab Changed', {
        from: previousTab,
        to: activeTab,
      });
    }
  }, [activeTab, previousTab]);

  return <div>{/* Tab content */}</div>;
}
```

### Undo functionality

```typescript
function TextEditor() {
  const [text, setText] = useState('');
  const previousText = usePrevious(text);

  const undo = () => {
    if (previousText !== undefined) {
      setText(previousText);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={undo} disabled={previousText === undefined}>
        Undo
      </button>
    </div>
  );
}
```

### Filter change detection

```typescript
interface IFilters {
  category: string;
  priceRange: [number, number];
  inStock: boolean;
}

function ProductList({ filters }: { filters: IFilters }) {
  const previousFilters = usePrevious(filters);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (previousFilters) {
      const changedFilters = Object.keys(filters).filter(
        (key) =>
          filters[key as keyof IFilters] !==
          previousFilters[key as keyof IFilters]
      );

      if (changedFilters.length > 0) {
        console.log('Filters changed:', changedFilters);
        fetchProducts(filters).then(setProducts);
      }
    } else {
      fetchProducts(filters).then(setProducts);
    }
  }, [filters, previousFilters]);

  return <div>{/* Render products */}</div>;
}
```

## Common Use Cases

- Detecting value changes for side effects
- Animation and transition directions
- Calculating deltas and changes
- Tracking state transitions
- Implementing undo functionality
- Analytics and logging
- Conditional rendering based on changes
- Comparing previous and current props

## Features

- **Simple API** - Single parameter, single return value
- **Type-safe** - Full TypeScript support with generics
- **Lightweight** - Uses only useRef and useEffect
- **No dependencies** - Pure React implementation
- **Reliable** - Returns undefined on first render consistently

## Notes

- Returns `undefined` on the first render (no previous value exists)
- Works with any type: primitives, objects, arrays, etc.
- Does not perform deep equality checks (reference comparison for objects)
- Updates after the render where the value changed
- Does not cause additional re-renders
