import { IBasePolymorphicComponentProps } from '@components/lib/types';
import { ReactNode } from 'react';

/**
 * A surface is a polymorphic container that can be used to display content.
 * @property {T} as - The HTML element to render as (default: 'div').
 * @property {boolean} withBorder - Whether to add a border to the surface.
 * @property {number} elevation - The elevation of the surface.
 * @property {ReactNode} children - The content to display inside the surface.
 */

export interface ISurfaceProps extends IBasePolymorphicComponentProps {
  withBorder?: boolean;
  elevation?: number;
  children: ReactNode;
}
