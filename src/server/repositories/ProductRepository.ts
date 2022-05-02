import { EntityRepository, Repository } from "typeorm";
import { Result } from "../../models/Result";
import { Product } from "../../entities/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public getProductsOfCategory = async (categoryId) => {
    const response = await this.createQueryBuilder("product")
      .leftJoin("product.categories", "category")
      .where("category.id = :id", { id: categoryId })
      .getMany();
    return Result.succesful(response);
  };
}
