import { Result } from "../../models/Result";
import CreateVendorRequest from "../requests/vendor/CreateVendorRequest";
import UpdateVendorRequest from "../requests/vendor/UpdateVendorRequest";
import GetVendorsByProductCategoryRequest from "../requests/vendor/GetVendorsByProductCategoryRequest";
import UpdateVendorStatusRequest from "../requests/vendor/UpdateVendorStatusRequest";

export interface VendorService {

    createNewVendor: ( request: CreateVendorRequest) => Promise<Result>;

    updateVendor: ( request: UpdateVendorRequest) => Promise<Result>;

    getAllVendors: () => Promise<Result>;

    getVendorsByProductCategory: (request : GetVendorsByProductCategoryRequest) => Promise<Result>;

    deleteVendorById: (id : number) => Promise<Result>;

    updateActiveStatusOfVendor(request: UpdateVendorStatusRequest): Promise<Result>;

}