# clamp

Constrains a numeric value to stay within a specified minimum and maximum range.

## Usage

```typescript
import { clamp } from '@your-org/utilities';

clamp(5, 0, 10); // 5
clamp(15, 0, 10); // 10
clamp(-5, 0, 10); // 0
```

## Parameters

- `value` (number) - The value to clamp
- `min` (number) - The minimum boundary
- `max` (number) - The maximum boundary

## Returns

- (number) - The clamped value, constrained between min and max

## Description

Returns the value if it's within the min/max range. If the value exceeds the maximum, returns the maximum. If the value is below the minimum, returns the minimum. Useful for keeping values within valid bounds.

## Examples

### Value within range

```typescript
clamp(5, 0, 10); // 5
clamp(7.5, 0, 10); // 7.5
```

### Value exceeds maximum

```typescript
clamp(15, 0, 10); // 10
clamp(100, 0, 10); // 10
```

### Value below minimum

```typescript
clamp(-5, 0, 10); // 0
clamp(-100, 0, 10); // 0
```

### Negative ranges

```typescript
clamp(-5, -10, -1); // -5
clamp(-15, -10, -1); // -10
clamp(0, -10, -1); // -1
```

## Common Use Cases

- Constraining slider values
- Limiting scroll positions
- Ensuring array indices stay within bounds
- Validating numeric input ranges
- Animation value constraints
