import { ReactNode } from 'react';
import { Variant, Size } from '../types/index';
import styles from './button.module.css';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: IButtonProps): React.JSX.Element => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled ?? isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
