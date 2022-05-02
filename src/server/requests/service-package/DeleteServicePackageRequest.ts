import { IsNotEmpty} from "class-validator";

export default class DeleteServicePackageRequest {

    @IsNotEmpty({ message: "Service Package ID Can't be Empty" })
    servicePackageId: number;

}