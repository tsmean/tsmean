export const apiPath = (apiVersion: number, urlPrefix: string) => {
  return `/api/v${apiVersion}/${urlPrefix}`;
};
