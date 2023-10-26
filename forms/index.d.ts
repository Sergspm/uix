type TValidationMappedErrors = Record<string, string>;
interface IError {
    code?: number;
    details?: TValidationMappedErrors;
    message: string;
    name?: string;
    validator?: string;
}
type TErrorsBag = Record<string, IError | null | undefined>;

type TValidator = {
    message?: string;
    name: string;
    validate: (value: TFormValue) => boolean | Promise<boolean>;
};
type TFormValidatorsBag = Record<string, TValidator[]>;
type TFormValue = string | number | boolean | null | undefined;
type TFormValues = Record<string, TFormValue>;
type TFormController = {
    error: IError | null | undefined;
    hasValidators: boolean;
    onChange: (value: TFormValue, error?: IError | null) => void;
    touched: boolean;
    value: TFormValue;
};
type TFormControllers = Record<string, TFormController>;

type TIsNotEmptyProps = {
    message?: string;
    trim?: boolean;
};
declare const isNotEmpty: (props?: TIsNotEmptyProps) => TValidator;
type TIsStringLengthProps = {
    max?: number;
    message?: string;
    min?: number;
    trim?: boolean;
};
declare const isStringLength: (props?: TIsStringLengthProps) => TValidator;

interface IUseFormProps {
    defaultValues?: TFormValues;
    validators?: TFormValidatorsBag;
}
declare const useForm: (props?: IUseFormProps) => {
    values: TFormValues;
    errors: TErrorsBag;
    controllers: TFormControllers;
    setValue: (name: string, value: TFormValue) => void;
    setValues: (values: TFormValues) => void;
    setError: (name: string, error: IError) => void;
};

declare const validateValueAsync: (value: TFormValue, validators: TValidator[]) => Promise<IError | null>;
declare const validateValue: (value: TFormValue, validators: TValidator[]) => IError | null;

export { type TFormController, type TFormControllers, type TFormValidatorsBag, type TFormValue, type TFormValues, type TValidator, isNotEmpty, isStringLength, useForm, validateValue, validateValueAsync };
