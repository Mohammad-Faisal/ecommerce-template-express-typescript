import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class DeleteSubCategoryRequest {

    @IsNotEmpty({ message: "Sub Category ID Can't be Empty" })
    subCategoryId: number;

}