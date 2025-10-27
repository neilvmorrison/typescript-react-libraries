# throttle

Creates a throttled function that only executes at most once per specified time period.

## Usage

```typescript
import { throttle } from '@your-org/utilities';

const logScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 1000);

window.addEventListener('scroll', logScroll);
// Executes immediately on first scroll, then at most once per second
```

## Parameters

- `fn` (T) - The function to throttle
- `delay` (number) - The minimum time (in milliseconds) between function executions

## Returns

- (Function) - A throttled version of the provided function

## Description

Ensures a function executes at most once per specified time period. The first call executes immediately, and subsequent calls within the delay period are ignored. After the delay has passed, the next call will execute. Ideal for performance optimization of high-frequency events.

## Examples

### Scroll handler

```typescript
const handleScroll = throttle(() => {
  const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
  console.log(`Scrolled: ${scrollPercent}%`);
}, 500);

window.addEventListener('scroll', handleScroll);
```

### Mouse move tracking

```typescript
const trackMouse = throttle((e: MouseEvent) => {
  console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
}, 100);

document.addEventListener('mousemove', trackMouse);
```

### Button click prevention

```typescript
const handleSubmit = throttle(() => {
  console.log('Form submitted');
  // API call here
}, 2000);

// Even if clicked rapidly, only executes once every 2 seconds
```

### Game loop or animation

```typescript
const updateGameState = throttle(() => {
  // Update game logic
  renderFrame();
}, 16); // ~60fps
```

## Common Use Cases

- Scroll event handlers
- Mouse move tracking
- Window resize handlers
- Button click rate limiting
- API call rate limiting
- Animation frame updates
- Real-time data fetching

## Throttle vs Debounce

Use **throttle** when you want to ensure the function executes at regular intervals regardless of how many times it's called. Use **debounce** when you want to wait until the user has stopped performing an action before executing the function.
