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
      variant,
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
        className={cn(
          'button-root',
          className,
          variant ? `button-${variant}` : undefined
        )}
        disabled={disabled ?? loading}
        {...props}
      >
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {(loading || leftSection) && (
          <span className="button-left-icon">
            {loading ? <LoadingSpinner size="sm" /> : leftSection}
          </span>
        )}
        <span className="button-content">{children}</span>
        {rightSection && (
          <span className="button-right-icon">{rightSection}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
