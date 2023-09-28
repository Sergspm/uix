import { FC, ReactNode, SyntheticEvent } from 'react';

type TCommonProps = {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
    label?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};
type TInputProps = TCommonProps;
declare const InputV1: FC<TInputProps>;

export { InputV1, type TInputProps };
