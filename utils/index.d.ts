import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage } from 'node:http';

declare const copyToClipboard: (text: string) => Promise<void>;

type TValidationMappedErrors = Record<string, string>;
interface IBadRequestMessage {
    children: unknown[];
    constraints: TValidationMappedErrors;
    property: string;
}
interface IRtkQueryError {
    data: IBadRequest;
    status: number;
}
interface IBadRequest {
    error: string;
    message: IBadRequestMessage[];
    statusCode: number;
}
interface IStatusResponse {
    success: boolean;
}
interface IErrorCommon<T = any> extends Partial<Error> {
    data?: IBadRequest;
    response?: {
        data: T;
        status: number;
        statusText: string;
    };
    status?: number;
}
interface IError {
    code?: number;
    message: string;
    name?: string;
    validator?: string;
}
type TErrorsBag = Record<string, IError | null | undefined>;
declare const extractErrorsFromApi: (e: IErrorCommon | unknown) => TErrorsBag | null;

declare const getQueryStringParam: (params: ParsedUrlQuery | undefined, param: string) => string | null;

declare const configureWhiteIPList: (whiteIps: string[]) => void;
declare const isIpAvailable: (req: IncomingMessage) => boolean;

export { type IBadRequest, type IError, type IErrorCommon, type IRtkQueryError, type IStatusResponse, type TErrorsBag, type TValidationMappedErrors, configureWhiteIPList, copyToClipboard, extractErrorsFromApi, getQueryStringParam, isIpAvailable };
