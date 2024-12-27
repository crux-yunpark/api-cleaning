import apiClient from "../config/api";
import { BodySelector, ReqSelector, ResSelector } from "../types/typeUtils";

class PetService {
  /**
   * ---------------------------------------------------------------
   * 1. GET Methods
   * Naming Rule: get + 리소스명[+ 세부동작][+ By + 조건명]
   * ---------------------------------------------------------------
   */

  /**
   * 특정 ID의 반려동물 정보를 조회합니다
   * @param parameters petId를 포함한 path 파라미터
   * @returns Promise<APIComponents["Pet"]>
   */
  getPet(parameters: ReqSelector<"/pet/{petId}">) {
    return apiClient.get<ResSelector<"/pet/{petId}">>(
      `/pet/${parameters.path.petId}`
    );
  }

  /**
   * 상태별 반려동물 목록을 조회합니다
   * @param parameters status 쿼리 파라미터
   * @returns Promise<APIComponents["Pet"][]>
   */
  getPetsByStatus(parameters: ReqSelector<"/pet/findByStatus">) {
    return apiClient.get<ResSelector<"/pet/findByStatus">>(
      "/pet/findByStatus",
      { params: parameters.query }
    );
  }

  /**
   * ---------------------------------------------------------------
   * 2. POST Methods
   * Naming Rule: post + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 새로운 반려동물을 등록합니다
   * @param body 반려동물 정보
   * @returns Promise<APIComponents["Pet"]>
   */
  postPetCreate(body: BodySelector<"/pet", "post">) {
    return apiClient.post<ResSelector<"/pet", "post">>("/pet", body);
  }

  /**
   * 특정 반려동물의 정보를 업데이트합니다 (Form 데이터)
   * @param parameters petId를 포함한 path 파라미터
   * @param body 업데이트할 정보 (name, status)
   * @returns Promise<APIComponents["Pet"]>
   */
  postPetUpdate(
    parameters: ReqSelector<"/pet/{petId}", "post">,
    body: BodySelector<"/pet/{petId}", "post">
  ) {
    return apiClient.post<ResSelector<"/pet/{petId}", "post">>(
      `/pet/${parameters.path.petId}`,
      body
    );
  }

  /**
   * 반려동물의 이미지를 업로드합니다
   * @param parameters petId를 포함한 path 파라미터
   * @param body 이미지 파일과 메타데이터
   * @returns Promise<{ code: number; type: string; message: string }>
   */
  postPetImage(
    parameters: ReqSelector<"/pet/{petId}/uploadImage", "post">,
    body: BodySelector<"/pet/{petId}/uploadImage", "post">
  ) {
    const formData = new FormData();
    if (body.additionalMetadata) {
      formData.append("additionalMetadata", body.additionalMetadata);
    }
    formData.append("file", body.file);

    return apiClient.post<ResSelector<"/pet/{petId}/uploadImage", "post">>(
      `/pet/${parameters.path.petId}/uploadImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  /**
   * ---------------------------------------------------------------
   * 3. PUT Methods
   * Naming Rule: put + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 반려동물 정보를 업데이트합니다
   * @param body 업데이트할 반려동물 정보
   * @returns Promise<APIComponents["Pet"]>
   */
  putPet(body: BodySelector<"/pet", "put">) {
    return apiClient.put<ResSelector<"/pet", "put">>("/pet", body);
  }

  /**
   * ---------------------------------------------------------------
   * 4. DELETE Methods
   * Naming Rule: delete + 리소스명[+ 세부동작]
   * ---------------------------------------------------------------
   */

  /**
   * 반려동물을 삭제합니다
   * @param parameters petId를 포함한 path 파라미터
   * @returns Promise<void>
   */
  deletePet(parameters: ReqSelector<"/pet/{petId}", "delete">) {
    return apiClient.delete<ResSelector<"/pet/{petId}", "delete">>(
      `/pet/${parameters.path.petId}`
    );
  }
}

export default new PetService();
