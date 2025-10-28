import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../../utils';

export interface ITypographyProps {
  children: ReactNode;
  className?: string;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
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
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'normal' | 'relaxed' | 'loose';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
  truncate?: boolean;
}

const typographySizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const typographyWeights = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
};

const typographyColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  danger: 'text-danger',
  success: 'text-success',
  warning: 'text-warning',
};

const typographyAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const typographyLineHeights = {
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

const typographyLetterSpacings = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

const typographyTextTransforms = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

const typographyTextDecorations = {
  none: 'no-underline',
  underline: 'underline',
  overline: 'overline',
  lineThrough: 'line-through',
};

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

const elementMap: Record<TypographyElement, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  div: 'div',
};

export const Typography = forwardRef<HTMLElement, ITypographyProps>(
  (
    {
      children,
      className,
      component = 'p',
      size,
      weight,
      color,
      align,
      lineHeight,
      letterSpacing,
      textTransform,
      textDecoration,
      truncate,
      ...props
    },
    ref
  ) => {
    const Element = elementMap[component];

    const classes = cn(
      size && typographySizes[size as keyof typeof typographySizes],
      weight && typographyWeights[weight as keyof typeof typographyWeights],
      color && typographyColors[color as keyof typeof typographyColors],
      align && typographyAligns[align as keyof typeof typographyAligns],
      lineHeight &&
        typographyLineHeights[lineHeight as keyof typeof typographyLineHeights],
      letterSpacing &&
        typographyLetterSpacings[
          letterSpacing as keyof typeof typographyLetterSpacings
        ],
      textTransform &&
        typographyTextTransforms[
          textTransform as keyof typeof typographyTextTransforms
        ],
      textDecoration &&
        typographyTextDecorations[
          textDecoration as keyof typeof typographyTextDecorations
        ],
      truncate && 'truncate',
      className
    );

    return (
      <Element ref={ref} className={classes} {...props}>
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';
