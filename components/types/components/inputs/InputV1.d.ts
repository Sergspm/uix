import { FC, ReactNode, SyntheticEvent } from 'react';
import './InputV1.css';
type TCommonProps = {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
    label?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};
export type TInputProps = TCommonProps;
export declare const InputV1: FC<TInputProps>;
export {};
