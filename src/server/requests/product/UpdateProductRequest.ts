import {
    IsPositive,
    IsAlpha,
    MinLength,
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsArray,
    IS_ENUM,
    IsEnum
} from "class-validator";
import {VendorVerificationStatus} from "../../../entities/Vendor";
import {ProductCategory} from "../../../entities/ProductCategory";

export default class UpdateProductRequest {

    @IsNotEmpty({ message: "Vendor id Can't be Empty" })
    id: number;

    @IsNotEmpty({ message: "Vendor Name Can't be Empty" })
    name: string;

    @IsString()
    address: string;

    @IsArray()
    categories: ProductCategory[];

    @IsBoolean()
    isActive: boolean;

    @IsEnum(VendorVerificationStatus)
    verificationStatus: VendorVerificationStatus;

}