import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { SuccessResponse } from "../../models/SuccessResponse";
import { ProductCategoryServiceImpl } from "../service-impl/ProductCategoryServiceImpl";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import GetAllCategoriesRequest from "../requests/category/GetAllCategoriesRequest";
import DeleteCategoryRequest from "../requests/category/DeleteCategoryRequest";
import { ProductCategoryService } from "../services/ProductCategoryService";
import UpdateCategoryStatusRequest from "../requests/category/UpdateCategoryStatusRequest";

@JsonController("/product")
export default class ProductCategoryController {
  public productCategoryService: ProductCategoryService = Container.get(
    ProductCategoryServiceImpl
  );

  @Post("/createNewCategory/")
  async createProduct(
    @Body({ required: true }) createCategoryRequest: CreateCategoryRequest,
    @Res() response: Response
  ) {
    let result = await this.productCategoryService.createNewCategory(
      createCategoryRequest
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateCategory/")
  async updateCategory(
    @Body({ required: true }) updateCategoryRequest: UpdateCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.productCategoryService.updateCategory(
      updateCategoryRequest
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllCategories/")
  async getAllCategories(
    @Body({ required: false }) getCategoriesRequest: GetAllCategoriesRequest,
    @Res() response: Response
  ) {
    let result = await this.productCategoryService.getAllCategories();
    console.log("product    ", result.getValue());
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteCategoryById/")
  async deleteCategoryById(
    @Body({ required: true }) deleteCategoryRequest: DeleteCategoryRequest,
    @Res() response: Response
  ) {
    let result = await this.productCategoryService.deleteCategory(
      deleteCategoryRequest.categoryId
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateActiveStatus/")
  async updateActiveStatus(
    @Body({ required: true }) request: UpdateCategoryStatusRequest,
    @Res() response: Response
  ) {
    const result = await this.productCategoryService.updateStatusOfCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }
}
