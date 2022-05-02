import {
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from 'typeorm';
import {Vendor} from "./Vendor";
import {BaseEntity} from "./BaseEntity";
import {Product} from "./Product";
import {OrderedProduct} from "./OrderedProduct";



@Entity({ name : "VENDOR_PRODUCT"})
export class VendorProduct extends BaseEntity{

    @Column({unique:true})
    firebaseId: string;


    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @Column({ type: "float" ,nullable: true })
    price: number;

    @Column({ type: "int" , default :0 })
    discount: number;

    @Column({ type: "float" , default:0.0 })
    rating: number;

    @Column({default:true})
    inStock: boolean;

    @Column("simple-array" , {default:[]})
    images: string[];

    @ManyToOne(type => Vendor, vendor => vendor.vendorProducts ,
        {eager : true ,  onDelete: "CASCADE"} )
    vendor: any;

    @ManyToOne(type => Product, product => product.vendorProducts ,
        {eager : true ,  onDelete: "CASCADE"} )
    product: any;

    @OneToMany(type => OrderedProduct,
        orderedProduct => orderedProduct.vendorProduct,{
            eager: false , cascade:false
        })
    orderedProducts:OrderedProduct[]


}




