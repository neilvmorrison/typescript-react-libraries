import { forwardRef } from 'react';
import { IButtonProps } from './types';
import { cn } from '../../../utils/cn';
import './button.module.css';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn('button-root', className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
