import { useCallback, useState } from 'react';

export type IUseToggleReturn<T extends boolean | string[] = boolean> = [
  T extends boolean ? boolean : string,
  () => void,
];

export function useToggle(
  initialValue: boolean | string[]
): IUseToggleReturn<typeof initialValue> {
  const [toggleIndex, setToggleIndex] = useState<number>(0);
  const [value, setValue] = useState<boolean | string>(
    typeof initialValue === 'boolean' ? initialValue : initialValue[0]
  );

  const toggle = useCallback(() => {
    if (typeof initialValue === 'boolean') {
      setValue((prev) => !prev);
    } else {
      const newIndex =
        toggleIndex === initialValue.length - 1 ? 0 : toggleIndex + 1;
      setToggleIndex(newIndex);
      setValue(initialValue[newIndex]);
    }
  }, [toggleIndex, initialValue, setValue, setToggleIndex]);

  return [value, toggle];
}
