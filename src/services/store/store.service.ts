import apiClient from "../config/api";
import { BodySelector, ReqSelector, ResSelector } from "../types/typeUtils";

class StoreService {
  /**
   * ---------------------------------------------------------------
   * 1. GET Methods
   * Naming Rule: get + 리소스명[+ 세부동작][+ By + 조건명]
   * ---------------------------------------------------------------
   */

  /**
   * 재고 현황을 조회합니다
   * @returns Promise<Record<string, number>> - 상태별 재고 수량
   */
  getStoreInventory() {
    return apiClient.get<ResSelector<"/store/inventory">>("/store/inventory");
  }

  /**
   * 특정 주문 정보를 조회합니다
   * @param parameters orderId를 포함한 path 파라미터
   * @returns Promise<APIComponents["Order"]>
   */
  getStoreOrder(parameters: ReqSelector<"/store/order/{orderId}">) {
    return apiClient.get<ResSelector<"/store/order/{orderId}">>(
      `/store/order/${parameters.path.orderId}`
    );
  }

  /**
   * ---------------------------------------------------------------
   * 2. POST Methods
   * Naming Rule: post + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 새로운 주문을 생성합니다
   * @param body 주문 정보
   * @returns Promise<APIComponents["Order"]> - 생성된 주문 정보
   */
  postStoreOrder(body: BodySelector<"/store/order", "post">) {
    return apiClient.post<ResSelector<"/store/order", "post">>(
      "/store/order",
      body
    );
  }

  /**
   * ---------------------------------------------------------------
   * 3. DELETE Methods
   * Naming Rule: delete + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 특정 주문을 삭제합니다
   * @param parameters orderId를 포함한 path 파라미터
   * @returns Promise<void>
   */
  deleteStoreOrder(parameters: ReqSelector<"/store/order/{orderId}">) {
    return apiClient.delete<ResSelector<"/store/order/{orderId}", "delete">>(
      `/store/order/${parameters.path.orderId}`
    );
  }
}

export default new StoreService();
