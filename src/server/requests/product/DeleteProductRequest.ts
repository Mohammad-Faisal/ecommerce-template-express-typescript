import {IsPositive, IsAlpha, MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export default class DeleteProductRequest {

    @IsNotEmpty({ message: "Product ID Can't be Empty" })
    productId: number;

}