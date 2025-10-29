import { InputHTMLAttributes } from 'react';

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
}
