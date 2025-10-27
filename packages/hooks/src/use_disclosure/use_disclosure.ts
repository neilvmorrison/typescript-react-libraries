import { useCallback, useState } from 'react';

export function useDisclosure(): [
  boolean,
  { open: () => void; close: () => void },
] {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, { open: openModal, close: closeModal }];
}
