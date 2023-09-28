import { FC, SyntheticEvent } from 'react';

type TCommonProps = {
    className?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};
type TInputElementProps = TCommonProps & {
    element: 'input';
};
type TInputProps = TInputElementProps;
declare const InputV1: FC<TInputProps>;

export { InputV1, type TInputProps };
