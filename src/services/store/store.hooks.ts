import { useMutation, useQuery } from "@tanstack/react-query";
import { storeQueries } from "./store.queries";
import { BodySelector, ReqSelector } from "../types/typeUtils";
import storeService from "./store.service";

export const useGetStoreInventory = () => {
  return useQuery({
    ...storeQueries.getStoreInventory(),
    select: (data) => data.data,
  });
};

export const useGetStoreOrder = (parameters: ReqSelector<"/store/order">) => {
  return useQuery({
    ...storeQueries.getStoreOrder(parameters),
    select: (data) => data.data,
  });
};

export const usePostStoreOrder = (body: BodySelector<"/store/order">) => {
  return useMutation({
    mutationKey: ["store", "order"],
    mutationFn: () => storeService.postStoreOrder(body),
  });
};

export const useDeleteStoreOrder = (
  parameters: ReqSelector<"/store/order">
) => {
  return useMutation({
    mutationKey: ["store", "order"],
    mutationFn: () => storeService.deleteStoreOrder(parameters),
  });
};
