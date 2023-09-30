import { ParsedUrlQuery } from 'querystring';

export const getQueryStringParam = (params: ParsedUrlQuery | undefined, param: string) => {
  const value = params?.[param];

  return typeof value === 'string' ? value : null;
};
