import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { SuccessResponse } from "../../models/SuccessResponse";
import { ServicePackageService } from "../services/ServicePackageService";
import { ServicePackageServiceImpl } from "../service-impl/ServicePackageServiceImpl";
import CreateServicePackageRequest from "../requests/service-package/CreateServicePackageRequest";
import UpdateServicePackageRequest from "../requests/service-package/UpdateServicePackageRequest";
import GetPackagesOfServiceRequest from "../requests/service-package/GetPackagesOfServiceRequest";
import DeleteServicePackageRequest from "../requests/service-package/DeleteServicePackageRequest";
import UpdatePackageStatusRequest from "../requests/service-package/UpdatePackageStatusRequest";

@JsonController("/service")
export default class ServicePackageController {
  public service: ServicePackageService = Container.get(
    ServicePackageServiceImpl
  );

  @Post("/createNewPackage/")
  async createProduct(
    @Body({ required: true }) request: CreateServicePackageRequest,
    @Res() response: Response
  ) {
    let result = await this.service.createNewServicePackage(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updatePackage/")
  async updateCategory(
    @Body({ required: true }) request: UpdateServicePackageRequest,
    @Res() response: Response
  ) {
    const result = await this.service.updateServicePackage(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllPackages/")
  async getAllPackages(
    @Body({ required: false }) request: any,
    @Res() response: Response
  ) {
    let result = await this.service.getAllServicePackages();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getPackagesByService/")
  async getPackagesByService(
    @Body({ required: false }) request: GetPackagesOfServiceRequest,
    @Res() response: Response
  ) {
    let result = await this.service.getPackagesByService(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deletePackageById/")
  async deleteCategoryById(
    @Body({ required: true }) request: DeleteServicePackageRequest,
    @Res() response: Response
  ) {
    let result = await this.service.deleteServicePackage(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updatePackageActiveStatus/")
  async updatePackageActiveStatus(
    @Body({ required: true }) request: UpdatePackageStatusRequest,
    @Res() response: Response
  ) {
    let result = await this.service.updatePackageActiveStatus(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
