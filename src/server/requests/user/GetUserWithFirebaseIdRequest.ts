import {IsPositive, IsAlpha, MinLength, IsNotEmpty} from "class-validator";

export default class GetUserWithFirebaseIdRequest {


    @IsNotEmpty()
    firebaseId: string;

}