import { Result } from "../../models/Result";
import CreateServiceSubCategoryRequest from "../requests/sub-category/CreateServiceSubCategoryRequest";
import UpdateSubCategoryRequest from "../requests/sub-category/UpdateSubCategoryRequest";
import GetSubCategoriesOfCategoryRequest from "../requests/sub-category/GetSubCategoriesOfCategoryRequest";
import DeleteSubCategoryRequest from "../requests/sub-category/DeleteSubCategoryRequest";

export interface ServiceSubCategoryService {

    createNewSubCategory:  ( request: CreateServiceSubCategoryRequest) => Promise<Result>;

    updateSubCategory: ( request: UpdateSubCategoryRequest) => Promise<Result>;

    getAllSubCategories: () => Promise<Result>;

    getSubCategoriesOfCategory: (request : GetSubCategoriesOfCategoryRequest) => Promise<Result>;

    deleteSubCategory: (request : DeleteSubCategoryRequest) => Promise<Result>;

}