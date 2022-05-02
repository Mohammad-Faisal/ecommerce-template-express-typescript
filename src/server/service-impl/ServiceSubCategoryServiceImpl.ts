import {Service} from "typedi";
import {getCustomRepository} from "typeorm";
import {ServiceSubCategoryRepository} from "../repositories/ServiceSubCategoryRepository";
import {Result} from "../../models/Result";
import {ProductSubCategory} from "../../entities/ProductSubCategory";
import {ServiceSubCategory} from "../../entities/ServiceSubCategory";
import {ServiceSubCategoryService} from "../services/ServiceSubCategoryService";
import CreateServiceSubCategoryRequest from "../requests/sub-category/CreateServiceSubCategoryRequest";
import DeleteSubCategoryRequest from "../requests/sub-category/DeleteSubCategoryRequest";
import UpdateSubCategoryRequest from "../requests/sub-category/UpdateSubCategoryRequest";
import GetSubCategoriesOfCategoryRequest from "../requests/sub-category/GetSubCategoriesOfCategoryRequest";


@Service()
export class ServiceSubCategoryServiceImpl implements ServiceSubCategoryService {

    protected serviceSubCategoryRepository = getCustomRepository(ServiceSubCategoryRepository);

    async createNewSubCategory(request: CreateServiceSubCategoryRequest): Promise<Result> {
        const model  = new ServiceSubCategory();
        model.fillObjectFromRequest(request);
        const response = await this.serviceSubCategoryRepository.save(model)
        return Result.succesful(response);
    }

    async deleteSubCategory(request: DeleteSubCategoryRequest): Promise<Result> {
        console.log(request);
        const response = await this.serviceSubCategoryRepository.delete(request.subCategoryId);
        return Result.succesful(response);
    }

    async getAllSubCategories(): Promise<Result> {
        const response = await this.serviceSubCategoryRepository.find();
        return Result.succesful(response);
    }

    async updateSubCategory(request: UpdateSubCategoryRequest): Promise<Result> {
        const model  = new ProductSubCategory();
        const response = await this.serviceSubCategoryRepository.update(request.id , model);
        return Result.succesful(response);
    }

    async getSubCategoriesOfCategory(request: GetSubCategoriesOfCategoryRequest): Promise<Result> {
        const response = await this.serviceSubCategoryRepository.find({where: {category : request.categoryId}})
        return Result.succesful(response);
    }
}