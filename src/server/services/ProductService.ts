import { Result } from "../../models/Result";
import GetProductsOfCategoryRequest from "../requests/product/GetProductsOfCategoryRequest";
import GetProductsOfVendorRequest from "../requests/product/GetProductsOfVendorRequest";
import UpdateProductRequest from "../requests/product/UpdateProductRequest";
import CreateProductRequest from "../requests/product/CreateProductRequest";
import GetAllProductsRequest from "../requests/product/GetAllProductsRequest";
import DeleteProductRequest from "../requests/product/DeleteProductRequest";
import AddProductToVendorRequest from "../requests/product/AddProductToVendorRequest";
import RemoveProductFromVendorRequest from "../requests/product/RemoveProductFromVendorRequest";

export interface ProductService {

    createProduct: (request: CreateProductRequest) => Promise<Result>;

    // updateProduct:(request: UpdateProductRequest) => Promise<Result>;
    //
    getAllProducts: (request : GetAllProductsRequest) => Promise<Result>;

    getProductsOfCategory: (request: GetProductsOfCategoryRequest) => Promise<Result>;

    getProductsOfVendor: (request: GetProductsOfVendorRequest) => Promise<Result>;

    addProductToVendor: (request: AddProductToVendorRequest) => Promise<Result>;

    removeProductFromVendor: (request: RemoveProductFromVendorRequest) => Promise<Result>;


    deleteProductById: (request: DeleteProductRequest) => Promise<Result>;

}