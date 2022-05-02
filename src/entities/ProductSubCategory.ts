import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinTable, ManyToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {Product} from "./Product";
import {BaseEntity} from "./BaseEntity";
import {ProductCategory} from "./ProductCategory";
import CreateServiceSubCategoryRequest from "../server/requests/sub-category/CreateServiceSubCategoryRequest";
import CreateProductSubCategoryRequest from "../server/requests/sub-category/CreateProductSubCategoryRequest";



@Entity({ name : "PRODUCT_SUB_CATEGORY"})
export class ProductSubCategory extends BaseEntity{

    @Column()
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

    @ManyToMany(type => ProductCategory , category => category.subCategories)
    categories: any[];

    @ManyToMany(type => Vendor , vendor => vendor.productSubCategories , {
        eager: false,
    })
    @JoinTable({name: "PRODUCT_SUBCATEGORY_VENDOR_MAP"})
    vendors: Vendor[];

    @ManyToMany(type => Product , product => product.subCategories , {
        eager: false,
    })
    @JoinTable({name: "SUBCATEGORY_PRODUCT_MAP"})
    products: Product[];

    fillObjectFromRequest(createRequest : CreateProductSubCategoryRequest) {
        this.name = createRequest.name;
        this.logo = createRequest.logo;
        this.description = createRequest.description;
        this.categories = createRequest.categoryIdList.map(item => {return {"id" : item}})
    }

}




