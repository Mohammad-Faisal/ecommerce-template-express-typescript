
import {Service} from "typedi";
import {getCustomRepository} from "typeorm";
import {Result} from "../../models/Result";
import {ServiceCategory} from "../../entities/ServiceCategory";
import {ServiceCategoryService} from "../services/ServiceCategoryService";
import {ServiceCategoryRepository} from "../repositories/ServiceCategoryRepository";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import UpdateCategoryStatusRequest from "../requests/category/UpdateCategoryStatusRequest";


@Service()
export class ServiceCategoryServiceImpl implements ServiceCategoryService {

    protected serviceCategoryRepository = getCustomRepository(ServiceCategoryRepository);

    async getAllCategories(): Promise<Result> {
        const response = await this.serviceCategoryRepository.find();
        return Result.succesful(response);
    }

    async createNewCategory(createCategoryRequest: CreateCategoryRequest): Promise<Result> {
        const categoryModel =   new ServiceCategory();
        categoryModel.fillObjectFromRequest(createCategoryRequest);
        const response = await this.serviceCategoryRepository.save(categoryModel)
        return Result.succesful(response);
    }


    async updateCategory(request: UpdateCategoryRequest): Promise<Result> {
        const categoryModel = new ServiceCategory();
        categoryModel.id= request.id;
        categoryModel.name= request.name;
        categoryModel.description =request.description;
        categoryModel.logo =request.logo;
        categoryModel.isActive = request.isActive;
        const response = await this.serviceCategoryRepository.update(categoryModel , {"id":categoryModel.id});
        return Result.succesful(response);
    }

    async deleteCategory(categoryId: number): Promise<Result> {
        const response = await this.serviceCategoryRepository.delete(categoryId);
        return Result.succesful(response);
    }

    async updateStatusOfCategory (request  : UpdateCategoryStatusRequest): Promise<Result> {
        let category = await this.serviceCategoryRepository.findOne({where : {id : request.categoryId}});
        if(category){
            category.isActive = request.isActive;
            category = await this.serviceCategoryRepository.save(category)
        }
        return Result.succesful(category);
    }

}