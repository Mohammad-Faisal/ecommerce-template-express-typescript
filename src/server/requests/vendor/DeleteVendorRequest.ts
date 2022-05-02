import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class DeleteVendorRequest {

    @IsNotEmpty({ message: "Vendor ID Can't be Empty" })
    vendorId!: number;


}