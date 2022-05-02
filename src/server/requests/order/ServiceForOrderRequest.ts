import { IsNotEmpty , IsString, IsInt} from "class-validator";

export default class ServiceForOrderRequest {

    @IsNotEmpty()
    servicePackageId: number;

    @IsString()
    serviceName: string;

    @IsString()
    packageName: string;

    @IsString()
    serviceImage: string;

    @IsInt()
    quantity: number;

    @IsInt()
    packagePrice: number;

}