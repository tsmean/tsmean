import * as path from 'path';
export const apiPath = (apiVersion: number, urlPrefix: string) => {
  return path.join('/api/', 'v' + apiVersion, urlPrefix);
};
