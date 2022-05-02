import { JsonController, Body, Get, Post, Res, Req } from "routing-controllers";
import { Request, Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import PlaceOrderRequest from "../requests/order/PlaceOrderRequest";
import { OrderServiceImpl } from "../service-impl/OrderServiceImpl";
import { OrderService } from "../services/OderService";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import PlaceServiceOrderRequest from "../requests/order/PlaceServiceOrderRequest";
import UpdateOrderStatusRequest from "../requests/order/UpdateOrderStatusRequest";
import { STATUS_CODES } from "http";

@JsonController()
export default class HealthCheckController {
  @Get("/checkHealth/")
  async checkHealth(@Res() response: Response) {
    return response.status(200).send("Service is up and running");
  }
}
