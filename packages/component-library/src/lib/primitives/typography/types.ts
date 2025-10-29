import { HTMLAttributes } from 'react';

export interface ITypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  as?: ElementTag;
  variant?: ElementTag;
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

export type ElementTag =
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
  | 'blockquote';
