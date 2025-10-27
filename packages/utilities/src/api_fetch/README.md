# api_fetch

Standardized fetch utility that wraps HTTP requests with consistent error handling using the try_catch pattern.

## Usage

```typescript
import { api_fetch, api_get, api_post } from '@your-org/utilities';

interface IUser {
  id: number;
  name: string;
  email: string;
}

const result = await api_get<IUser>('/api/users/1');

if (result.error) {
  console.error('Request failed:', result.error);
} else {
  console.log('User:', result.data);
}
```

## API

### api_fetch<T>(url, options?)

The base fetch function that all other methods use internally.

#### Parameters

- `url` (string) - The URL to fetch from
- `options` (IApiFetchOptions) - Optional configuration object
  - `body` (unknown) - Request body (automatically stringified)
  - `parseResponse` (boolean) - Whether to parse JSON response. Defaults to `true`
  - All standard `RequestInit` options (method, headers, etc.)

#### Returns

- `Promise<IResult<T, IApiError>>` - A result object with either `data` or `error`

### Helper Methods

#### api_get<T>(url, options?)

Makes a GET request.

```typescript
const result = await api_get<IUser[]>('/api/users');
```

#### api_post<T>(url, body?, options?)

Makes a POST request with optional body.

```typescript
const result = await api_post<IUser>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com',
});
```

#### api_put<T>(url, body?, options?)

Makes a PUT request with optional body.

```typescript
const result = await api_put<IUser>('/api/users/1', {
  name: 'Jane Doe',
});
```

#### api_patch<T>(url, body?, options?)

Makes a PATCH request with optional body.

```typescript
const result = await api_patch<IUser>('/api/users/1', {
  email: 'newemail@example.com',
});
```

#### api_delete<T>(url, options?)

Makes a DELETE request.

```typescript
const result = await api_delete('/api/users/1');
```

## Types

### IApiError

Error interface for API errors.

```typescript
interface IApiError {
  status: number;
  statusText: string;
  message: string;
  url: string;
}
```

### ApiError

Type-safe error class that extends `Error` and implements `IApiError`. All HTTP errors are thrown as `ApiError` instances, ensuring type-safe error handling through the `try_catch` utility.

```typescript
class ApiError extends Error implements IApiError {
  status: number;
  statusText: string;
  url: string;

  constructor(status: number, statusText: string, message: string, url: string);
}
```

### IResult<T, E>

Result type from try_catch utility.

```typescript
type IResult<T, E> = ISuccess<T> | IError<E>;
```

## Description

Provides a consistent interface for making HTTP requests with automatic error handling. All requests return a result object with either `data` or `error`, eliminating the need for try-catch blocks in consuming code. Automatically:

- Stringifies request bodies to JSON
- Sets Content-Type header to application/json
- Parses JSON responses
- Wraps fetch errors in a standardized format
- Handles both network and HTTP errors

## Examples

### Basic GET request

```typescript
const result = await api_get<IUser>('/api/users/1');

if (result.error) {
  console.error(`Error ${result.error.status}: ${result.error.message}`);
  return;
}

console.log('User:', result.data);
```

### POST with body

```typescript
const result = await api_post<IUser>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com',
});

if (result.error) {
  if (result.error.status === 409) {
    console.error('User already exists');
  } else {
    console.error('Failed to create user:', result.error.message);
  }
  return;
}

console.log('Created user:', result.data);
```

### Custom headers

```typescript
const result = await api_get<IUser>('/api/users/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Skip response parsing

```typescript
const result = await api_post('/api/users/1/activate', undefined, {
  parseResponse: false,
});

if (result.error) {
  console.error('Activation failed');
} else {
  console.log('User activated successfully');
}
```

### Error handling patterns

```typescript
import { api_get, ApiError } from '@your-org/utilities';

const result = await api_get<IUser>('/api/users/1');

if (result.error) {
  if (result.error instanceof ApiError) {
    switch (result.error.status) {
      case 404:
        console.error('User not found');
        break;
      case 401:
        console.error('Unauthorized');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error('Request failed:', result.error.message);
    }
  } else {
    console.error('Network error:', result.error);
  }
  return;
}

console.log('User:', result.data);
```

### With React

```typescript
import { useState, useEffect } from 'react';
import { api_get } from '@your-org/utilities';

interface IUser {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await api_get<IUser>(`/api/users/${userId}`);

      if (result.error) {
        setError(result.error.message);
      } else {
        setUser(result.data);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return <div>{user.name}</div>;
}
```

### Multiple concurrent requests

```typescript
const [usersResult, postsResult] = await Promise.all([
  api_get<IUser[]>('/api/users'),
  api_get<IPost[]>('/api/posts'),
]);

if (usersResult.error) {
  console.error('Failed to fetch users:', usersResult.error);
}

if (postsResult.error) {
  console.error('Failed to fetch posts:', postsResult.error);
}

if (usersResult.data && postsResult.data) {
  console.log('Users:', usersResult.data);
  console.log('Posts:', postsResult.data);
}
```

## Common Use Cases

- API requests in React components
- Server-side data fetching
- Form submissions
- CRUD operations
- Authentication flows
- File uploads (with custom headers)
- Polling endpoints
- Webhook handlers

## Error Handling

The utility returns errors in a standardized format, making it easy to handle different error scenarios:

- **Network errors**: Catch network failures, timeouts, etc.
- **HTTP errors**: Access status codes and error messages
- **Consistent structure**: All errors follow the IApiError interface
- **Type-safe**: Full TypeScript support for both success and error cases

## Benefits

- **No try-catch blocks needed** in consuming code
- **Type-safe** responses with full TypeScript support
- **Consistent error handling** across your application
- **Automatic JSON handling** for requests and responses
- **Helper methods** for common HTTP verbs
- **Composable** with other async operations
