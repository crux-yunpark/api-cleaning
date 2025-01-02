import apiClient from "../config/api";
import { APIPaths } from "../types";
import { BodySelector, ReqSelector, ResSelector } from "../types/typeUtils";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export const createApi =
  <
    Path extends keyof APIPaths,
    Method extends keyof APIPaths[Path] & HttpMethod
  >(
    path: Path,
    method: Method
  ) =>
  (config?: {
    parameters?: ReqSelector<Path, Method>;
    body?: BodySelector<Path, Method>;
  }) => {
    let endpoint: string = path;

    if (config?.parameters?.path) {
      endpoint = parsePath(path, config.parameters.path);
    }

    console.log({
      endpoint,
      method,
      config,
      params: config?.parameters?.query,
    });

    return apiClient[method]<ResSelector<Path, Method>>(endpoint, {
      params: config?.parameters?.query,
      data: config?.body,
    });
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePath(path: string, pathParams: Record<string, any>) {
  const requiredParams = Array.from(
    path.matchAll(/{(\w+)}/g),
    (match) => match[1]
  );

  const missingParams = requiredParams.filter(
    (param) => !(param in pathParams)
  );

  if (missingParams.length > 0) {
    throw new Error(
      `Missing required path parameters: ${missingParams.join(", ")}`
    );
  }

  return requiredParams.reduce((acc, cur) => {
    return acc.replace(`{${cur}}`, pathParams[cur]);
  }, path);
}
