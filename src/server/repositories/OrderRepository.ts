import {EntityRepository, Repository} from "typeorm";
import {Order} from "../../entities/Order";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>{


}
