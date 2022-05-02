import {EntityRepository, Repository} from "typeorm";
import {User} from "../../entities/User";
import {OrderStatusHistory} from "../../entities/OrderStatusHistory";
import {OrderInvoice} from "../../entities/OrderInvoice";

@EntityRepository(OrderInvoice)
export class OrderInvoiceRepository extends Repository<OrderInvoice>{

}
