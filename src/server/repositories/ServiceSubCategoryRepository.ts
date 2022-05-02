import { EntityRepository, Repository } from "typeorm";
import { ServiceSubCategory } from "../../entities/ServiceSubCategory";

@EntityRepository(ServiceSubCategory)
export class ServiceSubCategoryRepository extends Repository<ServiceSubCategory> {}
