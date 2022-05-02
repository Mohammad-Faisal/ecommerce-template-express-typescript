import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { OrderStatusHistory } from "../../entities/OrderStatusHistory";

@EntityRepository(OrderStatusHistory)
export class OrderStatusHistoryRepository extends Repository<OrderStatusHistory> {}
