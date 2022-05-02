import { IsNotEmpty, IsArray, IsNumber} from "class-validator";
import ServiceForOrderRequest from "./ServiceForOrderRequest";

export default class PlaceServiceOrderRequest {

    @IsNotEmpty()
    userId: number;

    @IsArray()
    packages: ServiceForOrderRequest[]

    @IsNumber()
    deliveryCharge: number;

    @IsNumber()
    @IsNotEmpty({message:"Delivery Info is Required"})
    deliveryInfoId: number;

    @IsNumber()
    @IsNotEmpty({message:"Contact Info is Required"})
    contactInfoId: number;

}