import {IsNotEmpty, IsNumber} from "class-validator";

export default class BaseRequest {


    @IsNumber()
    pageId : number;

    @IsNumber()
    pageSize : number;

}