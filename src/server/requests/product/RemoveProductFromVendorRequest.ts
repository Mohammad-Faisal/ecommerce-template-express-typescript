import {IsPositive, IsAlpha, MinLength, IsNumber, IsNotEmpty} from "class-validator";

export default class RemoveProductFromVendorRequest {

    @IsNotEmpty()
    vendorProductId: number;


}