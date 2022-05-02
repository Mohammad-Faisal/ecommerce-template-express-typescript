import { Result } from "../../models/Result";
import CreateUserRequest from "../requests/user/CreateUserRequest";
import GetUserWithFirebaseIdRequest from "../requests/user/GetUserWithFirebaseIdRequest";
import AddDeliveryInfoRequest from "../requests/user/AddDeliveryInfoRequest";
import AddContactInfoRequest from "../requests/user/AddContactInfoRequest";
import GetInformationOfUser from "../requests/order/GetInformationOfUser";
import DeleteDeliveryInfoRequest from "../requests/order/DeleteDeliveryInfoRequest";
import DeleteContactInfoRequest from "../requests/order/DeleteContactInfoRequest";

export interface UserService {

    getWithFirebaseId: (request : GetUserWithFirebaseIdRequest) =>Promise<Result>;
    createNewUser: (request : CreateUserRequest) =>Promise<Result>;

    addDeliveryInfo: ( request: AddDeliveryInfoRequest ) => Promise<Result>;
    addContactInfo: ( request: AddContactInfoRequest ) => Promise<Result>;
    getDeliveryInfo: ( request: GetInformationOfUser ) => Promise<Result>;
    getContactInfo: ( request: GetInformationOfUser ) => Promise<Result>;
    deleteDeliveryInfo: ( request: DeleteDeliveryInfoRequest ) => Promise<Result>;
    deleteContactInfo: ( request: DeleteContactInfoRequest ) => Promise<Result>;

} 