import { Result } from "../../models/Result";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";

export interface FirebaseService {

    addAllProductCategories: () => Promise<Result>;
    addAllProductSubCategories: () => Promise<Result>;
    addAllProducts: () => Promise<Result>;
    addAllVendorProducts: () => Promise<Result>;

    addAllServiceCategories: () => Promise<Result>;
    addAllServiceSubCategories: () => Promise<Result>;
    addAllServices: () => Promise<Result>;
    addAllServicePackages: () => Promise<Result>;

    addAllDeliveryAreas: () => Promise<Result>;
    addAllVendorShop: () => Promise<Result>;
    addAllUsers: () => Promise<Result>;

}