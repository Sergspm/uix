import { IError } from '../utils/errors';

export type TValidator = {
  message?: string;
  name: string;
  validate: (value: TFormValue) => boolean | Promise<boolean>;
};

export type TFormValidatorsBag = Record<string, TValidator[]>;

export type TFormValue = string | string[] | number | boolean | TFormFile[] | null | undefined;

export type TFormFile = {
  file?: File | null;
  name: string;
  path?: string | null;
  size: number | null;
  type: string;
  id: string;
};

export type TFormValues = Record<string, TFormValue>;

export type TFormController = {
  error: IError | null | undefined;
  hasValidators: boolean;
  onChange: (value: TFormValue, error?: IError | null) => void;
  touched: boolean;
  value: TFormValue;
};

export type TFormControllers = Record<string, TFormController>;
