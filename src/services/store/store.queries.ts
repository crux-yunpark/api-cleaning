import { queryOptions } from "@tanstack/react-query";
import storeService from "./store.service";
import { ReqSelector } from "../types/typeUtils";

/**
 * Get 과 관련된 것들만 정의
 * @see https://github.com/TanStack/query/discussions/6096
 */
export const storeQueries = {
  all: () =>
    queryOptions({
      queryKey: ["store"],
    }),
  getStoreInventory: () =>
    queryOptions({
      queryKey: ["store", "inventory"],
      queryFn: storeService.getStoreInventory,
    }),

  storeOrder: () =>
    queryOptions({
      queryKey: ["store", "order"],
    }),
  getStoreOrder: ({
    path: { orderId },
  }: ReqSelector<"/store/order/{orderId}">) =>
    queryOptions({
      queryKey: [...storeQueries.storeOrder().queryKey, orderId],
      queryFn: () => storeService.getStoreOrder({ path: { orderId } }),
    }),
};
