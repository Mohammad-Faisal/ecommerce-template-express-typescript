import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import UpdateVendorRequest from "../requests/vendor/UpdateVendorRequest";
import { VendorService } from "../services/VendorService";
import { VendorServiceImpl } from "../service-impl/VendorServiceImpl";
import CreateVendorRequest from "../requests/vendor/CreateVendorRequest";
import DeleteVendorRequest from "../requests/vendor/DeleteVendorRequest";
import GetVendorsByProductCategoryRequest from "../requests/vendor/GetVendorsByProductCategoryRequest";
import UpdateVendorStatusRequest from "../requests/vendor/UpdateVendorStatusRequest";

@JsonController("/vendor")
export default class VendorController {
  public vendorService: VendorService = Container.get(VendorServiceImpl);

  @Post("/createNew/")
  async createProduct(
    @Body({ required: true }) createVendorRequest: CreateVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.vendorService.createNewVendor(
      createVendorRequest
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/update/")
  async updateVendor(
    @Body({ required: true }) updateVendorRequest: UpdateVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.vendorService.updateVendor(updateVendorRequest);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAll/")
  async getAllVendors(@Res() response: Response) {
    const result = await this.vendorService.getAllVendors();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getByProductCategory")
  async getByProductCategory(
    @Body({ required: true }) request: GetVendorsByProductCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.vendorService.getVendorsByProductCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteById/")
  async deleteCategoryById(
    @Body({ required: true }) deleteVendorRequest: DeleteVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.vendorService.deleteVendorById(
      deleteVendorRequest.vendorId
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateActiveStatus/")
  async updateActiveStatusOfVendor(
    @Body({ required: true }) request: UpdateVendorStatusRequest,
    @Res() response: Response
  ) {
    const result = await this.vendorService.updateActiveStatusOfVendor(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
