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
export type IFormFieldType = string | number | boolean | Date | File | null | undefined | IFormFieldType[];
export interface IUseFormReturn<T> {
    values: T;
    dirtyFields: Set<keyof T>;
    errors: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
    submitAttempts: number;
    setFieldValue: (field: keyof T, value: IFormFieldType) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    reset: () => void;
    getFormFieldProps: (field: keyof T) => {
        name: keyof T;
        value: IFormFieldType;
        onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
        error: string | undefined;
    };
    getFieldValue: (field: keyof T) => IFormFieldType;
}
export declare function useForm<T extends Record<string, IFormFieldType>>(options: IUseFormOptions<T>): IUseFormReturn<T>;
//# sourceMappingURL=use_form.d.ts.map