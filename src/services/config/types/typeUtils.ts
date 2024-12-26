import { APIPaths } from "./base";

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  code: number;
}

type BaseParams = {
  query?: Record<string, unknown> | never;
  path?: Record<string, unknown> | never;
};

export type BaseEndPoint<
  TParams extends BaseParams = BaseParams,
  TBody = never,
  TResponse = unknown
> = {
  parameters: TParams;
  requestBody: TBody;
  response: APIResponse<TResponse>;
};

export type GetDTO<
  TParams extends BaseParams = BaseParams,
  TResponse = unknown
> = BaseEndPoint<TParams, never, TResponse>;

export type PostDTO<
  TParams extends BaseParams = BaseParams,
  TBody = never,
  TResponse = unknown
> = BaseEndPoint<TParams, TBody, TResponse>;

export type PutDTO<
  TParams extends BaseParams = BaseParams,
  TBody = never,
  TResponse = unknown
> = BaseEndPoint<TParams, TBody, TResponse>;

export type DeleteDTO<
  TParams extends BaseParams = BaseParams,
  TResponse = unknown
> = BaseEndPoint<TParams, never, TResponse>;

export type PatchDTO<
  TParams extends BaseParams = BaseParams,
  TBody = never,
  TResponse = unknown
> = BaseEndPoint<TParams, TBody, TResponse>;

// 파라미터 선택자
export type ReqSelector<
  TParam extends keyof APIPaths,
  TMethod extends keyof APIPaths[TParam] = "get"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = APIPaths[TParam][TMethod] extends BaseEndPoint<infer Params, any, any>
  ? Params
  : never;

export type ResSelector<
  TParam extends keyof APIPaths,
  TMethod extends keyof APIPaths[TParam] = "get"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = APIPaths[TParam][TMethod] extends BaseEndPoint<any, any, infer Response>
  ? Response
  : never;
