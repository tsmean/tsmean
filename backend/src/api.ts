import * as path from 'path';
export const apiPath = (apiVersion: number, urlPrefix: string) => {
  return `/api/v${apiVersion}/${urlPrefix}`;
};
