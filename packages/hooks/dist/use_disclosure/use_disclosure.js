import { useCallback, useState } from 'react';
export function useDisclosure(defaultValue = false) {
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
//# sourceMappingURL=use_disclosure.js.map