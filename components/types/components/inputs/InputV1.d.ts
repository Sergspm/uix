import { FC, SyntheticEvent } from 'react';
import './InputV1.css';
type TCommonProps = {
    className?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};
type TInputElementProps = TCommonProps & {
    element: 'input';
};
export type TInputProps = TInputElementProps;
export declare const InputV1: FC<TInputProps>;
export {};
