import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsInt, IsNumber} from "class-validator";
import ProductForOrderRequest from "../order/ProductForOrderRequest";

export default class AddDeliveryInfoRequest {

    @IsNotEmpty()
    userId: number;

    @IsString()
    title: string;

    @IsString()
    address: string;

}