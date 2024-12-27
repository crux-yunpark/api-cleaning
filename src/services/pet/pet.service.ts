import apiClient from "../config/api";
import { ReqSelector, ResSelector } from "../config/types/typeUtils";

class PetService {
  getPet(parameters: ReqSelector<"/pet/{petId}", "get">) {
    return apiClient.get<ResSelector<"/pet/{petId}", "get">>(
      `/pet/${parameters.path.petId}`
    );
  }
}

export default new PetService();
