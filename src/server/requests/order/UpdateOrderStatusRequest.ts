import { IsNotEmpty, IsString} from "class-validator";

export default class UpdateOrderStatusRequest {

    @IsNotEmpty({ message: "Order Id Can't be Empty" })
    orderId: string;

    @IsString()
    note: string;

    @IsString()
    currentStatus: string;

    userId: number;

}