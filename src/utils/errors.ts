type TValidationMappedErrors = Record<string, string>;

interface IBadRequestMessage {
  children: unknown[];
  constraints: TValidationMappedErrors;
  property: string;
}

interface IBadRequest {
  error: string;
  message: IBadRequestMessage[];
  statusCode: number;
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
  message: string;
  name?: string;
  validator?: string;
}

export type TErrorsBag = Record<string, IError | null | undefined>;

export const extractErrorsFromApi = (e: IErrorCommon | unknown) => {
  const err = e as IErrorCommon;

  let data = err && err.response && err.response.data ? err.response.data : undefined;

  if (!data && err && err.data && err.data.statusCode) {
    data = err.data;
  }

  if (data && data.statusCode === 400 && Array.isArray(data.message)) {
    return (data.message as IBadRequestMessage[]).reduce<TErrorsBag>((acc, err) => {
      acc[err.property] = {
        name: err.property,
        message: Object.values(err.constraints)[0],
        code: data.statusCode
      };

      return acc;
    }, {});
  }

  console.error(e);

  return null;
};
