import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage } from 'node:http';

declare const copyToClipboard: (text: string) => Promise<void>;

declare const getQueryStringParam: (params: ParsedUrlQuery | undefined, param: string) => string | null;

declare const configureWhiteIPList: (whiteIps: string[]) => void;
declare const isIpAvailable: (req: IncomingMessage) => boolean;

export { configureWhiteIPList, copyToClipboard, getQueryStringParam, isIpAvailable };
