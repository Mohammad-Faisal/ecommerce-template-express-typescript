import {IsNotEmpty, IsNumber} from "class-validator";
import BaseRequest from "../BaseRequest";

export default class GetProductsOfVendorRequest extends BaseRequest{

    @IsNotEmpty()
    vendorId: number;

    @IsNumber()
    categoryId : number;

    @IsNumber()
    subCategoryId : number;

}