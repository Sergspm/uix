import { FC, ChangeEvent, SyntheticEvent } from 'react';

type TTextFieldSimpleProps = {
    className?: string;
    placeholder?: string;
    label?: string;
    value?: string | number;
    onChange?: (value: string | null, event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};
declare const TextFieldSimple: FC<TTextFieldSimpleProps>;

export { TextFieldSimple };
