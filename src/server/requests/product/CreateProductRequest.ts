import { IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";

export default class CreateProductRequest {

    @IsNotEmpty({ message: "Product Name Can't be Empty" })
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsArray()
    categoryIdList: number[];

    @IsArray()
    subCategoryIdList: number[];

}