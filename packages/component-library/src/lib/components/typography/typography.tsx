import { forwardRef, HTMLAttributes } from 'react';

type TypographyElement =
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLDivElement
  | HTMLSpanElement
  | HTMLQuoteElement
  | HTMLLabelElement;

interface ITypographyProps extends HTMLAttributes<TypographyElement> {
  as?:
    | 'p'
    | 'span'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'blockquote';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'quote';
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  weight?:
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'quinary'
    | 'senary'
    | 'septenary'
    | 'octonary'
    | 'nonary'
    | 'denary';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineHeight?: number;
  letterSpacing?: number;
  className?: string;
}

export const Typography = forwardRef<TypographyElement, ITypographyProps>(
  ({ children, ...props }, ref) => {
    const Element = (props.as || 'p') as React.ElementType;
    return (
      <Element ref={ref} {...props}>
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';
