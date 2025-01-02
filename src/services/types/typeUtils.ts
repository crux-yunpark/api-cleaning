import { APIPaths } from "./index";

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

// get이 있으면 get을, 없으면 첫 번째 메서드를 반환하는 유틸리티 타입
type PreferGetMethod<TPath> = "get" extends keyof TPath
  ? "get"
  : keyof TPath extends infer K
  ? K extends string
    ? K
    : never
  : never;

type PreferPostMethod<TPath> = "post" extends keyof TPath
  ? "post"
  : keyof TPath extends infer K
  ? K extends "put"
    ? K
    : never
  : never;

// 파라미터 선택자
export type ReqSelector<
  TPath extends keyof APIPaths,
  TMethod extends keyof APIPaths[TPath] = PreferGetMethod<APIPaths[TPath]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = APIPaths[TPath][TMethod] extends BaseEndPoint<infer Params, any, any>
  ? Params
  : never;

export type ResSelector<
  TPath extends keyof APIPaths,
  TMethod extends keyof APIPaths[TPath] = PreferGetMethod<APIPaths[TPath]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = APIPaths[TPath][TMethod] extends BaseEndPoint<any, any, infer Response>
  ? Response
  : never;

// Request Body 선택자 추가
export type BodySelector<
  TPath extends keyof APIPaths,
  TMethod extends keyof APIPaths[TPath] = PreferPostMethod<APIPaths[TPath]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = APIPaths[TPath][TMethod] extends BaseEndPoint<any, infer Body, any>
  ? Body extends never
    ? never
    : Body
  : never;
