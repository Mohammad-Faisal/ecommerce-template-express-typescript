import { IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class CreateServicePackageRequest {

    @IsNotEmpty({ message: "Package Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty({ message: "Please add the Package Price" })
    price: number;

    @IsNumber()
    serviceId: string;

}