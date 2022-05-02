import { EntityRepository, Repository } from "typeorm";
import { ServiceEntity } from "../../entities/ServiceEntity";

@EntityRepository(ServiceEntity)
export class ServiceRepository extends Repository<ServiceEntity> {}
