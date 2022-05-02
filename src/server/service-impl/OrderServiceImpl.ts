import {Service} from "typedi";
import {Result} from "../../models/Result";
import {getCustomRepository} from "typeorm";
import PlaceOrderRequest from "../requests/order/PlaceOrderRequest";
import {OrderedProduct} from "../../entities/OrderedProduct";
import {OrderInvoice} from "../../entities/OrderInvoice";
import {OrderStatusHistory} from "../../entities/OrderStatusHistory";
import ProductForOrderRequest from "../requests/order/ProductForOrderRequest";
import {OrderService} from "../services/OderService";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import PlaceServiceOrderRequest from "../requests/order/PlaceServiceOrderRequest";
import ServiceForOrderRequest from "../requests/order/ServiceForOrderRequest";
import {OrderedServicePackage} from "../../entities/OrderedServicePackage";
import {OrderStatusHistoryRepository} from "../repositories/OrderStatusHistoryRepository";
import {OrderInvoiceRepository} from "../repositories/OrderInvoiceRepository";
import {Order} from "../../entities/Order";
import {OrderRepository} from "../repositories/OrderRepository";
import {OrderStatusConstants, OrderTypeConstants, PaymentStatusConstants} from "../../constants/GeneralConstants";
import UpdateOrderStatusRequest from "../requests/order/UpdateOrderStatusRequest";


@Service()
export class OrderServiceImpl implements OrderService {


    protected orderRepository = getCustomRepository(OrderRepository);
    protected orderStatusHistoryRepository = getCustomRepository(OrderStatusHistoryRepository);
    protected orderInvoiceRepository = getCustomRepository(OrderInvoiceRepository);

    async placeProductOrder(request: PlaceOrderRequest): Promise<Result> {
        const orderModel = new Order();

        orderModel.contactInfo = request.contactInfoId;
        orderModel.deliveryInfo = request.deliveryInfoId;
        orderModel.user = request.userId;
        orderModel.orderType = OrderTypeConstants.PRODUCT;
        orderModel.orderStatus = OrderStatusConstants.ACCEPTED;
        orderModel.paymentStatus = PaymentStatusConstants.UNPAID;

        let orderedProducts : OrderedProduct[] =[];
        request.products.forEach(productItem => {
            const orderedProduct = new OrderedProduct();
            orderedProduct.vendorProduct = productItem.productId
            orderedProduct.product = productItem.productId
            orderedProduct.productImage = productItem.productImage
            orderedProduct.productName = productItem.productName
            orderedProduct.productQuantity = productItem.quantity
            orderedProduct.unitPrice = productItem.productPrice
            orderedProducts.push(orderedProduct)
        })
        orderModel.orderedProducts = orderedProducts;
        const order = await this.orderRepository.save(orderModel);

        const orderInvoice = new OrderInvoice();
        const productAmount = this.calculateProductPrice(request.products);
        orderInvoice.basicAmount = productAmount;
        orderInvoice.deliveryCharge = request.deliveryCharge;
        orderInvoice.totalPayable = productAmount+ orderInvoice.deliveryCharge;
        orderInvoice.additionalCharge = 0;
        orderInvoice.paidAmount = 0;
        orderInvoice.order = order;
        await this.orderInvoiceRepository.save(orderInvoice);


        let orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.note="Order Placed By Customer";
        orderStatusHistory.updatedByName = "system"
        orderStatusHistory.updatedById = request.userId
        orderStatusHistory.order = order;
        await this.orderStatusHistoryRepository.save(orderStatusHistory);

        orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.note="Order Accepted via System";
        orderStatusHistory.updatedByName = "system"
        orderStatusHistory.updatedById = request.userId
        orderStatusHistory.order = order;

        await this.orderStatusHistoryRepository.save(orderStatusHistory);

        return Result.succesful(order);

    }



    async placeServiceOrder(request: PlaceServiceOrderRequest): Promise<Result> {
        const orderModel = new Order();

        orderModel.contactInfo = request.contactInfoId;
        orderModel.deliveryInfo = request.deliveryInfoId;
        orderModel.user = request.userId;
        orderModel.orderType = OrderTypeConstants.SERVICE;
        orderModel.orderStatus = OrderStatusConstants.ACCEPTED;
        orderModel.paymentStatus = PaymentStatusConstants.UNPAID;


        let orderedPackages : OrderedServicePackage[] =[];

        request.packages.forEach(packageItem => {
            const orderedServicePackages = new OrderedServicePackage();
            orderedServicePackages.servicePackage = packageItem.servicePackageId;
            orderedServicePackages.packageName = packageItem.packageName
            orderedServicePackages.quantity = packageItem.quantity
            orderedServicePackages.unitPrice = packageItem.packagePrice;
            orderedPackages.push(orderedServicePackages);
        })
        orderModel.orderedServicePackages = orderedPackages;
        const order = await this.orderRepository.save(orderModel);


        const orderInvoice = new OrderInvoice();
        const serviceAmount = this.calculateServicePrice(request.packages);
        orderInvoice.basicAmount = serviceAmount;
        orderInvoice.deliveryCharge = 0;
        orderInvoice.totalPayable = serviceAmount;
        orderInvoice.additionalCharge = 0;
        orderInvoice.paidAmount = 0;
        orderInvoice.order = order;
        await this.orderInvoiceRepository.save(orderInvoice);


        let orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.note="Order Placed By Customer";
        orderStatusHistory.updatedByName = "system"
        orderStatusHistory.updatedById = request.userId
        orderStatusHistory.order = order;
        await this.orderStatusHistoryRepository.save(orderStatusHistory);

        orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.note="Order Accepted via System";
        orderStatusHistory.updatedByName = "system"
        orderStatusHistory.updatedById = request.userId
        orderStatusHistory.order = order;

        await this.orderStatusHistoryRepository.save(orderStatusHistory);


        return Result.succesful(order);
    }

    private calculateProductPrice = (products : ProductForOrderRequest[]) => {
        let productPrice = 0;
        products.forEach(productItem => {
            productPrice = productPrice + productItem.productPrice;
        })
        return productPrice;
    }

    private calculateServicePrice = (products : ServiceForOrderRequest[]) => {
        let totalPrice = 0;
        products.forEach(packageItem => {
            totalPrice = totalPrice + packageItem.packagePrice;
        })
        return totalPrice;
    }

    async getAllProductOrders(): Promise<Result> {
        const response = await this.orderRepository.find();
        return Result.succesful(response);
    }

    async getAllServiceOrders(): Promise<Result> {
        const response = await this.orderRepository.find();
        return Result.succesful(response);
    }

    async getProductOrdersOfUser(request: GetInformationOfUser): Promise<Result> {
        const response = await this.orderRepository.find({ where : {user : request.userId , orderType : OrderTypeConstants.PRODUCT}});
        return Result.succesful(response);
    }

    async getServiceOrdersOfUser(request: GetInformationOfUser): Promise<Result> {
        const response = await this.orderRepository.find({ where : {userId : request.userId , orderType : OrderTypeConstants.SERVICE}});
        return Result.succesful(response);
    }

    async updateOrderStatus(request: UpdateOrderStatusRequest): Promise<Result> {
        const order : Order = await this.orderRepository.findOneOrFail({where : {id : request.orderId}})

        const orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.note = request.note;
        orderStatusHistory.order = order;
        orderStatusHistory.updatedByName = "System";
        orderStatusHistory.updatedById = request.userId;

        if(request.currentStatus !== order.orderStatus ){
            order.orderStatus = request.currentStatus;
            orderStatusHistory.note = `Order Status Changed from ${order.orderStatus} to ${request.currentStatus}`;
            await this.orderRepository.save(order);
        }

        const response = this.orderStatusHistoryRepository.save(orderStatusHistory);

        return Result.succesful(response);
    }

}