import { IncomingMessage } from 'node:http';

let IP_WHITE_LIST: string[] = [];

export const configureWhiteIPList = (whiteIps: string[]) => {
  IP_WHITE_LIST = whiteIps;
};

export const isIpAvailable = (req: IncomingMessage) => {
  let ip = req.socket.remoteAddress ?? '';

  if (ip.indexOf('::') === 0 && typeof req.headers['x-real-ip'] === 'string') {
    ip = req.headers['x-real-ip'];
  }

  return IP_WHITE_LIST.includes(ip);
};
