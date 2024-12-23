import { apiClient } from "../config/api";

class PetService {
  "pet/{petId}"(id: number) {
    return apiClient.get(`/pet/${id}`);
  }
}

export default new PetService();
