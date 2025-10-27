import { ReactNode } from 'react';
import { Variant } from '../types/index';
import styles from './alert.module.css';

export interface IAlertProps {
  variant?: Variant;
  title?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
}

export const Alert = ({
  variant = 'primary',
  title,
  children,
  onClose,
}: IAlertProps): React.JSX.Element => {
  const classes = [styles.alert, styles[variant]].filter(Boolean).join(' ');

  return (
    <div className={classes} role="alert">
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.message}>{children}</div>
      </div>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close alert"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};
