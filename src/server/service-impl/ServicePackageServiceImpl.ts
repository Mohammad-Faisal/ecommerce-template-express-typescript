import { Result } from "../../models/Result";
import {getCustomRepository} from "typeorm";
import {Service} from "typedi";
import {ServicePackageService} from "../services/ServicePackageService";
import CreateServicePackageRequest from "../requests/service-package/CreateServicePackageRequest";
import {ServicePackageRepository} from "../repositories/ServicePackageRepository";
import UpdateServicePackageRequest from "../requests/service-package/UpdateServicePackageRequest";
import DeleteServicePackageRequest from "../requests/service-package/DeleteServicePackageRequest";
import {ServicePackage} from "../../entities/ServicePackage";
import GetPackagesOfServiceRequest from "../requests/service-package/GetPackagesOfServiceRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";


@Service()
export class ServicePackageServiceImpl implements ServicePackageService {

    protected servicePackageRepository = getCustomRepository(ServicePackageRepository);

    async getAllServicePackages(): Promise<Result> {
        const response = await this.servicePackageRepository.find();
        return Result.succesful(response);
    }

    async getPackagesByService(request : GetPackagesOfServiceRequest): Promise<Result> {
        const response = await this.servicePackageRepository.find({where: {service : request.serviceId}})
        return Result.succesful(response);
    }

    async createNewServicePackage(request: CreateServicePackageRequest): Promise<Result> {
        const model = new ServicePackage();
        model.fillObjectFromRequest(request);
        const response = await this.servicePackageRepository.save(model)
        return Result.succesful(response);
    }


    async updateServicePackage(request: UpdateServicePackageRequest): Promise<Result> {
        const response = await this.servicePackageRepository.update(request.id , {"id":request.id});
        return Result.succesful(response);
    }

    async deleteServicePackage(request : DeleteServicePackageRequest): Promise<Result> {
        const response = await this.servicePackageRepository.delete(request.servicePackageId);
        return Result.succesful(response);
    }

    async updatePackageActiveStatus  (request: UpdatePackageStatusRequest) : Promise<Result> {
        let servicePackage = await this.servicePackageRepository.findOne({where : { id : request.packageId}});
        if(servicePackage){
            servicePackage.isActive = request.isActive;
            servicePackage = await this.servicePackageRepository.save(servicePackage);
        }
        return Result.succesful(servicePackage);
    }

}
