import {
  JsonController,
  Body,
  Get,
  Post,
  Res,
  UploadedFiles,
  UploadedFile,
  UseBefore,
  BodyParam,
  Req,
} from "routing-controllers";
import { Response } from "express";
import { SuccessResponse } from "../../models/SuccessResponse";
import "reflect-metadata";
import { Container } from "typedi";
import { IFileService } from "./IFileService";
import { AwsService } from "./AwsService";
import UploadImageRequest from "./request.ts/UploadImageRequest";
import bodyParser from "body-parser";

@JsonController()
export default class FileController {
  public fileService: IFileService = Container.get(AwsService);

  @UseBefore(bodyParser.urlencoded({ extended: true }))
  @Post("/uploadImage/")
  async uploadImage(
    @UploadedFile("image") file: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @Res() response
  ) {
    console.log(uploadImageRequest);
    console.log(file);
    const result = await this.fileService.uploadImageToAws(
      file,
      uploadImageRequest
    );
    return response.json(new SuccessResponse(result.getValue()));
  }
}
