import { forwardRef } from 'react';
import { IButtonProps } from './types';
import { cn } from '../../../utils/cn';
import './button.module.css';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      className,
      leftSection,
      rightSection,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn('button-root', className)}
        disabled={disabled ?? loading}
        {...props}
      >
        {(loading ?? leftSection) && (
          <span className="button-left-icon">
            {loading ? <LoadingSpinner size="sm" /> : leftSection}
          </span>
        )}
        {children}
        {rightSection && (
          <span className="button-right-icon">{rightSection}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
