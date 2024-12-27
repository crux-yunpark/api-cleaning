import type { APIComponents } from "../types/base";
import type { GetDTO, PostDTO, DeleteDTO, PutDTO } from "../types/typeUtils";

export type UserAPIPaths = {
  "/user": {
    post: PostDTO<never, APIComponents["User"], void>;
  };

  "/user/createWithArray": {
    post: PostDTO<never, APIComponents["User"][], void>;
  };

  "/user/createWithList": {
    post: PostDTO<never, APIComponents["User"][], void>;
  };

  "/user/logout": {
    get: GetDTO<never, void>;
  };

  "/user/login": {
    get: GetDTO<{ query: { username: string; password: string } }, string>;
  };

  "/user/{username}": {
    get: GetDTO<{ path: { username: string } }, APIComponents["User"]>;
    put: PutDTO<{ path: { username: string } }, APIComponents["User"], void>;
    delete: DeleteDTO<{ path: { username: string } }, void>;
  };
};
