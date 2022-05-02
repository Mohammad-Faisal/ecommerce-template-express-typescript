import {Service} from "typedi";
import {Result} from "../../models/Result";
import {getCustomRepository} from "typeorm";
import {ProductSubCategoryRepository} from "../repositories/ProductSubCategoryRepository";
import {ProductSubCategoryService} from "../services/ProductSubCategoryService";
import CreateServiceSubCategoryRequest from "../requests/sub-category/CreateServiceSubCategoryRequest";
import {ProductSubCategory} from "../../entities/ProductSubCategory";
import DeleteSubCategoryRequest from "../requests/sub-category/DeleteSubCategoryRequest";
import UpdateSubCategoryRequest from "../requests/sub-category/UpdateSubCategoryRequest";
import GetSubCategoriesOfCategoryRequest from "../requests/sub-category/GetSubCategoriesOfCategoryRequest";
import {ProductCategoryRepository} from "../repositories/ProductCategoryRepository";
import CreateProductSubCategoryRequest from "../requests/sub-category/CreateProductSubCategoryRequest";

@Service()
export class ProductSubCategoryServiceImpl implements ProductSubCategoryService {

    protected productSubCategoryRepository = getCustomRepository(ProductSubCategoryRepository);
    protected productCategoryRepository = getCustomRepository(ProductCategoryRepository);



    async createNewSubCategory(request: CreateProductSubCategoryRequest): Promise<Result> {
        const model  = new ProductSubCategory();
        model.fillObjectFromRequest(request);
        const response = await this.productSubCategoryRepository.save(model)
        return Result.succesful(response);
    }

    async deleteSubCategory(request: DeleteSubCategoryRequest): Promise<Result> {
        const response = await this.productSubCategoryRepository.delete(request.subCategoryId);
        return Result.succesful(response);
    }

    async getAllSubCategories(): Promise<Result> {
        const response = await this.productSubCategoryRepository.find();
        return Result.succesful(response);
    }

    async updateSubCategory(request: UpdateSubCategoryRequest): Promise<Result> {
        const model  = new ProductSubCategory();
        const response = await this.productSubCategoryRepository.update(request.id , model);
        return Result.succesful(response);
    }

    async getSubCategoriesOfCategory(request: GetSubCategoriesOfCategoryRequest): Promise<Result> {
        const response = await this.productCategoryRepository.findOne( {relations:['subCategories'],where: {id : request.categoryId}})
        const subCategories = response?.subCategories ? response?.subCategories : [];
        return Result.succesful(subCategories);
    }

}