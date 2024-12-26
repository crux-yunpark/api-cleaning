import { type APIComponents } from "../config/types/base";
import {
  DeleteDTO,
  GetDTO,
  PostDTO,
  ReqSelector,
  ResSelector,
  type APIResponse,
} from "../config/types/typeUtils";

export type PetAPIPaths = {
  "/pet/{petId}": {
    get: GetDTO<
      {
        query: never;
        path: { petId: number };
      },
      APIResponse<APIComponents["Pet"]>
    >;

    post: PostDTO<
      {
        query?: never;
        path: { petId: number };
      },
      {
        name: string;
        status: string;
      },
      APIResponse<APIComponents["Pet"]>
    >;

    delete: DeleteDTO<never, never>;
  };

  "/pets": {
    get: GetDTO<
      {
        query: {
          status: string;
          startDate: string;
        };
      },
      APIResponse<APIComponents["Pet"][]>
    >;
  };
};

type GetPetReq = ReqSelector<"/pet/{petId}">;
type GetPetRes = ResSelector<"/pet/{petId}">;
type PostPetReq = ReqSelector<"/pets", "get">;
