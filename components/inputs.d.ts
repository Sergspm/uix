import { FC, SyntheticEvent, ChangeEvent } from 'react';

type TTextFieldProps = {
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
    preset?: string;
};
declare const TextField: FC<TTextFieldProps>;

export { TextField };
