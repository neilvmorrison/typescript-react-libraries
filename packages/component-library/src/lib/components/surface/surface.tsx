import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface ISurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Surface = forwardRef<HTMLDivElement, ISurfaceProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
