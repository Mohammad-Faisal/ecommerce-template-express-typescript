import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsBoolean} from "class-validator";

export default class UpdateCategoryStatusRequest {

    @IsNotEmpty({ message: "Product Category Id Can't be Empty" })
    categoryId: string;

    @IsBoolean()
    isActive: boolean;


}