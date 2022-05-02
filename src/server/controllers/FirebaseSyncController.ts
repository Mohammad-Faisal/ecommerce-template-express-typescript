import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { SuccessResponse } from "../../models/SuccessResponse";
import { FirebaseService } from "../services/FirebaseService";
import { FirebaseServiceImpl } from "../service-impl/FirebaseServiceImpl";

@JsonController("/firebase")
export default class FirebaseSyncController {
  public firebaseService: FirebaseService = Container.get(FirebaseServiceImpl);

  @Post("/addAllProductCategories/")
  async addAllProductCategories(@Res() response: Response) {
    let result = await this.firebaseService.addAllProductCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllProductSubCategories/")
  async addAllProductSubCategories(@Res() response: Response) {
    let result = await this.firebaseService.addAllProductSubCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllProducts/")
  async addAllProducts(@Res() response: Response) {
    let result = await this.firebaseService.addAllProducts();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllVendorProducts/")
  async addAllVendorProducts(@Res() response: Response) {
    let result = await this.firebaseService.addAllVendorProducts();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllServiceCategories/")
  async addAllServiceCategories(@Res() response: Response) {
    let result = await this.firebaseService.addAllServiceCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllServiceSubCategories/")
  async addAllServiceSubCategories(@Res() response: Response) {
    let result = await this.firebaseService.addAllServiceSubCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllServices/")
  async addAllServices(@Res() response: Response) {
    let result = await this.firebaseService.addAllServices();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllServicePackages/")
  async addAllServicePackages(@Res() response: Response) {
    let result = await this.firebaseService.addAllServicePackages();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllDeliveryAreas/")
  async addAllDeliveryAreas(@Res() response: Response) {
    let result = await this.firebaseService.addAllDeliveryAreas();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllVendorShop/")
  async addAllVendorShop(@Res() response: Response) {
    let result = await this.firebaseService.addAllVendorShop();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addAllUsers/")
  async addAllUsers(@Res() response: Response) {
    let result = await this.firebaseService.addAllUsers();
    return response.json(new SuccessResponse(result.getValue()));
  }
}
