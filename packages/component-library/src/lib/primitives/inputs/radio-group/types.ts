import { InputHTMLAttributes } from 'react';

export interface IRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface IRadioGroupProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'error' | 'label' | 'size'
  > {
  options: IRadioOption[];
  label?: string;
  error?: string;
  direction?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}
