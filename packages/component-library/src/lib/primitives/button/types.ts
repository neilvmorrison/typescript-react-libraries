import { ButtonHTMLAttributes } from 'react';
import { ISize } from '../../types';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: ISize;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  loading?: boolean;
}
