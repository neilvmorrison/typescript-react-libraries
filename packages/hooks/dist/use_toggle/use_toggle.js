import { useCallback, useState } from 'react';
export function useToggle(initialValue) {
    const [toggleIndex, setToggleIndex] = useState(0);
    const [value, setValue] = useState(typeof initialValue === 'boolean' ? initialValue : initialValue[0]);
    const toggle = useCallback(() => {
        if (typeof initialValue === 'boolean') {
            setValue((prev) => !prev);
        }
        else {
            const newIndex = toggleIndex === initialValue.length - 1 ? 0 : toggleIndex + 1;
            setToggleIndex(newIndex);
            setValue(initialValue[newIndex]);
        }
    }, [toggleIndex, initialValue, setValue, setToggleIndex]);
    return [value, toggle];
}
//# sourceMappingURL=use_toggle.js.map