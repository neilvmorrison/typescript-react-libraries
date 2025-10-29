# [ComponentName]

[Brief description of the component and its purpose]

## Usage

```typescript
import { [ComponentName] } from '@libraries/component-library';

export function Example() {
  return (
    <[ComponentName]>
      [Example content]
    </[ComponentName]>
  );
}
```

## API Reference

### Import

```typescript
import { [ComponentName] } from '@libraries/component-library';
```

### Props

| Name         | Type                      | Required | Description              | Default   |
| ------------ | ------------------------- | -------- | ------------------------ | --------- |
| `[propName]` | `[type]`                  | [Yes/No] | [Description]            | [default] |
| `children`   | `React.ReactNode`         | No       | Component content        | N/A       |
| `...props`   | `[HTMLElementAttributes]` | No       | Standard HTML attributes | N/A       |

### Variants

- `'[variant1]'` - [Description]
- `'[variant2]'` - [Description]

## Examples

### Basic

```typescript
<[ComponentName]>
  [Example content]
</[ComponentName]>
```

### With Props

```typescript
<[ComponentName]
  [prop1]="[value1]"
  [prop2]="[value2]"
>
  [Content]
</[ComponentName]>
```
