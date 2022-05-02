import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class GetVendorsByProductCategoryRequest {

    @IsNotEmpty({ message: "Product Category ID Can't be Empty" })
    productCategoryId: number;

}