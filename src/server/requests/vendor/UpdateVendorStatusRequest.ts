import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber, IsBoolean} from "class-validator";

export default class UpdateVendorStatusRequest {

    @IsNotEmpty({ message: "Vendor ID Can't be Empty" })
    vendorId: number;

    @IsBoolean({message:"Active Status is not Given"} )
    isActive : boolean;

}