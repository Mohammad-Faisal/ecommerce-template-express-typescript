import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString} from "class-validator";

export default class CreateCategoryRequest {

    @IsNotEmpty({ message: "ProductCategory Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsString()
    logo: string;


}