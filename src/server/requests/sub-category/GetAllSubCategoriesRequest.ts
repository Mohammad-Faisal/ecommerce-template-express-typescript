import {IsPositive, IsAlpha, MinLength, IsString} from "class-validator";

export default class GetAllSubCategoriesRequest {

    @IsString()
    subCategoryFor: string;   // PRODUCT  or SERVICE
}