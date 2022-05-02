import { IsNotEmpty , IsString, IsInt} from "class-validator";

export default class ProductForOrderRequest {

    @IsNotEmpty()
    productId: number;

    @IsString()
    productName: string;

    @IsString()
    productImage: string;

    @IsInt()
    quantity: number;

    @IsInt()
    productPrice: number;

}