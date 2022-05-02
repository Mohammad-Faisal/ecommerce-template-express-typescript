import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany, JoinTable, OneToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {ProductCategory} from "./ProductCategory";
import {BaseEntity} from "./BaseEntity";
import {ProductSubCategory} from "./ProductSubCategory";
import {VendorProduct} from "./VendorProduct";
import CreateProductSubCategoryRequest from "../server/requests/sub-category/CreateProductSubCategoryRequest";
import CreateProductRequest from "../server/requests/product/CreateProductRequest";
import {OrderedServicePackage} from "./OrderedServicePackage";
import {OrderedProduct} from "./OrderedProduct";



@Entity({ name : "PRODUCT"})
export class Product extends BaseEntity{

    @Column({unique:true})
    firebaseId: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type:"float" , nullable: true })
    price: number;

    @Column({ type: "float" , default:0.0 })
    rating: number;

    @Column( {default:""})
    image: string;

    @Column({default:""})
    company: string;

    @Column({default:""})
    code: string;

    @Column()
    productWeight: string;

    @Column({default:"unit"})
    weightUnit: string;

    @Column({default:""})
    genericName: string;

    @Column({default:""})
    dosageForm: string;

    @Column({default:""})
    strength: string;

    @Column({default:""})
    type: string;

    @Column({default:1000})
    limit: number;

    @Column({default:false})
    isWholeSaleProduct: boolean;

    @Column({default:"lot"})
    wholesalePricePerUnit: string;

    @Column({default:0})
    weight: number;

    @Column({default:true})
    isActive: boolean;


    @Column({default:0})
    productPriceTp: number;

    @OneToMany(type => VendorProduct, vendorProduct => vendorProduct.product,{
        cascade:true ,
        eager: false
    })
    vendorProducts: VendorProduct[];

    @OneToMany(type => OrderedProduct, orderedProduct => orderedProduct.product,{
        cascade:false ,
        eager: false
    })
    orderedProducts: OrderedProduct[];

    @ManyToMany(type => ProductCategory , category => category.products)
    categories: any[];

    @ManyToMany(type => ProductSubCategory , subCategory => subCategory.products  )
    subCategories: any[];

    fillObjectFromRequest(createRequest : CreateProductRequest) {
        this.name = createRequest.name;
        this.price = createRequest.price;
        this.image = createRequest.image;
        this.description = createRequest.description;
        this.categories = createRequest.categoryIdList.map(item => {return {"id" : item}})
        this.subCategories = createRequest.subCategoryIdList.map(item => {return {"id" : item}})
    }

}




