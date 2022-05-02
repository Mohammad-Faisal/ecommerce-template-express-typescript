import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";

export default class UpdateServiceRequest {

    @IsNotEmpty({message: "ServiceEntity not Found"})
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