import { ReactNode } from 'react';
import styles from './modal.module.css';

interface IModalProps {
  isOpen: boolean;
  title?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: IModalProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                className={styles.confirmButton}
                onClick={() => {
                  void onConfirm();
                }}
                type="button"
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
