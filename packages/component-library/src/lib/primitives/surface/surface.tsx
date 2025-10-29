import { forwardRef } from 'react';
import { ISurfaceProps } from './types';

export const Surface = forwardRef<HTMLDivElement, ISurfaceProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
