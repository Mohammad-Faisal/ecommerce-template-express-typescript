import {EntityRepository, Repository} from "typeorm";
import {DeliveryArea} from "../../entities/DeliveryArea";


@EntityRepository(DeliveryArea)
export class DeliveryAreaRepository extends Repository<DeliveryArea>{


}
