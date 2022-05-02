import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsBoolean} from "class-validator";

export default class UpdateSubCategoryRequest {

    @IsNotEmpty({ message: "ProductCategory id Can't be Empty" })
    id: number;

    @IsNotEmpty({ message: "ProductCategory Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsString()
    logo: string;

    @IsBoolean()
    isActive: boolean;

}