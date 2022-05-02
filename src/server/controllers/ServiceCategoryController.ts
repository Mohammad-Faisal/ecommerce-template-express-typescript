import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";

import { SuccessResponse } from "../../models/SuccessResponse";
import CreateCategoryRequest from "../requests/category/CreateCategoryRequest";
import UpdateCategoryRequest from "../requests/category/UpdateCategoryRequest";
import GetAllCategoriesRequest from "../requests/category/GetAllCategoriesRequest";
import DeleteCategoryRequest from "../requests/category/DeleteCategoryRequest";
import { ServiceCategoryService } from "../services/ServiceCategoryService";
import UpdateCategoryStatusRequest from "../requests/category/UpdateCategoryStatusRequest";
import { ServiceCategoryServiceImpl } from "../service-impl/ServiceCategoryServiceImpl";

@JsonController("/service")
export default class ServiceCategoryController {
  public serviceCategoryService: ServiceCategoryService = Container.get(
    ServiceCategoryServiceImpl
  );

  @Post("/createNewCategory/")
  async createProduct(
    @Body({ required: true }) request: CreateCategoryRequest,
    @Res() response: Response
  ) {
    let result = await this.serviceCategoryService.createNewCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateCategory/")
  async updateCategory(
    @Body({ required: true }) request: UpdateCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.serviceCategoryService.updateCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllCategories/")
  async getAllCategories(
    @Body({ required: false }) request: GetAllCategoriesRequest,
    @Res() response: Response
  ) {
    let result = await this.serviceCategoryService.getAllCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteCategoryById/")
  async deleteCategoryById(
    @Body({ required: true }) request: DeleteCategoryRequest,
    @Res() response: Response
  ) {
    let result = await this.serviceCategoryService.deleteCategory(
      request.categoryId
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateActiveStatus/")
  async updateActiveStatus(
    @Body({ required: true }) request: UpdateCategoryStatusRequest,
    @Res() response: Response
  ) {
    const result = await this.serviceCategoryService.updateStatusOfCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }
}
