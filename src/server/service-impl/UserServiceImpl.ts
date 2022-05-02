import { UserService } from "../services/UserService";
import { Request } from "express";
import { Result } from "../../models/Result";
import {Controller, Param, Body, Get, Post, Put, Delete  ,Res, NotFoundError, NotAcceptableError} from "routing-controllers";
import CreateUserRequest from "../requests/user/CreateUserRequest";
import {Service, Container} from "typedi";
import {UserRepository} from "../repositories/UserRepository";
import GetUserWithFirebaseIdRequest from "../requests/user/GetUserWithFirebaseIdRequest";
import {getCustomRepository} from "typeorm";
import {ServiceRepository} from "../repositories/ServiceRepository";
import {User} from "../../entities/User";
import AddContactInfoRequest from "../requests/user/AddContactInfoRequest";
import {ContactInfo} from "../../entities/ContactInfo";
import AddDeliveryInfoRequest from "../requests/user/AddDeliveryInfoRequest";
import {DeliveryInfo} from "../../entities/DeliveryInfo";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import DeleteContactInfoRequest from "../requests/order/DeleteContactInfoRequest";
import DeleteDeliveryInfoRequest from "../requests/order/DeleteDeliveryInfoRequest";
import {ContactInfoRepository} from "../repositories/ContactInfoRepository";
import {DeliveryInfoRepository} from "../repositories/DeliveryInfoRepository";


@Service()
export class UserServiceImpl implements UserService {

    protected userRepository = getCustomRepository(UserRepository);
    protected contactRepository = getCustomRepository(ContactInfoRepository);
    protected deliveryRepository = getCustomRepository(DeliveryInfoRepository);


    async getWithFirebaseId(request: GetUserWithFirebaseIdRequest): Promise<Result> {
        const response = await this.userRepository.find({
                where : {firebaseId : request.firebaseId}
            });
        return Result.succesful(response);
    }

    async createNewUser(request: CreateUserRequest): Promise<Result> {

        const  userModel = new User();
        userModel.firebaseId = request.firebaseId;
        userModel.name = request.name;
        userModel.phone = request.phone;
        userModel.address = request.address;
        const response  = await this.userRepository.save(userModel);

        let  contactModel = new ContactInfo();
        contactModel.userId = response.id;
        contactModel.contact = request.phone;
        contactModel.title = "Primary Contact";
        await this.contactRepository.save(contactModel);

        const deliveryModel = new DeliveryInfo();
        deliveryModel.userId =  response.id;
        deliveryModel.address = request.address;
        deliveryModel.title = "Primary Address";
        await this.deliveryRepository.save(deliveryModel);


        return Result.succesful(response);
    }


    async addContactInfo(request: AddContactInfoRequest): Promise<Result> {
        const model = new ContactInfo();
        model.userId = request.userId;
        model.contact = request.contact;
        model.title = request.title;
        const response = await this.contactRepository.save(model);
        return Result.succesful(response);
    }

    async addDeliveryInfo(request: AddDeliveryInfoRequest): Promise<Result> {
        const model = new DeliveryInfo();
        model.userId = request.userId;
        model.address = request.address;
        model.title = request.title;
        const response = await this.deliveryRepository.save(model);
        return Result.succesful(response);
    }

    async getContactInfo(request: GetInformationOfUser): Promise<Result> {
        const response = await this.contactRepository.find({where : {userId : request.userId}})
        return Result.succesful(response);
    }

    async getDeliveryInfo(request: GetInformationOfUser): Promise<Result> {
        const response = await this.deliveryRepository.find({where : {userId : request.userId}})
        return Result.succesful(response);
    }

    async deleteContactInfo(request: DeleteContactInfoRequest): Promise<Result> {
        const response = await this.contactRepository.delete(request.contactInfoId)
        return Result.succesful(response);
    }

    async deleteDeliveryInfo(request: DeleteDeliveryInfoRequest): Promise<Result> {
        const response = await this.deliveryRepository.delete(request.deliveryInfoId)
        return Result.succesful(response);
    }


}