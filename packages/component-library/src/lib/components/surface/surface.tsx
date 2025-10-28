import { forwardRef } from 'react';

export const Surface = forwardRef<HTMLDivElement, HTMLDivElement>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
