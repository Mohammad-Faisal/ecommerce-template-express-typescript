import {
    Entity,
    Column,
    OneToMany,
    ManyToMany
} from 'typeorm';
import {ProductCategory} from "./ProductCategory";
import {BaseEntity} from "./BaseEntity";
import {ProductSubCategory} from "./ProductSubCategory";
import {VendorProduct} from "./VendorProduct";
import {ServiceCategory} from "./ServiceCategory";
import {ServiceSubCategory} from "./ServiceSubCategory";
import {VendorServicePackage} from "./VendorServicePackage";
import {ServiceEntity} from "./ServiceEntity";
import CreateVendorRequest from "../server/requests/vendor/CreateVendorRequest";
import {DeliveryArea} from "./DeliveryArea";


export enum VendorVerificationStatus {
    VERIFIED = "verified",
    REJECTED = "rejected",
    PENDING = "pending",
    SUSPENDED = "suspended",
}


@Entity({ name : "VENDOR"})
export class Vendor extends BaseEntity{

    @Column({ unique :true })
    firebaseId: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    address: string;

    @Column({nullable:true})
    image: string;

    @Column({nullable: true})
    contact: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    description: string;

    @Column({default:true})
    isActive: boolean;

    @Column({default:false})
    isVerified: boolean;

    @Column({default:""})
    verifiedBy: string;

    @Column({default:""})
    bkashNo: string;

    @Column({default:""})
    nogodNo: string;

    @Column({default:false})
    doesProvideSelfDelivery: boolean;

    @Column({default:60})
    deliveryPrice: number;

    @Column({default:60})
    deliveryTime: string;

    @Column({default:500})
    minimumOrderAmount: number;

    @Column({ type:"float" , default:0.0})
    latitude: number;

    @Column({ type:"float" , default:0.0})
    longitude: number;

    @Column({ default:""})
    nationalId: string;

    @Column({ type: "simple-array" , default:[]})
    aToken: string[];

    @Column({ type: "simple-array" , default:[]})
    deliveryAreas: string[];

    @Column({
        type: "enum",
        enum: VendorVerificationStatus,
        default: VendorVerificationStatus.PENDING
    })
    verificationStatus: VendorVerificationStatus

    @OneToMany(type => VendorProduct, vendorProduct => vendorProduct.vendor,{
        cascade:true ,
        eager: false
    })
    vendorProducts: VendorProduct[];

    @ManyToMany(type => ServiceEntity , service => service.vendors , {
        cascade:true ,
        eager: false
    })
    services: ServiceEntity[];

    @OneToMany(type => VendorServicePackage, vendorServicePackage => vendorServicePackage.vendor,{
        cascade:true ,
        eager: false
    })
    vendorServicePackages: VendorServicePackage[];

    @ManyToMany(type => ProductCategory , category => category.vendors , {
        cascade:true ,
        eager: false
    })
    productCategories: any[];

    @ManyToMany(type => ProductSubCategory , subCategory => subCategory.vendors , {
        cascade:true ,
        eager: false
    })
    productSubCategories: ProductSubCategory[];


    @ManyToMany(type => ServiceCategory , category => category.vendors , {
        cascade:true ,
        eager: false
    })
    serviceCategories: ServiceCategory[];

    @ManyToMany(type => ServiceSubCategory , subCategory => subCategory.vendors , {
        cascade:true ,
        eager: false
    })
    serviceSubCategories: ServiceSubCategory[];


    fillObjectFromRequest(createRequest : CreateVendorRequest) {
        this.name = createRequest.name;
        this.image = createRequest.image;
        this.address = createRequest.address;
        this.contact = createRequest.contact;
    }

}




