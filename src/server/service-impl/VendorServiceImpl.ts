import {Service} from "typedi";
import {Result} from "../../models/Result";
import {getCustomRepository} from "typeorm";
import {VendorRepository} from "../repositories/VendorRepository";
import {VendorService} from "../services/VendorService";
import {Vendor} from "../../entities/Vendor";
import UpdateVendorRequest from "../requests/vendor/UpdateVendorRequest";
import CreateVendorRequest from "../requests/vendor/CreateVendorRequest";
import {ProductCategoryRepository} from "../repositories/ProductCategoryRepository";
import GetVendorsByProductCategoryRequest from "../requests/vendor/GetVendorsByProductCategoryRequest";
import UpdateVendorStatusRequest from "../requests/vendor/UpdateVendorStatusRequest";


@Service()
export class VendorServiceImpl implements VendorService {

    protected vendorRepository = getCustomRepository(VendorRepository)

    async getAllVendors(): Promise<Result> {
        const response = await this.vendorRepository.find();
        return Result.succesful(response);
    }

    async getVendorsByProductCategory(request : GetVendorsByProductCategoryRequest): Promise<Result> {
        const response = await this.vendorRepository.getVendorsOfProductCategory(request.productCategoryId);
        console.log("found vendors of product category   " , response.length);
        return Result.succesful(response);
    }

    async createNewVendor(request: CreateVendorRequest): Promise<Result> {
        const vendorModel = new Vendor();
        vendorModel.fillObjectFromRequest(request);
        const response = await this.vendorRepository.save(vendorModel)
        return Result.succesful(response);
    }

    async updateVendor(request: UpdateVendorRequest): Promise<Result>{
        const vendorModel = new Vendor();
        const response = await this.vendorRepository.update(request.id , vendorModel);
        return Result.succesful(response);
    }

    async deleteVendorById(vendorId: number): Promise<Result> {
        const response = await this.vendorRepository.delete(vendorId);
        return Result.succesful(response);
    }

    async updateActiveStatusOfVendor(request: UpdateVendorStatusRequest): Promise<Result> {
        let vendor  = await this.vendorRepository.findOne({where : {id : request.vendorId}});
        if(vendor){
            vendor.isActive =  request.isActive;
            vendor = await this.vendorRepository.save(vendor)
        }
        return Result.succesful(vendor);
    }


}