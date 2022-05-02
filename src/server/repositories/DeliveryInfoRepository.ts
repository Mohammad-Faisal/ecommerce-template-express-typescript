import { EntityRepository, Repository } from "typeorm";
import { DeliveryInfo } from "../../entities/DeliveryInfo";

@EntityRepository(DeliveryInfo)
export class DeliveryInfoRepository extends Repository<DeliveryInfo> {}
