import {IsBoolean, IsNotEmpty} from "class-validator";

export default class UpdatePackageStatusRequest {

    @IsNotEmpty({ message: "Service Package ID Can't be Empty" })
    packageId: number;

    @IsBoolean()
    isActive:boolean;

}