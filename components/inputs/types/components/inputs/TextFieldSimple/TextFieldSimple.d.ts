import { FC, ReactNode, SyntheticEvent } from 'react';
import './TextFieldSimple.css';
type TCommonProps = {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
    label?: string;
    error?: boolean;
    value?: string;
    onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};
export type TInputProps = TCommonProps;
export declare const TextFieldSimple: FC<TInputProps>;
export {};
