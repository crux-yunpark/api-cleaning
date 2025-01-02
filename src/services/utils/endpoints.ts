import apiClient from "../config/api";
import { APIPaths } from "../types/base";
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
  }) =>
    apiClient[method]<ResSelector<Path, Method>>(path, {
      params: config?.parameters,
      data: config?.body,
    });
