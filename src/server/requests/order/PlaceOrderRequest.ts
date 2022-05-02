import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsInt, IsNumber} from "class-validator";
import ProductForOrderRequest from "./ProductForOrderRequest";

export default class PlaceOrderRequest {

    @IsNotEmpty()
    userId: number;

    @IsArray()
    products: ProductForOrderRequest[]

    @IsNumber()
    deliveryCharge: number;

    @IsNumber()
    @IsNotEmpty({message:"Delivery Info is Required"})
    deliveryInfoId: number;

    @IsNumber()
    @IsNotEmpty({message:"Contact Info is Required"})
    contactInfoId: number;

}