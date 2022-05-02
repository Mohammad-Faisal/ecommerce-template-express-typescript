import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import { ServiceSubCategoryService } from "../services/ServiceSubCategoryService";
import { ServiceSubCategoryServiceImpl } from "../service-impl/ServiceSubCategoryServiceImpl";
import CreateServiceSubCategoryRequest from "../requests/sub-category/CreateServiceSubCategoryRequest";
import UpdateSubCategoryRequest from "../requests/sub-category/UpdateSubCategoryRequest";
import GetAllSubCategoriesRequest from "../requests/sub-category/GetAllSubCategoriesRequest";
import DeleteSubCategoryRequest from "../requests/sub-category/DeleteSubCategoryRequest";
import GetSubCategoriesOfCategoryRequest from "../requests/sub-category/GetSubCategoriesOfCategoryRequest";

@JsonController("/service")
export default class ServiceSubCategoryController {
  public serviceSubCategoryService: ServiceSubCategoryService = Container.get(
    ServiceSubCategoryServiceImpl
  );

  @Post("/createNewSubCategory/")
  async createServiceSubCategory(
    @Body({ required: true }) request: CreateServiceSubCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.serviceSubCategoryService.createNewSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateSubCategory/")
  async updateServiceSubCategory(
    @Body({ required: true }) request: UpdateSubCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.serviceSubCategoryService.updateSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllSubCategory/")
  async getAllServiceSubCategory(
    @Body({ required: false }) request: GetAllSubCategoriesRequest,
    @Res() response: Response
  ) {
    let result: any =
      await this.serviceSubCategoryService.getAllSubCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteSubCategory/")
  async deleteServiceSubCategory(
    @Body({ required: true }) request: DeleteSubCategoryRequest,
    @Res() response: Response
  ) {
    let result: any = await this.serviceSubCategoryService.deleteSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getSubCategoriesOfCategory/")
  async getServiceSubCategoriesOfCategory(
    @Body({ required: true }) request: GetSubCategoriesOfCategoryRequest,
    @Res() response: Response
  ) {
    let result: any =
      await this.serviceSubCategoryService.getSubCategoriesOfCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
