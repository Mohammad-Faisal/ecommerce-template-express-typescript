import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import PlaceOrderRequest from "../requests/order/PlaceOrderRequest";
import { OrderServiceImpl } from "../service-impl/OrderServiceImpl";
import { OrderService } from "../services/OderService";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import PlaceServiceOrderRequest from "../requests/order/PlaceServiceOrderRequest";
import UpdateOrderStatusRequest from "../requests/order/UpdateOrderStatusRequest";

@JsonController()
export default class OrderController {
  public orderService: OrderService = Container.get(OrderServiceImpl);

  @Post("/placeProductOrder/")
  async createProduct(
    @Body({ required: true }) placeOrderRequest: PlaceOrderRequest,
    @Res() response: Response
  ) {
    const result = await this.orderService.placeProductOrder(placeOrderRequest);
    return response.json(new SuccessResponse(result.getValue()));
  }
  @Post("/placeServiceOrder/")
  async placeServiceOrder(
    @Body({ required: true })
    placeServiceOrderRequest: PlaceServiceOrderRequest,
    @Res() response: Response
  ) {
    const result = await this.orderService.placeServiceOrder(
      placeServiceOrderRequest
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllProductOrders/")
  async getAllProductOrders(@Res() response: Response) {
    const result = await this.orderService.getAllProductOrders();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllServiceOrders/")
  async getAllServiceOrders(@Res() response: Response) {
    const result = await this.orderService.getAllServiceOrders();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getProductOrdersOfUser/")
  async getProductOrdersOfUser(
    @Body({ required: true }) request: GetInformationOfUser,
    @Res() response: Response
  ) {
    const result = await this.orderService.getProductOrdersOfUser(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getServiceOrdersOfUser/")
  async getServiceOrdersOfUser(
    @Body({ required: true }) request: GetInformationOfUser,
    @Res() response: Response
  ) {
    const result = await this.orderService.getServiceOrdersOfUser(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateStatusOfOrder/")
  async updateOrderStatus(
    @Body({ required: true }) request: UpdateOrderStatusRequest,
    @Res() response: Response
  ) {
    const result = await this.orderService.updateOrderStatus(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
