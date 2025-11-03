import { forwardRef, useId, useMemo, ChangeEvent } from 'react';
import { IRadioGroupProps } from './types';
import { cn } from '../../../../utils/cn';
import './radio-group.module.css';

export const RadioGroup = forwardRef<HTMLInputElement, IRadioGroupProps>(
  (
    {
      options,
      label,
      error,
      direction = 'vertical',
      size = 'md',
      className,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const groupId = useId();
    const generatedIds = useMemo(
      () =>
        options.reduce<Record<string, string>>((acc, option) => {
          acc[option.value] = `${groupId}-${option.value}`;
          return acc;
        }, {}),
      [groupId, options]
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    return (
      <fieldset className="radio-group-fieldset">
        {label && <legend className="radio-group-label">{label}</legend>}
        <div
          className={cn(
            'radio-group-container',
            {
              'radio-group-horizontal': direction === 'horizontal',
              'radio-group-vertical': direction === 'vertical',
              'radio-group-sm': size === 'sm',
              'radio-group-md': size === 'md',
              'radio-group-lg': size === 'lg',
            },
            className
          )}
        >
          {options.map((option) => (
            <div key={option.value} className="radio-group-item">
              <input
                ref={option.value === value ? ref : undefined}
                id={generatedIds[option.value]}
                type="radio"
                name={groupId}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={disabled ?? option.disabled}
                className="radio-input"
                {...props}
              />
              <label
                htmlFor={generatedIds[option.value]}
                className="radio-label"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && <div className="radio-group-error">{error}</div>}
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
