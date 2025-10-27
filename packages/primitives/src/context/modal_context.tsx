import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from 'react';
import { Modal } from '../components/modal';

interface IModalState {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
}

interface IModalContextValue {
  openModal: (options: Omit<IModalState, 'isOpen'>) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModalContextValue | undefined>(
  undefined
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IModalState>({
    isOpen: false,
  });

  const openModal = useCallback((options: Omit<IModalState, 'isOpen'>) => {
    setState((prev) => ({
      ...prev,
      ...options,
      isOpen: true,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const handleConfirm = useCallback(async (): Promise<void> => {
    if (state.onConfirm) {
      await state.onConfirm();
    }
    closeModal();
  }, [state, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={state.isOpen}
        title={state.title}
        onClose={closeModal}
        onConfirm={state.onConfirm ? () => handleConfirm() : undefined}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
      >
        {state.message}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal(): IModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}
