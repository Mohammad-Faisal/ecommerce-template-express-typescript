import { JsonController, Body, Post, Res } from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import { ProductServiceImpl } from "../service-impl/ProductServiceImpl";
import CreateProductRequest from "../requests/product/CreateProductRequest";
import GetProductsOfCategoryRequest from "../requests/product/GetProductsOfCategoryRequest";
import GetProductsOfVendorRequest from "../requests/product/GetProductsOfVendorRequest";
import GetAllProductsRequest from "../requests/product/GetAllProductsRequest";
import DeleteProductRequest from "../requests/product/DeleteProductRequest";
import AddProductToVendorRequest from "../requests/product/AddProductToVendorRequest";
import { ProductService } from "../services/ProductService";
import RemoveProductFromVendorRequest from "../requests/product/RemoveProductFromVendorRequest";

@JsonController("/product")
export default class ProductController {
  public productService: ProductService = Container.get(ProductServiceImpl);

  @Post("/createNew/")
  async createNew(
    @Body({ required: true }) request: CreateProductRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.createProduct(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAll/")
  async getAll(
    @Body({ required: false }) request: GetAllProductsRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.getAllProducts(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getByCategory/")
  async getByCategory(
    @Body({ required: true }) request: GetProductsOfCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.getProductsOfCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getByVendor/")
  async getProductsOfVendor(
    @Body({ required: true }) request: GetProductsOfVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.getProductsOfVendor(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/addToVendor/")
  async addToVendor(
    @Body({ required: true }) request: AddProductToVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.addProductToVendor(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/removeFromVendor/")
  async removeFromVendor(
    @Body({ required: true }) request: RemoveProductFromVendorRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.removeProductFromVendor(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteById/")
  async deleteById(
    @Body({ required: true }) request: DeleteProductRequest,
    @Res() response: Response
  ) {
    const result = await this.productService.deleteProductById(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
