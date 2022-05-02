import {Service} from "typedi";
import {ProductService} from "../services/ProductService";
import CreateProductRequest from "../requests/product/CreateProductRequest";
import {Result} from "../../models/Result";
import GetAllProductsRequest from "../requests/product/GetAllProductsRequest";
import GetProductsOfCategoryRequest from "../requests/product/GetProductsOfCategoryRequest";
import GetProductsOfVendorRequest from "../requests/product/GetProductsOfVendorRequest";
import {Product} from "../../entities/Product";
import {getCustomRepository} from "typeorm";
import {VendorRepository} from "../repositories/VendorRepository";
import {ProductRepository} from "../repositories/ProductRepository";
import DeleteProductRequest from "../requests/product/DeleteProductRequest";
import AddProductToVendorRequest from "../requests/product/AddProductToVendorRequest";
import {VendorProduct} from "../../entities/VendorProduct";
import CustomError from "../../models/CustomError";
import RemoveProductFromVendorRequest from "../requests/product/RemoveProductFromVendorRequest";
import {VendorProductRepository} from "../repositories/VendorProductRepository";


@Service()
export class ProductServiceImpl implements ProductService {

    protected productRepository = getCustomRepository(ProductRepository);
    protected vendorProductRepository = getCustomRepository(VendorProductRepository);
    protected vendorRepository = getCustomRepository(VendorRepository);


    async createProduct(request: CreateProductRequest): Promise<Result> {
        const model = new Product();
        model.fillObjectFromRequest(request)
        const response = await this.productRepository.save(model);
        return Result.succesful(response);
    }

    async getAllProducts(request: GetAllProductsRequest): Promise<Result> {
        const response = await this.productRepository.find({limit:20});
        return Result.succesful(response);
    }

    getProductsOfCategory(request: GetProductsOfCategoryRequest): Promise<Result> {
        return this.productRepository.getProductsOfCategory(request.categoryId)
    }

    async deleteProductById(request: DeleteProductRequest): Promise<Result> {
        const response = await this.productRepository.delete(request.productId);
        return Result.succesful(response);
    }

    async getProductsOfVendor(request: GetProductsOfVendorRequest): Promise<Result> {
        let response;
        if(request.subCategoryId) response =  await  this.vendorProductRepository.getProductsOfVendorCategorySubCategory(request);
        else response =  await  this.vendorProductRepository.getProductsOfVendorCategory(request);

        const responseList : any = []
        for(const item of response){
            console.log(item);
            item["image"] = item.product.image;
            responseList.push(item)

        }
        console.log(responseList);

        return Result.succesful(responseList);
    }

    async addProductToVendor(request: AddProductToVendorRequest): Promise<Result> {
        const model  = new VendorProduct();
        const vendorProduct = await this.vendorProductRepository.findOne({where : {product : request.productId , vendor : request.vendorId}});
        if(vendorProduct) throw  new CustomError( 403 , 'This product already belongs to this vendor ');

        const vendor = await this.vendorRepository.findOne({where : {id : request.vendorId} , relations: ["productCategories" , "productSubCategories"]});
        const product = await this.productRepository.findOne({where : {id : request.productId} , relations: ["categories" , "subCategories"]});
        if(!vendor) throw  new CustomError( 403 , 'Vendor Not found ');
        if(!product) throw  new CustomError( 403 , 'Product Not found ');


        vendor.productCategories = vendor.productCategories.concat(product.categories);
        vendor.productSubCategories = vendor.productSubCategories.concat(product.subCategories);
        await this.vendorRepository.save( vendor);

        model.vendor = request.vendorId;
        model.product = request.productId;
        model.price = product.price;
        model.name = product.name;
        model.description = product.description;
        const response=  await this.vendorProductRepository.save(model);
        return Result.succesful(response);
    }

    async removeProductFromVendor(request: RemoveProductFromVendorRequest): Promise<Result> {
        const response = await this.vendorProductRepository.delete(request.vendorProductId);
        return Result.succesful(response);
    }

}
