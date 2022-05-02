import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString} from "class-validator";

export default class CreateProductSubCategoryRequest {

    @IsNotEmpty({ message: "Sub Category Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsString()
    logo: string;

    @IsNotEmpty()
    categoryIdList: number[];

}