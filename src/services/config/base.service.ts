import apiClient from "../config/api";
import { APIPaths } from "../types/base";
import { BaseEndPoint } from "../types/typeUtils";

type GetBasePath<T extends string> = T extends `${infer Base}/{${string}}`
  ? Base extends `${infer RealBase}/${string}`
    ? GetBasePath<RealBase>
    : Base
  : T extends `${infer Base}/${string}`
  ? GetBasePath<Base>
  : T;

// 실제 endpoint path로부터 base path를 추론하는 타입
type InferBasePath<T extends Record<string, unknown>> = {
  [K in keyof T]: K extends string ? GetBasePath<K> : never;
}[keyof T];

/**
 * API 요청을 수행하는 기본 클래스
 */
export abstract class BaseApiService<TPath extends Partial<APIPaths>> {
  protected readonly basePath: InferBasePath<TPath> =
    "" as InferBasePath<TPath>;

  protected request<
    Path extends keyof TPath & string,
    Method extends keyof TPath[Path],
    DTOType = TPath[Path][Method]
  >(
    method: Method,
    path: Path,
    options?: DTOType extends BaseEndPoint
      ? {
          body?: DTOType["requestBody"];
          parameters?: DTOType["parameters"];
        }
      : never
  ) {
    const url = this.createUrlWithPath(path, options?.parameters?.path);
    const queryParams = options?.parameters?.query;

    return apiClient.request<
      DTOType extends BaseEndPoint ? DTOType["response"]["data"] : never
    >({
      method: method as string,
      url,
      data: options?.body,
      params: queryParams,
    });
  }

  // helper methods
  protected get<Path extends keyof TPath>(
    path: Extract<
      Path,
      keyof { [K in Path]: "get" extends keyof TPath[K] ? K : never }
    >,
    parameters?: TPath[Path]["get"] extends { parameters: any }
      ? TPath[Path]["get"]["parameters"]
      : never
  ) {
    return this.request("get", path, { parameters });
  }

  protected post<Path extends keyof TPath>(
    path: Extract<
      Path,
      keyof { [K in Path]: "post" extends keyof TPath[K] ? K : never }
    >,
    body: TPath[Path]["post"]["requestBody"],
    parameters?: TPath[Path]["post"] extends { parameters: any }
      ? TPath[Path]["post"]["parameters"]
      : never
  ) {
    return this.request("post", path, { body, parameters });
  }

  // put과 delete도 유사한 패턴으로 구현...

  private createUrlWithPath(
    path: string,
    pathParams?: Record<string, string | number>
  ) {
    if (!pathParams) return `${this.basePath}${path}`;

    let url = path;
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
    return `${this.basePath}${url}`;
  }
}
