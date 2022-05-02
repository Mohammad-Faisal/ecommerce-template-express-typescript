import { ServiceCategory } from "../../entities/ServiceCategory";
import { EntityRepository, Repository } from "typeorm";
import { Result } from "../../models/Result";

@EntityRepository(ServiceCategory)
export class ServiceCategoryRepository extends Repository<ServiceCategory> {}
