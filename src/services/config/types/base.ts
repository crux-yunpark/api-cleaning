import { PetAPIPaths } from "../../pet/pet.schema";
import { StoreAPIPaths } from "../../store/store.schema";
import { UserAPIPaths } from "../../user/user.schema";

export type APIComponents = {
  YesOrNo: "Y" | "N";
  StoreOptions: string[]; // store option 정의 객체

  Tag: {
    /** @format int64 */
    id?: number;
    name?: string;
  };

  Category: {
    /** @format int64 */
    id?: number;
    name?: string;
  };

  Pet: {
    /** @format int64 */
    id?: number;
    category?: APIComponents["Category"];
    /** @example "doggie" */
    name: string;
    photoUrls: string[];
    tags?: APIComponents["Tag"][];
    /** pet status in the store */
    status?: "available" | "pending" | "sold";
  };

  Order: {
    /** @format int64 */
    id?: number;
    /** @format int64 */
    petId?: number;
    /** @format int32 */
    quantity?: number;
    /** @format date-time */
    shipDate?: string;
    /** Order Status */
    status?: "placed" | "approved" | "delivered";
    complete?: boolean;
  };

  User: {
    /** @format int64 */
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /**
     * User Status
     * @format int32
     */
    userStatus?: number;
  };
};

export type APIPaths = PetAPIPaths & StoreAPIPaths & UserAPIPaths;
