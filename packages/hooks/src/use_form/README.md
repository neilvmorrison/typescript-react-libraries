# useForm

A powerful form management hook that handles form state, validation, and submission with built-in error handling.

## Usage

```typescript
import { useForm } from '@your-org/hooks';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await loginUser(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
      />
      {form.errors.email && <span>{form.errors.email}</span>}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Parameters

- `options` (IUseFormOptions<T>) - Configuration object
  - `initialValues` (T) - Initial form values
  - `onSubmit` ((values: T) => void | Promise<void>) - Submit handler
  - `validate` ((values: T) => Partial<Record<keyof T, string>>) - Optional validation function

## Returns

- `values` (T) - Current form values
- `errors` (Partial<Record<keyof T, string>>) - Validation errors
- `isSubmitting` (boolean) - Whether form is currently submitting
- `setFieldValue` ((field: keyof T, value: unknown) => void) - Update a single field
- `handleChange` ((event: React.ChangeEvent) => void) - Handle input change events
- `handleSubmit` ((event: React.FormEvent) => Promise<void>) - Handle form submission
- `reset` (() => void) - Reset form to initial values

## Description

Manages all aspects of form state including values, errors, and submission status. Automatically handles validation, error clearing on field changes, and form submission. Supports both synchronous and asynchronous submit handlers.

## Examples

### Basic form

```typescript
function ContactForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      await sendMessage(values);
      alert('Message sent!');
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="name"
        value={form.values.name}
        onChange={form.handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
        placeholder="Email"
      />

      <textarea
        name="message"
        value={form.values.message}
        onChange={form.handleChange}
        placeholder="Message"
      />

      <button type="submit" disabled={form.isSubmitting}>
        Send
      </button>
    </form>
  );
}
```

### Form with validation

```typescript
function SignupForm() {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      await createAccount(values);
    },
    validate: (values) => {
      const errors: Partial<Record<keyof typeof values, string>> = {};

      if (!values.username) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <input
          name="username"
          value={form.values.username}
          onChange={form.handleChange}
        />
        {form.errors.username && <span>{form.errors.username}</span>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={form.values.email}
          onChange={form.handleChange}
        />
        {form.errors.email && <span>{form.errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={form.values.password}
          onChange={form.handleChange}
        />
        {form.errors.password && <span>{form.errors.password}</span>}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
        />
        {form.errors.confirmPassword && (
          <span>{form.errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" disabled={form.isSubmitting}>
        Sign Up
      </button>
    </form>
  );
}
```

### Using setFieldValue programmatically

```typescript
function ProfileForm() {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    onSubmit: async (values) => {
      await updateProfile(values);
    },
  });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    form.setFieldValue('firstName', firstName);
    form.setFieldValue('fullName', `${firstName} ${form.values.lastName}`);
  };

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="firstName"
        value={form.values.firstName}
        onChange={handleFirstNameChange}
      />
      <input
        name="lastName"
        value={form.values.lastName}
        onChange={form.handleChange}
      />
      <input
        name="fullName"
        value={form.values.fullName}
        readOnly
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Checkbox handling

```typescript
function PreferencesForm() {
  const form = useForm({
    initialValues: {
      newsletter: false,
      notifications: true,
      marketing: false,
    },
    onSubmit: async (values) => {
      await savePreferences(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={form.values.newsletter}
          onChange={form.handleChange}
        />
        Subscribe to newsletter
      </label>

      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={form.values.notifications}
          onChange={form.handleChange}
        />
        Enable notifications
      </label>

      <label>
        <input
          type="checkbox"
          name="marketing"
          checked={form.values.marketing}
          onChange={form.handleChange}
        />
        Receive marketing emails
      </label>

      <button type="submit">Save Preferences</button>
    </form>
  );
}
```

### Reset form after submission

```typescript
function FeedbackForm() {
  const form = useForm({
    initialValues: {
      rating: 5,
      comment: '',
    },
    onSubmit: async (values) => {
      await submitFeedback(values);
      form.reset();
      alert('Thank you for your feedback!');
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <select
        name="rating"
        value={form.values.rating}
        onChange={form.handleChange}
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>

      <textarea
        name="comment"
        value={form.values.comment}
        onChange={form.handleChange}
      />

      <button type="submit">Submit Feedback</button>
    </form>
  );
}
```

## Common Use Cases

- Login and registration forms
- Contact forms
- Profile editing
- Settings and preferences
- Multi-step forms
- Search forms with filters
- Comment and feedback forms
- Checkout forms

## Features

- **Type-safe** - Full TypeScript support
- **Validation** - Built-in validation with error messages
- **Auto error clearing** - Errors clear when field values change
- **Async support** - Handles async onSubmit functions
- **Loading state** - isSubmitting flag for UX
- **Reset functionality** - Easy form reset
- **Checkbox support** - Handles checkbox inputs correctly
- **Programmatic updates** - setFieldValue for complex logic
