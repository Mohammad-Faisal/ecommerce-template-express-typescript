import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinTable, ManyToMany, OneToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {Product} from "./Product";
import {BaseEntity} from "./BaseEntity";
import {ProductCategory} from "./ProductCategory";
import {ServiceCategory} from "./ServiceCategory";
import {OrderedProduct} from "./OrderedProduct";
import {ServiceEntity} from "./ServiceEntity";
import CreateServiceSubCategoryRequest from "../server/requests/sub-category/CreateServiceSubCategoryRequest";



@Entity({ name : "SERVICE_SUB_CATEGORY"})
export class ServiceSubCategory extends BaseEntity{

    @Column({unique : true})
    firebaseId: string;

    @Column({ type: "varchar", length: 200 , nullable: false })
    name: string;

    @Column()
    description: string;

    @Column()
    logo: string;

    @Column()
    weight: number;

    @Column({default:true})
    isActive: boolean;

    @ManyToOne(type => ServiceCategory , category => category.subCategories ,
        {onDelete: "CASCADE"})
    category: any;

    @ManyToMany(type => Vendor , vendor => vendor.serviceSubCategories ,
        {
        eager: false,
    })
    @JoinTable({name: "SERVICE_SUBCATEGORY_VENDOR_MAP"})
    vendors: Vendor[];

    @OneToMany(type => ServiceEntity,
        service => service.subcategory,{
            eager: false , cascade:true
        })
    services:ServiceEntity[]

    fillObjectFromRequest(createRequest : CreateServiceSubCategoryRequest) {
        this.name = createRequest.name;
        this.logo = createRequest.logo;
        this.description = createRequest.description;
        this.category = createRequest.categoryId;
    }

}




