import { useCallback, useState } from 'react';

export type UseDisclosureReturn = [
  boolean,
  { open: () => void; close: () => void; toggle: () => void },
];

export function useDisclosure(defaultValue = false): UseDisclosureReturn {
  const [value, setValue] = useState(defaultValue);

  const open = useCallback(() => {
    setValue(true);
  }, []);

  const close = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, { open, close, toggle }];
}
