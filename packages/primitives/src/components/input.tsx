import { ReactNode } from 'react';
import { Size } from '../types/index';
import styles from './input.module.css';

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  size?: Size;
  error?: string;
}

export const Input = ({
  label,
  size = 'md',
  error,
  ...props
}: IInputProps): React.JSX.Element => {
  const classes = [
    styles.inputWrapper,
    styles[size],
    error && styles.errorWrapper,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
