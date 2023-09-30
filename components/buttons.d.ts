import { FC, SyntheticEvent } from 'react';

type TCommonProps = {
    className?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};
type TInputProps = TCommonProps;
declare const TextFieldSimple: FC<TInputProps>;

export { type TInputProps, TextFieldSimple };
