import axios, { type AxiosRequestConfig } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from "./interceptors";

const CONFIG: AxiosRequestConfig = {
  baseURL: "https://petstore.swagger.io/v2",
  timeout: 60_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const apiClient = axios.create(CONFIG);

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(successInterceptor, errorInterceptor);

export default apiClient;
