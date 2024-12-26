import apiClient from "../config/api";
import { ReqSelector, ResSelector } from "../config/types/typeUtils";

class PetService {
  getPet(parameters: ReqSelector<"/pet/{petId}">) {
    return apiClient.get<ResSelector<"/pet/{petId}">>(
      `/pet/${parameters.path.petId}`
    );
  }

  getPetList(parameters: ReqSelector<"/pets", "get">) {
    return apiClient.get<ResSelector<"/pets", "get">>("/pets", {
      params: parameters.query,
    });
  }
}

export default new PetService();
