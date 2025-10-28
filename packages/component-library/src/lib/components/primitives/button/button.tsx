import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../../utils';
import type { IPolymorphicComponent } from '../../../types/html_element';
import { HTML_ELEMENTS } from '../../../types/html_element';

export interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  component?: IPolymorphicComponent;
  variant?: 'solid' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  solid:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:hover:bg-primary-600',
  outline:
    'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-900 active:bg-primary-100 dark:active:bg-slate-800 disabled:hover:bg-transparent',
  ghost:
    'text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-900 active:bg-primary-100 dark:active:bg-slate-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm h-8',
  md: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
};

export const Button = forwardRef<HTMLElement, IButtonProps>(
  (
    {
      children,
      component = 'button',
      variant = 'solid',
      size = 'md',
      fullWidth = false,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Element = HTML_ELEMENTS[component];

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    return (
      <Element
        ref={ref}
        className={buttonClasses}
        disabled={disabled && (component === 'button' || component === 'a')}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Button.displayName = 'Button';
