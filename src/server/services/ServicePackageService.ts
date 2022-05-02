import { Result } from "../../models/Result";
import CreateServicePackageRequest from "../requests/service-package/CreateServicePackageRequest";
import UpdateServicePackageRequest from "../requests/service-package/UpdateServicePackageRequest";
import DeleteServicePackageRequest from "../requests/service-package/DeleteServicePackageRequest";
import GetPackagesOfServiceRequest from "../requests/service-package/GetPackagesOfServiceRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";

export interface ServicePackageService {

    createNewServicePackage: ( request: CreateServicePackageRequest) => Promise<Result>;

    updateServicePackage: ( updateCategoryRequest: UpdateServicePackageRequest) => Promise<Result>;

    getAllServicePackages: () => Promise<Result>;

    getPackagesByService: (request: GetPackagesOfServiceRequest) => Promise<Result>;

    deleteServicePackage: (request: DeleteServicePackageRequest) => Promise<Result>;

    updatePackageActiveStatus: (request: UpdatePackageStatusRequest) => Promise<Result>;

}