import { Result } from "../../models/Result";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import CreateServiceRequest from "../requests/service/CreateServiceRequest";
import UpdateServiceRequest from "../requests/service/UpdateServiceRequest";
import DeleteServiceRequest from "../requests/service/DeleteServiceRequest";
import GetServiceBySubCategoryRequest from "../requests/service/GetServiceBySubCategoryRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";
import UpdateServiceStatusRequest from "../requests/service/UpdateServiceStatusRequest";

export interface ServiceService {

    createNewService: ( request: CreateServiceRequest) => Promise<Result>;

    updateService: ( request: UpdateServiceRequest) => Promise<Result>;

    getAllServices: () => Promise<Result>;

    getServicesBySubCategory: (request : GetServiceBySubCategoryRequest) => Promise<Result>;

    deleteService: (request: DeleteServiceRequest) => Promise<Result>;

    updateServiceActiveStatus: (request: UpdateServiceStatusRequest) => Promise<Result>;

}