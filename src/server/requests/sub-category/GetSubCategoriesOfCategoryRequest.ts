import {IsPositive, IsAlpha, MinLength, IsString, IsNotEmpty} from "class-validator";

export default class GetSubCategoriesOfCategoryRequest {

    @IsNotEmpty()
    categoryId: number;   // PRODUCT  or SERVICE
}