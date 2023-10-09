import { FC, SyntheticEvent, ChangeEvent } from 'react';

type TTextFieldSimpleProps = {
    className?: string;
    disabled?: boolean;
    hideNumberArrows?: boolean;
    label?: string;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'text' | 'number';
    value?: string | number;
};
declare const TextFieldSimple: FC<TTextFieldSimpleProps>;

export { TextFieldSimple };
