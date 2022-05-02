import {
  JsonController,
  Body,
  Get,
  Post,
  Res,
  getMetadataArgsStorage,
} from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import { UserServiceImpl } from "../service-impl/UserServiceImpl";
import GetUserWithFirebaseIdRequest from "../requests/user/GetUserWithFirebaseIdRequest";
import { UserService } from "../services/UserService";

import CreateUserRequest from "../requests/user/CreateUserRequest";
import AddDeliveryInfoRequest from "../requests/user/AddDeliveryInfoRequest";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import DeleteDeliveryInfoRequest from "../requests/order/DeleteDeliveryInfoRequest";
import AddContactInfoRequest from "../requests/user/AddContactInfoRequest";
import DeleteContactInfoRequest from "../requests/order/DeleteContactInfoRequest";
import { OpenAPI, routingControllersToSpec } from "routing-controllers-openapi";

@JsonController("/user")
export default class UserController {
  public userService: UserService = Container.get(UserServiceImpl);

  @Post("/getWithFirebaseId/")
  async getUserWithFirebaseId(
    @Body({ required: true }) request: GetUserWithFirebaseIdRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.getWithFirebaseId(request);
    return response.json(new SuccessResponse(result.getValue()[0]));
  }

  @Post("/createNew/")
  @OpenAPI({ summary: "Create a new user" })
  async createNew(
    @Body({ required: true }) request: CreateUserRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.createNewUser(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addDeliveryInformation/")
  async addDeliveryInformation(
    @Body({ required: true }) request: AddDeliveryInfoRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.addDeliveryInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getDeliveryInfoOfUser/")
  async getDeliveryInfoOfUser(
    @Body({ required: true }) request: GetInformationOfUser,
    @Res() response: Response
  ) {
    const result = await this.userService.getDeliveryInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteDeliveryInfo/")
  async deleteDeliveryInfo(
    @Body({ required: true }) request: DeleteDeliveryInfoRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.deleteDeliveryInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addContactInformation/")
  async addContactInformation(
    @Body({ required: true }) request: AddContactInfoRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.addContactInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getContactInfoOfUser/")
  async getContactInfoOfUser(
    @Body({ required: true }) request: GetInformationOfUser,
    @Res() response: Response
  ) {
    const result = await this.userService.getContactInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteContactInfo/")
  async deleteContactInfo(
    @Body({ required: true }) request: DeleteContactInfoRequest,
    @Res() response: Response
  ) {
    const result = await this.userService.deleteContactInfo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage);
console.log(spec);
