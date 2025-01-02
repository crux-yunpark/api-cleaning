import { type PetAPIPaths } from "../pet/pet.schema";
import { type StoreAPIPaths } from "../store/store.schema";
import { type UserAPIPaths } from "../user/user.schema";

export type APIPaths = PetAPIPaths & StoreAPIPaths & UserAPIPaths;
