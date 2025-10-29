import { InputHTMLAttributes } from 'react';
import { ISize } from '../../types';

export interface IToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ISize;
  label?: string;
  checkedText?: string;
  uncheckedText?: string;
}
