import {
    Entity,
    Column,
    ManyToOne,
    ManyToMany, JoinTable, OneToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {BaseEntity} from "./BaseEntity";
import {ServiceCategory} from "./ServiceCategory";
import {ServiceSubCategory} from "./ServiceSubCategory";
import {ServicePackage} from "./ServicePackage";
import CreateServiceRequest from "../server/requests/service/CreateServiceRequest";


@Entity({ name : "SERVICE"})
export class ServiceEntity extends BaseEntity{

    @Column({unique:true})
    firebaseId: string;

    @Column({ type: "varchar", length: 200 , nullable: false })
    name: string;

    @Column({ type: "varchar" , nullable:true })
    description: string;

    @Column({ type: "varchar"  , nullable: true})
    logo: string;

    @ManyToOne(type => ServiceCategory , category => category.services)
    category: any;

    @Column({default:true})
    isActive: boolean;

    @Column({default:0})
    weight: number;

    @Column({default:0})
    startAmount: number;

    @ManyToOne(type => ServiceSubCategory , subCategory => subCategory.services)
    subcategory: any;

    @OneToMany(type => ServicePackage,
        servicePackage => servicePackage.service,{
            eager: true , cascade:true
        })
    packages:ServicePackage[]

    @ManyToMany(type => Vendor , vendor => vendor.services , {
        eager: false,
    })
    @JoinTable({name: "SERVICE_VENDOR_MAP"})
    vendors: Vendor[];


    fillObjectFromRequest(createRequest : CreateServiceRequest) {
        console.log(createRequest);
        this.name = createRequest.name;
        this.description = createRequest.description;
        this.logo = createRequest.logo;
        this.category = createRequest.categoryId;
        this.subcategory = createRequest.subcategoryId;
    }

}




