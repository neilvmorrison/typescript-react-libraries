import { HTMLAttributes, JSX } from 'react';

export type * from '../components';

// Universal size scale
export type ISize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IIntent =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning';

export interface IBasePolymorphicComponentProps<
  T extends keyof JSX.IntrinsicElements = 'div',
> extends HTMLAttributes<
    T extends keyof HTMLElementTagNameMap
      ? HTMLElementTagNameMap[T]
      : HTMLElement
  > {
  as?: T;
}
