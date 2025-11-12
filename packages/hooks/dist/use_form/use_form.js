import { useState, useCallback } from 'react';
export function useForm(options) {
    const [values, setValues] = useState(options.initialValues);
    const [errors, setErrors] = useState({});
    const [dirtyFields, setDirtyFields] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitAttempts, setSubmitAttempts] = useState(0);
    const setFieldValue = useCallback((field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete next[field];
                return next;
            });
        }
        setDirtyFields((prev) => prev.add(field));
    }, [errors]);
    const handleChange = useCallback((event) => {
        const { name, value, type } = event.target;
        const fieldValue = type === 'checkbox'
            ? event.target.checked
            : value;
        setFieldValue(name, fieldValue);
    }, [setFieldValue]);
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (options.maxSubmitAttempts &&
            submitAttempts >= options.maxSubmitAttempts) {
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
        }
        finally {
            setIsSubmitting(false);
        }
    }, [values, options, submitAttempts]);
    const reset = useCallback(() => {
        setValues(options.initialValues);
        setErrors({});
    }, [options.initialValues]);
    const getFormFieldProps = useCallback((field) => {
        return {
            name: field,
            value: values[field],
            onChange: handleChange,
            error: errors[field],
        };
    }, [values, handleChange, errors]);
    const getFieldValue = useCallback((field) => {
        return values[field];
    }, [values]);
    return {
        values,
        dirtyFields,
        errors,
        isSubmitting,
        submitAttempts,
        setFieldValue,
        handleChange,
        handleSubmit,
        getFormFieldProps,
        reset,
        getFieldValue,
    };
}
//# sourceMappingURL=use_form.js.map