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
    value: TFormValue;
};
type TFormControllers = Record<string, TFormController>;

declare const isNotEmpty: ({ message }: {
    message?: string | undefined;
}) => TValidator;

interface IUseFormProps {
    defaultValues?: TFormValues;
    validators?: TFormValidatorsBag;
}
declare const useForm: (props: IUseFormProps) => {
    values: TFormValues;
    errors: TErrorsBag;
    controllers: TFormControllers;
    setValue: (name: string, value: TFormValue) => void;
    setError: (name: string, error: IError) => void;
};

declare const validateValueAsync: (value: TFormValue, validators: TValidator[]) => Promise<IError | null>;
declare const validateValue: (value: TFormValue, validators: TValidator[]) => IError | null;

export { type TFormController, type TFormControllers, type TFormValidatorsBag, type TFormValue, type TFormValues, type TValidator, isNotEmpty, useForm, validateValue, validateValueAsync };
