import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";

export default class UpdateServicePackageRequest {

    @IsNotEmpty({message: "ServiceEntity Package not Found"})
    serviceId: number;

}