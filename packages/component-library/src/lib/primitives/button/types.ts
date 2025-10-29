import { ButtonHTMLAttributes } from 'react';
import { IIntent, ISize } from '../../types';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IIntent;
  size?: ISize;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  loading?: boolean;
}
