# format_date

Formats a Date object or date string into either a short (DD/MM/YYYY) or long (readable) format.

## Usage

```typescript
import { format_date } from '@your-org/utilities';

const date = new Date('2024-01-15');

format_date(date); // '15/01/2024'
format_date(date, 'short'); // '15/01/2024'
format_date(date, 'long'); // 'Monday, January 15, 2024'
format_date('2024-01-15'); // '15/01/2024'
```

## Parameters

- `date` (Date | string) - The date to format. Can be a Date object or valid date string
- `format` ('short' | 'long') - Optional. The format type to use. Defaults to 'short'

## Returns

- (string) - The formatted date string

## Throws

- Error - If the provided date is invalid

## Description

Converts a Date object or date string into a standardized format. The short format returns DD/MM/YYYY with zero-padded values. The long format returns a fully readable date string including the weekday.

## Examples

### Short format (default)

```typescript
const date = new Date('2024-01-15');
format_date(date); // '15/01/2024'
format_date(date, 'short'); // '15/01/2024'
```

### Long format

```typescript
const date = new Date('2024-01-15');
format_date(date, 'long'); // 'Monday, January 15, 2024'
```

### String input

```typescript
format_date('2024-01-15'); // '15/01/2024'
format_date('2024-12-25', 'long'); // 'Wednesday, December 25, 2024'
```

### Error handling

```typescript
try {
  format_date('invalid-date');
} catch (error) {
  console.error(error.message); // 'Invalid date'
}
```

## Common Use Cases

- Displaying dates in forms and tables
- Formatting dates for user-facing displays
- Converting ISO date strings to readable formats
- Standardizing date representation across an application
