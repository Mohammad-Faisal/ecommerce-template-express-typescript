import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class DeleteServiceRequest {

    @IsNotEmpty({ message: "ServiceEntity ID Can't be Empty" })
    serviceId: number;

}