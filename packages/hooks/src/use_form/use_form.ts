import { useState, useCallback } from 'react';

/**
 * A powerful form management hook that handles form state, validation, and submission.
 *
 * @template T
 * @param options - Configuration object for the form
 * @param options.initialValues - Initial form values
 * @param [options.maxSubmitAttempts] - Maximum allowed submit attempts before blocking
 * @param options.onSubmit - Submit handler; may be async
 * @param [options.validate] - Optional validator returning field error messages keyed by field
 * @returns Form state and handlers
 *
 * @example
 * ```typescript
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   onSubmit: async (values) => {
 *     await loginUser(values);
 *   },
 *   validate: (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Email is required';
 *     return errors;
 *   },
 * });
 * ```
 */

export interface IUseFormOptions<T> {
  initialValues: T;
  maxSubmitAttempts?: number;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export interface IUseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  submitAttempts: number;
  setFieldValue: (field: keyof T, value: unknown) => void;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
  getFormFieldProps: (field: keyof T) => {
    name: keyof T;
    value: unknown;
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    error: string | undefined;
  };
}

export function useForm<T extends Record<string, unknown>>(
  options: IUseFormOptions<T>
): IUseFormReturn<T> {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const setFieldValue = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = event.target;
      const fieldValue =
        type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : value;
      setFieldValue(name as keyof T, fieldValue);
    },
    [setFieldValue]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
        options.maxSubmitAttempts &&
        submitAttempts >= options.maxSubmitAttempts
      ) {
        setErrors((prev) => ({
          ...prev,
          submitAttempts: 'Maximum number of submit attempts reached',
        }));
        return;
      }
      setIsSubmitting(true);
      setSubmitAttempts((prev) => prev + 1);
      const validation_errors = options.validate?.(values) ?? {};
      if (Object.keys(validation_errors).length > 0) {
        setErrors(validation_errors);
        setIsSubmitting(false);
        return;
      }

      try {
        await options.onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options, submitAttempts]
  );

  const reset = useCallback(() => {
    setValues(options.initialValues);
    setErrors({});
  }, [options.initialValues]);

  const getFormFieldProps = useCallback(
    (field: keyof T) => {
      return {
        name: field,
        value: values[field],
        onChange: handleChange,
        error: errors[field],
      };
    },
    [values, handleChange, errors]
  );

  return {
    values,
    errors,
    isSubmitting,
    submitAttempts,
    setFieldValue,
    handleChange,
    handleSubmit,
    getFormFieldProps,
    reset,
  };
}
