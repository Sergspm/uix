import { FC, SVGProps, ChangeEvent, ReactNode } from 'react';

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
type TFormValue = string | number | boolean | TFormFile | null | undefined;
type TFormFile = {
    file?: File | null;
    name: string;
    publicPath?: string | null;
    size: number | null;
    type: string;
};
type TFormController = {
    error: IError | null | undefined;
    hasValidators: boolean;
    onChange: (value: TFormValue, error?: IError | null) => void;
    touched: boolean;
    value: TFormValue;
};

type TSimpleFileFieldProps = {
    buttonText?: string;
    className?: string;
    classNameButton?: string;
    controller?: TFormController | null;
    disabled?: boolean;
    errorIcon?: FC<SVGProps<SVGSVGElement>>;
    fileIcon?: FC<SVGProps<SVGSVGElement>>;
    helpText?: string;
    label?: string;
    onChange?: (value: TFormFile | null, error: IError | null | undefined, event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    preset?: string;
    status?: 'error' | null;
    validators?: TValidator[];
    value?: TFormFile | null;
};
declare const presetsSimpleFileField: Record<string, Partial<TSimpleFileFieldProps>>;
declare const SimpleFileField: FC<TSimpleFileFieldProps>;

type TTextFieldProps = {
    className?: string;
    disabled?: boolean;
    hideNumberArrows?: boolean;
    label?: string;
    onChange?: (value: string, error: IError | null | undefined, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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

export { SimpleFileField, SmartTextField, type TTextFieldProps, TextField, presetsSimpleFileField, presetsSmartTextField };
