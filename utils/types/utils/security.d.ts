import { IncomingMessage } from 'node:http';
export declare const configureWhiteIPList: (whiteIps: string[]) => void;
export declare const isIpAvailable: (req: IncomingMessage) => boolean;
