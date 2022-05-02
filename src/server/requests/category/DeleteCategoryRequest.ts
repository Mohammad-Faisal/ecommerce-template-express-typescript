import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class DeleteCategoryRequest {

    @IsNotEmpty({ message: "ProductCategory ID Can't be Empty" })
    categoryId: number;

}