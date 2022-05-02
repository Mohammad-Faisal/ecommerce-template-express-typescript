import {IsPositive, IsAlpha, MinLength, IsNumber} from "class-validator";

export default class GetProductsOfCategoryRequest {

    @IsNumber()
    categoryId: number;

}