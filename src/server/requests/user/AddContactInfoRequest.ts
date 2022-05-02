import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsInt, IsNumber} from "class-validator";
import ProductForOrderRequest from "../order/ProductForOrderRequest";

export default class AddContactInfoRequest {

    @IsNotEmpty()
    userId: number;

    @IsString()
    title: string;

    @IsString()
    contact: string;

}