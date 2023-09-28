import { FC, ReactNode, SyntheticEvent } from 'react';

type TCommonProps = {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    error?: boolean;
    validationRight?: boolean;
    onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};
type TInputProps = TCommonProps;
declare const TextFieldSimple: FC<TInputProps>;

export { type TInputProps, TextFieldSimple };
