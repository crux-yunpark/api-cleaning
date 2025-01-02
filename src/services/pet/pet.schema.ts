import type { APIComponents } from "../types/components";
import type { GetDTO, PostDTO, PutDTO, DeleteDTO } from "../types/typeUtils";

export type PetAPIPaths = {
  "/pet/{petId}": {
    get: GetDTO<
      {
        query: never;
        path: { petId: number };
      },
      APIComponents["Pet"]
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
      APIComponents["Pet"]
    >;

    delete: DeleteDTO<{ path: { petId: number } }, never>;
  };

  "/pet/{petId}/uploadImage": {
    post: PostDTO<
      {
        path: { petId: number };
      },
      {
        additionalMetadata?: string;
        file: File;
      },
      { code: number; type: string; message: string }
    >;
  };

  "/pet": {
    post: PostDTO<never, APIComponents["Pet"], APIComponents["Pet"]>;
    put: PutDTO<never, APIComponents["Pet"], APIComponents["Pet"]>;
  };

  "/pet/findByStatus": {
    get: GetDTO<
      {
        query: { status: APIComponents["Pet"]["status"][] };
      },
      APIComponents["Pet"][]
    >;
  };
};
