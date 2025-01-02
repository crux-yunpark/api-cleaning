import { queryOptions } from "@tanstack/react-query";
import { ReqSelector } from "../types/typeUtils";
import userService from "./user.service";

export const userQueries = {
  all: () =>
    queryOptions({
      queryKey: ["user"],
    }),
  getUserLogout: () =>
    queryOptions({
      queryKey: ["user", "logout"],
    }),
  // TODO: 의사결정 필요 -> 모든 arguments에 대해 하나의 객체로 던지게 규격화 할것 인지,
  // Post와 Put(body가 있는 애들)은 객체, Get과 Delete는 parameter 통으로 던지게 할 것인지
  getUserLogin: (parameters: ReqSelector<"/user/login">) =>
    queryOptions({
      queryKey: ["user", "login"],
      queryFn: () => userService.getUserLogin(parameters),
    }),

  getUser: (parameters: ReqSelector<"/user/{username}">) =>
    queryOptions({
      queryKey: ["user", parameters.path.username],
      queryFn: () => userService.getUser(parameters),
    }),
};
