import { type AxiosRequestConfig } from "axios";
import { Api } from "../../api/generated/Api";

const CONFIG: AxiosRequestConfig = {
  baseURL: "https://petstore.swagger.io/v2",
  timeout: 60_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const apiClient = new Api(CONFIG);
