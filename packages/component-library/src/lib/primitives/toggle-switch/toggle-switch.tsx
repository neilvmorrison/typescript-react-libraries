import { forwardRef, useId } from 'react';
import { IToggleSwitchProps } from './types';
import { cn } from '../../../utils/cn';
import './toggle-switch.module.css';

export const ToggleSwitch = forwardRef<HTMLInputElement, IToggleSwitchProps>(
  (
    { size = 'md', label, checkedText, uncheckedText, className, ...props },
    ref
  ) => {
    const id = useId();

    return (
      <div className="switch-wrapper">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="switch-input"
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'switch-track',
            {
              'switch-2xs': size === '2xs',
              'switch-xs': size === 'xs',
              'switch-sm': size === 'sm',
              'switch-md': size === 'md',
              'switch-lg': size === 'lg',
              'switch-xl': size === 'xl',
              'switch-2xl': size === '2xl',
            },
            className
          )}
        >
          {uncheckedText && (
            <span className="switch-text-off">{uncheckedText}</span>
          )}
          {checkedText && <span className="switch-text-on">{checkedText}</span>}
          <span className="switch-thumb" />
        </label>
        {label && (
          <label htmlFor={id} className="switch-label">
            {label}
          </label>
        )}
      </div>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';
