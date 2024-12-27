import apiClient from "../config/api";
import { BodySelector, ReqSelector, ResSelector } from "../types/typeUtils";

class UserService {
  /**
   * ---------------------------------------------------------------
   * 1. GET Methods
   * Naming Rule: get + 리소스명[+ 세부동작][+ By + 조건명]
   * ---------------------------------------------------------------
   */

  /**
   * 사용자 로그아웃
   * @returns Promise<void>
   */
  getUserLogout() {
    return apiClient.get<ResSelector<"/user/logout">>("/user/logout");
  }

  /**
   * 사용자 로그인
   * @param parameters username과 password를 포함한 쿼리 파라미터
   * @returns Promise<string> - 로그인 성공 시 세션 토큰 반환
   */
  getUserLogin(parameters: ReqSelector<"/user/login">) {
    return apiClient.get<ResSelector<"/user/login">>("/user/login", {
      params: parameters.query,
    });
  }

  /**
   * 특정 사용자 정보 조회
   * @param parameters username을 포함한 path 파라미터
   * @returns Promise<APIComponents["User"]>
   */
  getUser(parameters: ReqSelector<"/user/{username}">) {
    return apiClient.get<ResSelector<"/user/{username}">>(
      `/user/${parameters.path.username}`
    );
  }

  /**
   * ---------------------------------------------------------------
   * 2. POST Methods
   * Naming Rule: post + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 단일 사용자 생성
   * @param body 생성할 사용자 정보
   * @returns Promise<void>
   */
  postUser(body: BodySelector<"/user", "post">) {
    return apiClient.post<ResSelector<"/user", "post">>("/user", body);
  }

  /**
   * 배열을 사용하여 복수의 사용자 생성
   * @param body 생성할 사용자 정보 배열
   * @returns Promise<void>
   */
  postUserArray(body: BodySelector<"/user/createWithArray", "post">) {
    return apiClient.post<ResSelector<"/user/createWithArray", "post">>(
      "/user/createWithArray",
      body
    );
  }

  /**
   * 리스트를 사용하여 복수의 사용자 생성
   * @param body 생성할 사용자 정보 리스트
   * @returns Promise<void>
   */
  postUserList(body: BodySelector<"/user/createWithList", "post">) {
    return apiClient.post<ResSelector<"/user/createWithList", "post">>(
      "/user/createWithList",
      body
    );
  }

  /**
   * ---------------------------------------------------------------
   * 3. PUT Methods
   * Naming Rule: put + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 특정 사용자 정보 업데이트
   * @param parameters username을 포함한 path 파라미터
   * @param body 업데이트할 사용자 정보
   * @returns Promise<void>
   */
  putUser(
    parameters: ReqSelector<"/user/{username}", "put">,
    body: BodySelector<"/user/{username}", "put">
  ) {
    return apiClient.put<ResSelector<"/user/{username}", "put">>(
      `/user/${parameters.path.username}`,
      body
    );
  }

  /**
   * ---------------------------------------------------------------
   * 4. DELETE Methods
   * Naming Rule: delete + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 특정 사용자 삭제
   * @param parameters username을 포함한 path 파라미터
   * @returns Promise<void>
   */
  deleteUser(parameters: ReqSelector<"/user/{username}", "delete">) {
    return apiClient.delete<ResSelector<"/user/{username}", "delete">>(
      `/user/${parameters.path.username}`
    );
  }
}

export default new UserService();
