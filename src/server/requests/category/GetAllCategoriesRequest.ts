import {IsPositive, IsAlpha, MinLength, IsString} from "class-validator";

export default class GetAllCategoriesRequest {

    @IsString()
    categoryFor: string;   // PRODUCT  or SERVICE
}