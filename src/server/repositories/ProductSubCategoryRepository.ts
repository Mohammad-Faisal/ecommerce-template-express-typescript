import { EntityRepository, Repository } from "typeorm";

import { ProductSubCategory } from "../../entities/ProductSubCategory";

@EntityRepository(ProductSubCategory)
export class ProductSubCategoryRepository extends Repository<ProductSubCategory> {}
