import {EntityRepository, Repository} from "typeorm";
import { Result } from "../../models/Result";
import {Product} from "../../entities/Product";
import {VendorProduct} from "../../entities/VendorProduct";
import GetProductsOfVendorRequest from "../requests/product/GetProductsOfVendorRequest";


@EntityRepository(VendorProduct)
export class VendorProductRepository extends Repository<VendorProduct>{

    public getProductsOfVendorCategory = async (request: GetProductsOfVendorRequest) => {
        const response = await
            this.createQueryBuilder('vendorProduct')
                .innerJoinAndSelect('vendorProduct.product', 'product')
                .leftJoin('product.categories', 'category')
                .where('category.id = :id', { id: request.categoryId })
                .innerJoinAndSelect('vendorProduct.vendor', 'vendor')
                .andWhere('vendor.id = :vendorId' , {vendorId : request.vendorId})
                .offset(request.pageId * 20)
                .limit(20)
                .getMany();
        return response;
    }

    public getProductsOfVendorCategorySubCategory = async (request: GetProductsOfVendorRequest) => {
        const response = await
            this.createQueryBuilder('vendorProduct')
                .innerJoinAndSelect('vendorProduct.product', 'product')
                .innerJoinAndSelect('vendorProduct.vendor', 'vendor')
                .leftJoin('product.categories', 'category')
                //.leftJoin('product.subCategories', 'subCategory')
                .where('category.id = :id', { id: request.categoryId })
                //.where('subCategory.id = :id', { id: request.subCategoryId })
                .andWhere('vendor.id = :vendorId' , {vendorId : request.vendorId})
                .offset(request.pageId * 20)
                .limit(20)
                .getMany();
        return response;
    }
}
