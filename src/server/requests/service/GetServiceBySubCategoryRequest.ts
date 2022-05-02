import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class GetServiceBySubCategoryRequest {

    @IsNotEmpty({ message: "ServiceEntity ID Can't be Empty" })
    subCategoryId: number;

}