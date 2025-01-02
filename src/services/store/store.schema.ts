import type { APIComponents } from "../types/components";
import type { GetDTO, PostDTO } from "../types/typeUtils";

export type StoreAPIPaths = {
  "/store/inventory": {
    get: GetDTO<never, Record<string, number>>;
  };

  "/store/order": {
    post: PostDTO<never, APIComponents["Order"], APIComponents["Order"]>;
  };

  "/store/order/{orderId}": {
    get: GetDTO<{ path: { orderId: number } }, APIComponents["Order"]>;
    delete: GetDTO<{ path: { orderId: number } }, void>;
  };
};
