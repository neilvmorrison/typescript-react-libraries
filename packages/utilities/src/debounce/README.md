# debounce

Creates a debounced function that delays execution until after a specified wait period has elapsed since the last time it was invoked.

## Usage

```typescript
import { debounce } from '@your-org/utilities';

const search = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

search('react'); // Won't execute immediately
search('react hooks'); // Cancels previous call
// After 300ms of no calls, executes with 'react hooks'
```

## Parameters

- `fn` (T) - The function to debounce
- `delay` (number) - The number of milliseconds to delay execution

## Returns

- (Function) - A debounced version of the provided function

## Description

Delays the execution of a function until after the specified delay has passed since the last time the debounced function was called. Each new call resets the timer. Perfect for expensive operations that shouldn't run on every input change.

## Examples

### Search input

```typescript
const handleSearch = debounce((query: string) => {
  fetch(`/api/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}, 500);

inputElement.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

### Window resize

```typescript
const handleResize = debounce(() => {
  console.log('Window resized to:', window.innerWidth);
}, 200);

window.addEventListener('resize', handleResize);
```

### Form validation

```typescript
const validateEmail = debounce((email: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  console.log('Email valid:', isValid);
}, 300);
```

## Common Use Cases

- Search input fields (wait for user to stop typing)
- Window resize handlers
- Scroll event handlers
- Form field validation
- API calls that should wait for user to finish input
- Auto-save functionality

## Debounce vs Throttle

Use **debounce** when you want to wait until the user has stopped performing an action before executing the function. Use **throttle** when you want to ensure the function executes at regular intervals regardless of how many times it's called.
