import {IsPositive, IsAlpha, MinLength, IsNotEmpty} from "class-validator";

export default class CreateUserRequest {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firebaseId: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;

}