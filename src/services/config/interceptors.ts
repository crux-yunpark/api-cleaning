import {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import { CustomError, ErrorResponse } from "../../lib/CustomError";

/**
 * 요청을 보내기 전에 토큰이 있을 경우 Authorization 헤더에 토큰을 추가하는 인터셉터.
 *
 * @param {InternalAxiosRequestConfig} config - Axios의 요청 설정 객체.
 * @returns {InternalAxiosRequestConfig} 토큰이 포함된 요청 설정 객체.
 */
export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("auth") || "";

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
};

/**
 * 응답을 성공적으로 받았을 때 호출되는 인터셉터.
 *
 * @param {AxiosResponse} response - Axios의 응답 객체.
 * @returns {AxiosResponse} 변경되지 않은 응답 객체.
 */
export const successInterceptor = {
  vd: (response: AxiosResponse) => {
    if (response.data.status === -1) {
      throw new CustomError(response.data.message, response.data.status);
    }

    return response;
  },
};

/**
 * 요청이나 응답에서 오류가 발생했을 때 호출되는 인터셉터.
 * 401(Not Authorization) 상태 코드일 경우 특별한 처리를 하고 (ex. refresh token이 있을 경우 token refresh 같은 동작),
 * 그 외의 경우에는 콘솔에 오류를 출력한다.
 *
 * @param {AxiosError} error - Axios의 오류 객체.
 * @returns {Promise<void>} 오류를 반환하는 프로미스.
 */
export const errorInterceptor = (error: AxiosError<ErrorResponse>) => {
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    Promise.reject(error);
  } else {
    console.error(error);
    return Promise.reject(error);
  }
};
