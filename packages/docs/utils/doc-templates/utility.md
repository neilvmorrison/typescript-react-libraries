# [utilityName]

[Brief description of what the utility does and its purpose]

## Usage

```typescript
import { [utilityName] } from '@libraries/utilities';

// Basic usage
const result = [utilityName]([arg1], [arg2]);

// With options
const result = [utilityName]([arg1], {
  [optionName]: [value],
});
```

## API Reference

### Import

```typescript
import { [utilityName] } from '@libraries/utilities';
```

### Function Signature

```typescript
[utilityName]<[GenericType]>(
  [paramName]: [type],
  [optionalParam]?: [type]
): [returnType]
```

### Parameters

| Name              | Type     | Required | Description   | Default   |
| ----------------- | -------- | -------- | ------------- | --------- |
| `[paramName]`     | `[type]` | Yes      | [Description] | N/A       |
| `[optionalParam]` | `[type]` | No       | [Description] | [default] |

**Options Details:**

| Name           | Type     | Required | Description   | Default   |
| -------------- | -------- | -------- | ------------- | --------- |
| `[optionName]` | `[type]` | [Yes/No] | [Description] | [default] |

### Return Type

| Property       | Type     | Description   |
| -------------- | -------- | ------------- |
| `[returnProp]` | `[type]` | [Description] |

**Full Type Definition:**

```typescript
interface [IReturnType] {
  [prop1]: [type];
  [prop2]: [type];
}
```

### Related Types

- `[ITypeA](/types/type-a)` - [Description]
- `[ITypeB](/types/type-b)` - [Description]

## Examples

### Basic Usage

```typescript
const result = [utilityName]([arg1]);
console.log(result);
```

### With Options

```typescript
const result = [utilityName]([arg1], {
  [optionName]: [value],
  [optionName2]: [value],
});
```

### Error Handling

```typescript
const result = [utilityName]([arg1]);
if (result.error) {
  console.error('Failed:', result.error);
} else {
  console.log('Success:', result.data);
}
```
