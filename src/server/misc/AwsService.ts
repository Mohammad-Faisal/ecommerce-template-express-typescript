import { Service } from "typedi";
import { Result } from "../../models/Result";
import { IFileService } from "./IFileService";
import UploadImageRequest from "./request.ts/UploadImageRequest";

@Service()
export class AwsService implements IFileService {
  private aws = require("aws-sdk");

  async uploadImageToAws(
    file: any,
    request: UploadImageRequest
  ): Promise<Result> {
    // let folder = request.folder;
    // let subfolder = request.subfolder;
    // let filename = request.filename;
    //
    //
    // aws.config.update({
    //     accessKeyId: 'AKIAIP6NYMTRYQEBYMWQ',
    //     secretAccessKey: '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',
    //     region: 'us-west-1'
    // })
    //
    // let s3 = new aws.S3();
    // const filePathKey = folder + '/' + subfolder + '/' + filename
    // const image = misc.image;
    //
    //
    // const response = await s3.putObject({
    //     Bucket: 'rokkhi',
    //     Body: image,
    //     Key: filePathKey
    // }).promise()
    //     .then(response => {
    //         console.log(response);
    //         const signedURL = 'https://rokkhi.s3-us-west-1.amazonaws.com/' + filePathKey
    //         console.log(JSON.stringify({url: signedURL}))
    //
    //     })
    //     .catch(err => {
    //         console.log('failed:', err)
    //     })

    //return Result.succesful({url: signedURL});
    return Result.succesful({ url: "this is awesome!!!" });
  }
}
