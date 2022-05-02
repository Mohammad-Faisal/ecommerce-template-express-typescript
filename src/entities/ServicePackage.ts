import {
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from 'typeorm';

import {BaseEntity} from "./BaseEntity";
import {ServiceEntity} from "./ServiceEntity";
import {VendorServicePackage} from "./VendorServicePackage";
import CreateServicePackageRequest from "../server/requests/service-package/CreateServicePackageRequest";
import {OrderedServicePackage} from "./OrderedServicePackage";



@Entity({ name : "SERVICE_PACKAGE"})
export class ServicePackage extends BaseEntity{

    @Column({unique:true})
    firebaseId: string;


    @Column()
    name: string;

    @Column({ default:"" })
    description: string;

    @Column({ nullable: true })
    price: number;


    @Column({default:1})
    minItem: number;

    @Column({default:1000000})
    maxItem: number;

    @Column({ default: "unit" })
    unitText: string;

    @Column({default:true})
    isActive: boolean;

    @Column({default:0})
    weight: number;


    @Column("simple-array" , {default:[]})
    images: string[];

    @ManyToOne(type => ServiceEntity, service => service.packages ,
        {eager : false ,  onDelete: "CASCADE"} )
    service: any;

    @OneToMany(type => VendorServicePackage, vendorService => vendorService.servicePackage,{
        cascade:false ,
        eager: false
    })
    vendorServicePackages: VendorServicePackage[];

    @OneToMany(type => OrderedServicePackage, orderedPackage => orderedPackage.servicePackage,{
        cascade:false ,
        eager: false
    })
    orderedServicePackages: OrderedServicePackage[];


    fillObjectFromRequest(createRequest : CreateServicePackageRequest) {
        this.name = createRequest.name;
        this.description = createRequest.description;
        this.price = createRequest.price;
        this.service = createRequest.serviceId;
    }


}




