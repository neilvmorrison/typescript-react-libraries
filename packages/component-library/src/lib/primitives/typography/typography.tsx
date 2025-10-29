import { forwardRef, ElementType, createElement } from 'react';
import { ITypographyProps } from './types';

export const Typography = forwardRef<HTMLElement, ITypographyProps>(
  ({ children, ...props }, ref) => {
    const Element = props.as ?? 'p';
    return createElement(
      Element as ElementType,
      { ref: ref as unknown, ...props },
      children
    );
  }
);

Typography.displayName = 'Typography';
