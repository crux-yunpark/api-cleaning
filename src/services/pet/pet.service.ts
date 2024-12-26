import { apiClient } from "../config/api";

class PetService {
  "/store/inventory"(
    parameter: paths["/store/inventory"]["get"]["parameters"]
  ) {
    return apiClient.get<paths["/store/inventory"]["get"]["response"]>(
      "/store/inventory",
      { params: parameter }
    );
  }
}

export default new PetService();
