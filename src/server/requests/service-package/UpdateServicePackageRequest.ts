import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";

export default class UpdateServicePackageRequest {

    @IsNotEmpty({message: "ServiceEntity Package not Found"})
    id: number;

    @IsNotEmpty({ message: "Vendor Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    categoryId: string;

    @IsNumber()
    subcategoryId: string;

}