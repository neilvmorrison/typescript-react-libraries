# get_user_initials

Extracts and returns the first two initials from a full name string, with each initial capitalized.

## Usage

```typescript
import { get_user_initials } from '@your-org/utilities';

get_user_initials('John Doe'); // 'JD'
get_user_initials('Jane Smith'); // 'JS'
get_user_initials('Madonna'); // 'M'
get_user_initials('Mary Jane Watson'); // 'MJ'
```

## Parameters

- `full_name` (string) - The full name to extract initials from

## Returns

- (string) - Up to two uppercase initials derived from the name

## Description

Splits the input name by spaces, takes the first character of each word, converts them to uppercase, joins them together, and returns the first two characters. Useful for generating user avatars or display names.

## Examples

### Standard two-word names

```typescript
get_user_initials('John Doe'); // 'JD'
get_user_initials('Jane Smith'); // 'JS'
```

### Single name

```typescript
get_user_initials('Madonna'); // 'M'
```

### Multiple names

```typescript
// Only first two initials are returned
get_user_initials('Mary Jane Watson'); // 'MJ'
get_user_initials('John Paul George Ringo'); // 'JP'
```

## Common Use Cases

- Generating avatar placeholders
- Creating display initials for user profiles
- Short name representations in UI components
