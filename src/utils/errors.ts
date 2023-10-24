export type TValidationMappedErrors = Record<string, string>;

interface IBadRequestMessage {
  children: unknown[];
  constraints: TValidationMappedErrors;
  property: string;
}

export interface IRtkQueryError {
  data: IBadRequest;
  status: number;
}

export interface IBadRequest {
  error: string;
  message: IBadRequestMessage[];
  statusCode: number;
}

export interface IStatusResponse {
  success: boolean;
}

// eslint-disable-next-line
export interface IErrorCommon<T = any> extends Partial<Error> {
  data?: IBadRequest;
  response?: {
    data: T;
    status: number;
    statusText: string;
  };
  status?: number;
}

export interface IError {
  code?: number;
  details?: TValidationMappedErrors;
  message: string;
  name?: string;
  validator?: string;
}

export type TErrorsBag = Record<string, IError | null | undefined>;

export const getSyntheticError = (
  message: string,
  code?: number,
  details?: TValidationMappedErrors
): IError => ({ code: code ?? 0, message, details });

export const extractSyntheticErrorFromApi = (e: IErrorCommon | unknown) => {
  const err = e as IErrorCommon;

  let data = err && err.response && err.response.data ? err.response.data : undefined;

  if (!data && err && err.data && err.data.statusCode) {
    data = err.data;
  }

  if (data && data.statusCode === 400 && Array.isArray(data.message)) {
    return getSyntheticError(
      data.error,
      data.statusCode,
      (data.message as IBadRequestMessage[]).reduce<TValidationMappedErrors>((acc, err) => {
        acc[err.property] = Object.values(err.constraints)[0];

        return acc;
      }, {})
    );
  }

  console.error(e);

  return null;
};
