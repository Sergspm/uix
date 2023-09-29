import { ParsedUrlQuery } from 'querystring';

declare const copyToClipboard: (text: string) => Promise<void>;

declare const getQueryStringParam: (params: ParsedUrlQuery | undefined, param: string) => string | null;

export { copyToClipboard, getQueryStringParam };
