import * as react from 'react';
import { JSX, HTMLAttributes, ButtonHTMLAttributes, SVGAttributes, InputHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ISize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type IIntent = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
interface IBasePolymorphicComponentProps<T extends keyof JSX.IntrinsicElements = 'div'> extends HTMLAttributes<T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLElement> {
    as?: T;
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IIntent;
    size?: ISize;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    loading?: boolean;
}

interface ITypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
    as?: ElementTag;
    variant?: ElementTag;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary' | 'senary' | 'septenary' | 'octonary' | 'nonary' | 'denary';
    align?: 'left' | 'center' | 'right' | 'justify';
    truncate?: boolean;
    lineHeight?: number;
    letterSpacing?: number;
    className?: string;
}
type ElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'blockquote';

interface ILoadingSpinnerProps extends SVGAttributes<SVGSVGElement> {
    size?: ISize;
    color?: string;
}

interface IToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: ISize;
    label?: string;
    checkedText?: string;
    uncheckedText?: string;
}

interface IRadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface IRadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'error' | 'label' | 'size'> {
    options: IRadioOption[];
    label?: string;
    error?: string;
    direction?: 'vertical' | 'horizontal';
    size?: 'sm' | 'md' | 'lg';
}

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
}

declare const Button: react.ForwardRefExoticComponent<IButtonProps & react.RefAttributes<HTMLButtonElement>>;

declare const Typography: react.ForwardRefExoticComponent<ITypographyProps & react.RefAttributes<HTMLElement>>;

declare const LoadingSpinner: react.ForwardRefExoticComponent<ILoadingSpinnerProps & react.RefAttributes<SVGSVGElement>>;

declare const ToggleSwitch: react.ForwardRefExoticComponent<IToggleSwitchProps & react.RefAttributes<HTMLInputElement>>;

declare const RadioGroup: react.ForwardRefExoticComponent<IRadioGroupProps & react.RefAttributes<HTMLInputElement>>;

declare const TextInput: react.ForwardRefExoticComponent<ITextInputProps & react.RefAttributes<HTMLInputElement>>;

declare const SideNav: () => react_jsx_runtime.JSX.Element;

declare const Header: () => react_jsx_runtime.JSX.Element;

export { Button, type ElementTag, Header, type IBasePolymorphicComponentProps, type IButtonProps, type IIntent, type ILoadingSpinnerProps, type IRadioGroupProps, type IRadioOption, type ISize, type ITextInputProps, type IToggleSwitchProps, type ITypographyProps, LoadingSpinner, RadioGroup, SideNav, TextInput, ToggleSwitch, Typography };
