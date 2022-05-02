import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";

export default class CreateServiceRequest {

    @IsNotEmpty({ message: "Service Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsString()
    logo: string;

    @IsNumber()
    categoryId: string;

    @IsNumber()
    subcategoryId: string;

}