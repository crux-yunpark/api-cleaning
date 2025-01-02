import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { userQueries } from "./user.queries";
import { BodySelector, ReqSelector } from "../types/typeUtils";
import userService from "./user.service";

export const useGetUserLogout = () =>
  useQuery({
    ...userQueries.getUserLogout(),
  });

export const useGetUserLogin = (parameters: ReqSelector<"/user/login">) =>
  useQuery({
    ...userQueries.getUserLogin(parameters),
  });

export const useGetUser = (parameters: ReqSelector<"/user/{username}">) =>
  useQuery({
    ...userQueries.getUser(parameters),
  });

export const usePostUser = (body: BodySelector<"/user", "post">) =>
  useMutation({
    mutationFn: () => userService.postUser({ body }),
  });

export const usePostUserArray = (
  body: BodySelector<"/user/createWithArray", "post">
) =>
  useMutation({
    mutationFn: () => userService.postUserArray({ body }),
  });

export const usePostUserList = (
  body: BodySelector<"/user/createWithList", "post">
) =>
  useMutation({
    mutationFn: () => userService.postUserList({ body }),
    onSettled: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: userQueries.all().queryKey });
    },
  });

export const usePutUser = ({
  parameters,
  body,
}: {
  parameters: ReqSelector<"/user/{username}", "put">;
  body: BodySelector<"/user/{username}", "put">;
}) =>
  useMutation({
    mutationFn: () => userService.putUser({ parameters, body }),
    onSettled: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: userQueries.all().queryKey });
    },
  });

export const useDeleteUser = (
  parameters: ReqSelector<"/user/{username}", "delete">
) =>
  useMutation({
    mutationFn: () => userService.deleteUser(parameters),
    onSettled: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: userQueries.all().queryKey });
    },
  });
