import { forwardRef } from 'react';
import { ITextInputProps } from './types';
import './text-input.module.css';
import { cn } from '../../../../utils/cn';

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input {...props} ref={ref} className={cn('textInput', className)} />
    );
  }
);
TextInput.displayName = 'TextInput';
