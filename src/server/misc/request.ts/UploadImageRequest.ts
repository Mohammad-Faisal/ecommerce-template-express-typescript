import {
  IsPositive,
  IsAlpha,
  MinLength,
  IsNotEmpty,
  IsString,
  IsArray,
  IsMultibyte,
} from "class-validator";

export default class UploadImageRequest {
  //@IsMultibyte()
  image: string;

  //
  @IsString()
  folder: string;

  @IsString()
  subfolder: string;

  @IsString()
  filename: string;
}
