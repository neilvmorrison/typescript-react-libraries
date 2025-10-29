import { forwardRef } from 'react';
import { ILoadingSpinnerProps } from './types';
import { cn } from '../../../utils/cn';
import './loading-spinner.module.css';

export const LoadingSpinner = forwardRef<SVGSVGElement, ILoadingSpinnerProps>(
  ({ size = 'md', color = 'currentColor', className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(
          'spinner',
          {
            'spinner-2xs': size === '2xs',
            'spinner-xs': size === 'xs',
            'spinner-sm': size === 'sm',
            'spinner-md': size === 'md',
            'spinner-lg': size === 'lg',
            'spinner-xl': size === 'xl',
            'spinner-2xl': size === '2xl',
          },
          className
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeDasharray="16 47"
          strokeDashoffset="0"
        />
      </svg>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';
