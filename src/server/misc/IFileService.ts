import { Result } from "../../models/Result";
import UploadImageRequest from "./request.ts/UploadImageRequest";

export interface IFileService {
  uploadImageToAws: (file: any, request: UploadImageRequest) => Promise<Result>;
}
