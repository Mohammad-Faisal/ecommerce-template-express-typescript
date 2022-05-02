import {IsNotEmpty} from "class-validator";

export default class AddServiceToVendorRequest {

    @IsNotEmpty()
    servicePackageId: number;

    @IsNotEmpty()
    vendorId: number;

}