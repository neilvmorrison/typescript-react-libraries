export type IUseToggleReturn<T extends boolean | string[] = boolean> = [
    T extends boolean ? boolean : string,
    () => void
];
export declare function useToggle(initialValue: boolean | string[]): IUseToggleReturn<typeof initialValue>;
//# sourceMappingURL=use_toggle.d.ts.map