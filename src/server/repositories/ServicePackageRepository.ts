import { EntityRepository, Repository } from "typeorm";
import { ServicePackage } from "../../entities/ServicePackage";

@EntityRepository(ServicePackage)
export class ServicePackageRepository extends Repository<ServicePackage> {}
