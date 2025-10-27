import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from './use_form';

describe('useForm', () => {
  it('should initialize with initial values', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '', password: '' },
        onSubmit: vi.fn(),
      })
    );

    expect(result.current.values).toEqual({ email: '', password: '' });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update field value', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '', password: '' },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.setFieldValue('email', 'test@example.com');
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('should handle change event', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com', type: 'text' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('should handle checkbox input', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { agreed: false },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'agreed', type: 'checkbox', checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.agreed).toBe(true);
  });

  it('should validate on submit', async () => {
    const onSubmit = vi.fn();
    const validate = vi.fn(() => ({ email: 'Email is required' }));

    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        onSubmit,
        validate,
      })
    );

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(validate).toHaveBeenCalledWith({ email: '' });
    expect(result.current.errors).toEqual({ email: 'Email is required' });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should call onSubmit when validation passes', async () => {
    const onSubmit = vi.fn();
    const validate = vi.fn(() => ({}));

    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: 'test@example.com' },
        onSubmit,
        validate,
      })
    );

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result.current.errors).toEqual({});
  });

  it('should clear field error when field value changes', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.errors.email = 'Email is required';
    });

    act(() => {
      result.current.setFieldValue('email', 'test@example.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('should reset form', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '', password: '' },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.setFieldValue('email', 'test@example.com');
      result.current.errors.email = 'Some error';
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual({ email: '', password: '' });
    expect(result.current.errors).toEqual({});
  });

  it('should set isSubmitting during submission', async () => {
    const onSubmit: (values: { email: string }) => Promise<void> = vi
      .fn()
      .mockImplementation(
        () => new Promise<void>((resolve) => setTimeout(resolve, 100))
      );

    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: 'test@example.com' },
        onSubmit,
      })
    );

    expect(result.current.isSubmitting).toBe(false);

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should get form field props', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: 'test@example.com' },
        onSubmit: vi.fn(),
      })
    );

    const props = result.current.getFormFieldProps('email');

    expect(props.name).toBe('email');
    expect(props.value).toBe('test@example.com');
    expect(props.onChange).toBeDefined();
    expect(props.error).toBeUndefined();
  });
});
