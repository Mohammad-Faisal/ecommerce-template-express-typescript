import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsInt, IsNumber} from "class-validator";
import ProductForOrderRequest from "./ProductForOrderRequest";

export default class DeleteContactInfoRequest {

    @IsNotEmpty()
    contactInfoId: number;

}