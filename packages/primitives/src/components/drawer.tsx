import { ReactNode } from 'react';
import styles from './drawer.module.css';

type DrawerPosition = 'left' | 'right';

interface IDrawerProps {
  isOpen: boolean;
  position?: DrawerPosition;
  children: ReactNode;
  onClose: () => void;
  width?: string;
}

export const Drawer = ({
  isOpen,
  position = 'right',
  children,
  onClose,
  width = '350px',
}: IDrawerProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div
        className={`${styles.drawer} ${styles[position]}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close drawer"
          type="button"
        >
          ✕
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
