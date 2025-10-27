# try_catch

Wraps an async function in a try-catch block and returns a result object instead of throwing errors.

## Usage

```typescript
import { try_catch } from '@your-org/utilities';

const result = await try_catch(async () => {
  return await fetch('/api/data').then((res) => res.json());
});

if (result.error) {
  console.error('Request failed:', result.error);
} else {
  console.log('Data:', result.data);
}
```

## Parameters

- `fn` (() => Promise<T>) - The async function to execute

## Returns

- (Promise<IResult<T, E>>) - A promise that resolves to a result object containing either `data` or `error`

## Result Types

```typescript
interface ISuccess<T> {
  data: T;
  error: null;
}

interface IError<E> {
  data: null;
  error: E;
}

type IResult<T, E = unknown> = ISuccess<T> | IError<E>;
```

## Description

Eliminates the need for verbose try-catch blocks by wrapping async operations in a consistent error-handling pattern. Returns a discriminated union that makes error handling explicit and type-safe. Ideal for cleaner async code and functional error handling.

## Examples

### API request handling

```typescript
const result = await try_catch(async () => {
  const response = await fetch('/api/users');
  return await response.json();
});

if (result.error) {
  console.error('Failed to fetch users:', result.error);
  return;
}

console.log('Users:', result.data);
```

### File operations

```typescript
const result = await try_catch(async () => {
  const file_content = await fs.readFile('config.json', 'utf-8');
  return JSON.parse(file_content);
});

if (result.error) {
  console.error('Failed to read config:', result.error);
  return default_config;
}

return result.data;
```

### Database queries

```typescript
const result = await try_catch(async () => {
  return await db.query('SELECT * FROM users WHERE id = ?', [user_id]);
});

if (result.error) {
  logger.error('Database query failed', { error: result.error, user_id });
  throw new DatabaseError('Failed to fetch user');
}

return result.data;
```

### Custom error types

```typescript
interface IApiError {
  status: number;
  message: string;
}

const result = await try_catch<User[], IApiError>(async () => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw {
      status: response.status,
      message: await response.text(),
    };
  }
  return await response.json();
});

if (result.error) {
  console.error(`API error ${result.error.status}: ${result.error.message}`);
  return;
}

console.log('Users:', result.data);
```

### Chaining operations

```typescript
const user_result = await try_catch(() => fetch_user(user_id));
if (user_result.error) {
  return { error: 'User not found' };
}

const posts_result = await try_catch(() => fetch_posts(user_result.data.id));
if (posts_result.error) {
  return { error: 'Failed to load posts' };
}

return { user: user_result.data, posts: posts_result.data };
```

### Form submission

```typescript
const handle_submit = async (form_data: FormData) => {
  const result = await try_catch(async () => {
    return await api.submit_form(form_data);
  });

  if (result.error) {
    set_error('Submission failed. Please try again.');
    return;
  }

  set_success('Form submitted successfully!');
  navigate('/success');
};
```

## Common Use Cases

- API request handling
- Database operations
- File I/O operations
- Form submissions
- Data parsing
- External service calls
- Async validation
- Resource initialization

## Benefits

- **Type-safe**: Discriminated union ensures you handle both success and error cases
- **Explicit**: Error handling is explicit and visible in the code flow
- **Clean**: Eliminates nested try-catch blocks
- **Consistent**: Standardized error handling pattern across your codebase
- **Functional**: Works well with functional programming patterns

## Try-Catch vs Throwing

Use **try_catch** when you want to handle errors as values and make error handling explicit. Use traditional **try-catch** blocks when you want errors to bubble up or need multiple catch blocks for different error types.
