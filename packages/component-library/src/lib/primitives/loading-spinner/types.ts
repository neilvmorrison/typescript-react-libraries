import { SVGAttributes } from 'react';
import { ISize } from '../../types';

export interface ILoadingSpinnerProps extends SVGAttributes<SVGSVGElement> {
  size?: ISize;
  color?: string;
}
