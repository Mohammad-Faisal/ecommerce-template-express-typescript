import {EntityRepository, Repository} from "typeorm";
import { Result } from "../../models/Result";
import { Vendor } from "../../entities/Vendor";

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor>{

    public getVendorsOfProductCategory = async (categoryId) => {
        console.log(categoryId);
        const response =   await
            this.createQueryBuilder('vendor')
                .leftJoin('vendor.productCategories', 'category')
                .where('category.id = :id', { id: categoryId })
                .andWhere('vendor.isActive = :isActive', { isActive: true })
                .getMany()

        ;
        return response;
    }

}
