import { Result } from "../../models/Result";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import UpdateCategoryStatusRequest from "../requests/category/UpdateCategoryStatusRequest";

export interface ServiceCategoryService {

    createNewCategory: ( createCategoryRequest: CreateCategoryRequest) => Promise<Result>;

    updateCategory: ( updateCategoryRequest: UpdateCategoryRequest) => Promise<Result>;

    getAllCategories: () => Promise<Result>;

    deleteCategory: (id : number) => Promise<Result>;

    updateStatusOfCategory: (request  : UpdateCategoryStatusRequest) => Promise<Result>;

}