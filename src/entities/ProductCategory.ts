import {
    Entity,
    Column,
    JoinTable,
    ManyToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {Product} from "./Product";
import {BaseEntity} from "./BaseEntity";
import {ProductSubCategory} from "./ProductSubCategory";
import CreateCategoryRequest from "../server/requests/category/CreateCategoryRequest";



@Entity({ name : "PRODUCT_CATEGORY"})
export class ProductCategory extends BaseEntity{

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


    @ManyToMany(type => ProductSubCategory , productSubCategory => productSubCategory.categories , {
        eager: true,
    })
    @JoinTable({name: "PRODUCT_CATEGORY_SUBCATEGORY_MAP"})
    subCategories: ProductSubCategory[];

    @ManyToMany(type => Vendor , vendor => vendor.productCategories , {
        eager: false,
    })
    @JoinTable({name: "PRODUCT_CATEGORY_VENDOR_MAP"})
    vendors: Vendor[];

    @ManyToMany(type => Product , product => product.categories , {
        eager: false,
    })
    @JoinTable({name: "CATEGORY_PRODUCT_MAP"})
    products: Product[];

    fillObjectFromRequest(createRequest : CreateCategoryRequest) {
        this.name = createRequest.name;
        this.logo = createRequest.logo;
        this.description = createRequest.description;
    }


}




