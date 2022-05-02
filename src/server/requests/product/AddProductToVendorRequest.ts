import {IsPositive, IsAlpha, MinLength, IsNumber, IsNotEmpty} from "class-validator";

export default class AddProductToVendorRequest {

    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    vendorId: number;

}