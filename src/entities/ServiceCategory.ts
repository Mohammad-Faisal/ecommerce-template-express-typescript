import {
    Entity,
    Column,
    JoinTable, ManyToMany, OneToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {BaseEntity} from "./BaseEntity";
import {ServiceSubCategory} from "./ServiceSubCategory";
import {ServiceEntity} from "./ServiceEntity";
import CreateCategoryRequest from "../server/requests/category/CreateCategoryRequest";



@Entity({ name : "SERVICE_CATEGORY"})
export class ServiceCategory extends BaseEntity{


    @Column({unique : true})
    firebaseId: string;

    @Column({ type: "varchar", length: 200 , nullable: false })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar" })
    logo: string;

    @Column()
    weight: number;

    @Column({default:true})
    isActive: boolean;

    @OneToMany(type => ServiceSubCategory,
        serviceSubCategory => serviceSubCategory.category,{
            eager: false , cascade:true
        })
    subCategories:ServiceSubCategory[]

    @ManyToMany(type => Vendor , vendor => vendor.serviceCategories , {
        eager: false,
    })
    @JoinTable({name: "SERVICE_CATEGORY_VENDOR_MAP"})
    vendors: Vendor[];


    @OneToMany(type => ServiceEntity,
        service => service.category,{
            eager: false , cascade:true
        })
    services:ServiceEntity[]


    fillObjectFromRequest(createRequest : CreateCategoryRequest) {
        this.name = createRequest.name;
        this.logo = createRequest.logo;
        this.description = createRequest.description;
    }

}




