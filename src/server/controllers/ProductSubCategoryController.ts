import { JsonController, Body, Get, Post, Res } from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import { ProductSubCategoryService } from "../services/ProductSubCategoryService";
import { ProductSubCategoryServiceImpl } from "../service-impl/ProductSubCategoryServiceImpl";
import UpdateSubCategoryRequest from "../requests/sub-category/UpdateSubCategoryRequest";
import GetAllSubCategoriesRequest from "../requests/sub-category/GetAllSubCategoriesRequest";
import DeleteSubCategoryRequest from "../requests/sub-category/DeleteSubCategoryRequest";
import GetSubCategoriesOfCategoryRequest from "../requests/sub-category/GetSubCategoriesOfCategoryRequest";
import CreateProductSubCategoryRequest from "../requests/sub-category/CreateProductSubCategoryRequest";

@JsonController("/product")
export default class ProductSubCategoryController {
  public productSubCategoryService: ProductSubCategoryService = Container.get(
    ProductSubCategoryServiceImpl
  );

  @Post("/createNewSubCategory/")
  async createProductSubCategory(
    @Body({ required: true }) request: CreateProductSubCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.productSubCategoryService.createNewSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/updateSubCategory/")
  async updateProductSubCategory(
    @Body({ required: true }) request: UpdateSubCategoryRequest,
    @Res() response: Response
  ) {
    const result = await this.productSubCategoryService.updateSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getAllSubCategory/")
  async getAllProductSubCategory(
    @Body({ required: false }) request: GetAllSubCategoriesRequest,
    @Res() response: Response
  ) {
    let result: any =
      await this.productSubCategoryService.getAllSubCategories();
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/deleteSubCategory/")
  async deleteProductSubCategory(
    @Body({ required: true }) request: DeleteSubCategoryRequest,
    @Res() response: Response
  ) {
    let result: any = await this.productSubCategoryService.deleteSubCategory(
      request
    );
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/getSubCategoriesOfCategory/")
  async getProductSubCategoriesOfCategory(
    @Body({ required: true }) request: GetSubCategoriesOfCategoryRequest,
    @Res() response: Response
  ) {
    let result: any =
      await this.productSubCategoryService.getSubCategoriesOfCategory(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}
