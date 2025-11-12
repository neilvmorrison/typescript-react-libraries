export type UseDisclosureReturn = [
    boolean,
    {
        open: () => void;
        close: () => void;
        toggle: () => void;
    }
];
export declare function useDisclosure(defaultValue?: boolean): UseDisclosureReturn;
//# sourceMappingURL=use_disclosure.d.ts.map