import { forwardRef } from 'react';
import { ITextInputProps } from './types';

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  (props, ref) => {
    return <input {...props} ref={ref} />;
  }
);
TextInput.displayName = 'TextInput';
