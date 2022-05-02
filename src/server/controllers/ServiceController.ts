import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";

import { SuccessResponse } from "../../models/SuccessResponse";
import { ServiceService } from "../services/ServiceService";
import { ServiceServiceImpl } from "../service-impl/ServiceServiceImpl";
import CreateServiceRequest from "../requests/service/CreateServiceRequest";
import UpdateServiceRequest from "../requests/service/UpdateServiceRequest";
import DeleteServiceRequest from "../requests/service/DeleteServiceRequest";
import GetServiceBySubCategoryRequest from "../requests/service/GetServiceBySubCategoryRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";
import UpdateServiceStatusRequest from "../requests/service/UpdateServiceStatusRequest";

@JsonController("/service")
export default class ServiceController {
  public service: ServiceService = Container.get(ServiceServiceImpl);

  @Post("/createNew/")
  async createNewService(
    @Body({ required: true }) request: CreateServiceRequest,
    @Res() response: Response
  ) {
    let result = await this.service.createNewService(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/update/")
  async updateService(
    @Body({ required: true }) request: UpdateServiceRequest,
    @Res() response: Response
  ) {
    const result = await this.service.updateService(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAll/")
  async getAllCategories(
    @Body({ required: false }) request: any,
    @Res() response: Response
  ) {
    let result = await this.service.getAllServices();
    return response.json(new SuccessResponse(result.getValue()));
  }
  @Post("/getBySubCategory/")
  async getBySubCategory(
    @Body({ required: false }) request: GetServiceBySubCategoryRequest,
    @Res() response: Response
  ) {
    let result = await this.service.getServicesBySubCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteById/")
  async deleteCategoryById(
    @Body({ required: true }) request: DeleteServiceRequest,
    @Res() response: Response
  ) {
    let result = await this.service.deleteService(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateServiceActiveStatus/")
  async updateServiceActiveStatus(
    @Body({ required: true }) request: UpdateServiceStatusRequest,
    @Res() response: Response
  ) {
    let result = await this.service.updateServiceActiveStatus(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
