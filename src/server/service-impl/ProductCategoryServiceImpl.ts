import {Service} from "typedi";
import {Result} from "../../models/Result";
import {ProductCategory} from "../../entities/ProductCategory";
import {getCustomRepository} from "typeorm";
import {ProductCategoryRepository} from "../repositories/ProductCategoryRepository";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import {ProductCategoryService} from "../services/ProductCategoryService";
import * as firebase from 'firebase-admin';
import UpdateCategoryStatusRequest from "../requests/category/UpdateCategoryStatusRequest";
import UpdateVendorStatusRequest from "../requests/vendor/UpdateVendorStatusRequest";

@Service()
export class ProductCategoryServiceImpl implements ProductCategoryService {

    protected productCategoryRepository = getCustomRepository(ProductCategoryRepository);


    async getAllCategories(): Promise<Result> {
        const response = await this.productCategoryRepository.find();
        return Result.succesful(response);
    }

    async createNewCategory(createCategoryRequest: CreateCategoryRequest): Promise<Result> {
        const categoryModel =   new ProductCategory();
        categoryModel.fillObjectFromRequest(createCategoryRequest);
        const response = await this.productCategoryRepository.save(categoryModel)
        return Result.succesful(response);
    }

    async updateCategory(request: UpdateCategoryRequest): Promise<Result> {
        const categoryModel = new ProductCategory();
        categoryModel.id= request.id;
        categoryModel.name= request.name;
        categoryModel.description =request.description;
        categoryModel.logo =request.logo;
        categoryModel.isActive = request.isActive;
        const response = await this.productCategoryRepository.update(request.id , categoryModel);
        return Result.succesful(response);
    }

    async deleteCategory(categoryId: number): Promise<Result> {
        const response = await this.productCategoryRepository.delete(categoryId);
        return Result.succesful(response);
    }
    async updateStatusOfCategory (request  : UpdateCategoryStatusRequest): Promise<Result> {
        let category = await this.productCategoryRepository.findOne({where : {id : request.categoryId}});
        if(category){
            category.isActive = request.isActive;
            category = await this.productCategoryRepository.save(category)
        }
        return Result.succesful(category);
    }


}