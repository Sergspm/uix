import { IError } from '../utils/errors';

export type TValidator = {
  message?: string;
  name: string;
  validate: (value: TFormValue) => boolean | Promise<boolean>;
};

export type TFormValidatorsBag = Record<string, TValidator[]>;

export type TFormValue = string | number | boolean | null | undefined;

export type TFormValues = Record<string, TFormValue>;

export type TFormController = {
  error: IError | null | undefined;
  hasValidators: boolean;
  touched: boolean;
  onChange: (value: TFormValue, error?: IError | null) => void;
  value: TFormValue;
};

export type TFormControllers = Record<string, TFormController>;
