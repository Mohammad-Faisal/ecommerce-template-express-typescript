import { Result } from "../../models/Result";
import {getCustomRepository} from "typeorm";
import {ServiceService} from "../services/ServiceService";
import {ServiceRepository} from "../repositories/ServiceRepository";
import CreateServiceRequest from "../requests/service/CreateServiceRequest";
import {ServiceEntity} from "../../entities/ServiceEntity";
import UpdateServiceRequest from "../requests/service/UpdateServiceRequest";
import DeleteServiceRequest from "../requests/service/DeleteServiceRequest";
import {Service} from "typedi";
import GetServiceBySubCategoryRequest from "../requests/service/GetServiceBySubCategoryRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";
import UpdateServiceStatusRequest from "../requests/service/UpdateServiceStatusRequest";


@Service()
export class ServiceServiceImpl implements ServiceService {

    protected serviceRepository = getCustomRepository(ServiceRepository);

    async getAllServices(): Promise<Result> {
        const response = await this.serviceRepository.find();
        return Result.succesful(response);
    }

    async getServicesBySubCategory(request : GetServiceBySubCategoryRequest): Promise<Result> {
        const response = await this.serviceRepository.find({where: {subcategory : request.subCategoryId}})
        return Result.succesful(response);
    }

    async createNewService(request: CreateServiceRequest): Promise<Result> {
        const model = new ServiceEntity();
        model.fillObjectFromRequest(request);
        const response = await this.serviceRepository.save(model)
        return Result.succesful(response);
    }


    async updateService(request: UpdateServiceRequest): Promise<Result> {
        const response = await this.serviceRepository.update(request.id , {"id":request.id});
        return Result.succesful(response);
    }

    async deleteService(request : DeleteServiceRequest): Promise<Result> {
        const response = await this.serviceRepository.delete(request.serviceId);
        return Result.succesful(response);
    }

    async updateServiceActiveStatus  (request: UpdateServiceStatusRequest) : Promise<Result> {
        let service = await this.serviceRepository.findOne({where : { id : request.serviceId}});
        if(service){
            service.isActive = request.isActive;
            service = await this.serviceRepository.save(service);
        }
        return Result.succesful(service);
    }


}
