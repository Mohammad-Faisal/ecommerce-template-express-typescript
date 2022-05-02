import {IsBoolean, IsNotEmpty} from "class-validator";

export default class UpdateServiceStatusRequest {

    @IsNotEmpty({ message: "Service ID Can't be Empty" })
    serviceId: number;

    @IsBoolean()
    isActive:boolean;

}