import { useCallback, useState } from 'react';

export function useToggle(
  initialValue: boolean | string[]
): [boolean | string, () => void] {
  const [toggleIndex, setToggleIndex] = useState<number>(0);
  const [value, setValue] = useState<boolean | string>(
    typeof initialValue === 'boolean' ? initialValue : initialValue[0]
  );

  const toggle = useCallback(() => {
    if (typeof initialValue === 'boolean') {
      setValue((prev) => !prev);
    } else {
      const newIndex = toggleIndex + 1;
      setToggleIndex(newIndex);
      setValue(initialValue[newIndex]);
    }
  }, [toggleIndex, initialValue, setValue, setToggleIndex]);

  return [value, toggle];
}
