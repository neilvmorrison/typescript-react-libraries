import { forwardRef } from 'react';
import { IButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
