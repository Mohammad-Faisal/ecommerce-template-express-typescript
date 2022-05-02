import { IsNotEmpty, IsString} from "class-validator";

export default class CreateVendorRequest {

    @IsNotEmpty({ message: "Vendor Name Can't be Empty" })
    name: string;

    @IsString()
    address: string;

    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty({ message: "Vendor Contact Information Can't be Empty" })
    contact: string;

}