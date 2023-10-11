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
    preset?: string;
    type?: 'text' | 'number';
    value?: string | number;
    valueMax?: number | string;
    valueMin?: number | string;
};
declare const TextField: FC<TTextFieldProps>;

export { TextField };
