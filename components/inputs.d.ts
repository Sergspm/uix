import { SyntheticEvent, ChangeEvent, FC, SVGProps, ReactNode } from 'react';

interface IError {
    code?: number;
    message: string;
    name?: string;
    validator?: string;
}

type TValidator = {
    message?: string;
    name: string;
    validate: (value: TFormValue) => boolean | Promise<boolean>;
};
type TFormValue = string | number | boolean | null | undefined;
type TFormController = {
    error: IError | null | undefined;
    hasValidators: boolean;
    onChange: (value: TFormValue, error?: IError | null) => void;
    touched: boolean;
    value: TFormValue;
};

type TTextFieldProps = {
    className?: string;
    disabled?: boolean;
    hideNumberArrows?: boolean;
    label?: string;
    onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onChange?: (value: string, error: IError | null | undefined, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
    placeholder?: string;
    preset?: string;
    type?: 'text' | 'number' | 'password';
    value?: string | number;
    valueMax?: number | string;
    valueMin?: number | string;
};
declare const TextField: FC<TTextFieldProps>;

type TSmartTextFieldProps = Omit<TTextFieldProps, 'type'> & {
    controller?: TFormController | null;
    errorIcon?: FC<SVGProps<SVGSVGElement>>;
    helpText?: string | null;
    maxAvailableSymbols?: number;
    showSymbolsLength?: boolean | 'trim';
    status?: 'error' | null;
    successIcon?: FC<SVGProps<SVGSVGElement>>;
    suffix?: ReactNode;
    type?: 'text' | 'number' | 'password' | 'textarea';
    validators?: TValidator[];
};
declare const presetsSmartTextField: Record<string, Partial<TSmartTextFieldProps>>;
declare const SmartTextField: FC<TSmartTextFieldProps>;

export { SmartTextField, type TTextFieldProps, TextField, presetsSmartTextField };
