import { Result } from "../../models/Result";
import PlaceOrderRequest from "../requests/order/PlaceOrderRequest";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import PlaceServiceOrderRequest from "../requests/order/PlaceServiceOrderRequest";
import UpdateOrderStatusRequest from "../requests/order/UpdateOrderStatusRequest";

export interface OrderService {

    placeProductOrder: ( request: PlaceOrderRequest ) => Promise<Result>;
    placeServiceOrder: ( request: PlaceServiceOrderRequest ) => Promise<Result>;

    getAllProductOrders: () => Promise<Result>;
    getAllServiceOrders: () => Promise<Result>;

    getProductOrdersOfUser: (request:  GetInformationOfUser ) => Promise<Result>;
    getServiceOrdersOfUser: (request:  GetInformationOfUser ) => Promise<Result>;

    updateOrderStatus: (request:  UpdateOrderStatusRequest ) => Promise<Result>;

}