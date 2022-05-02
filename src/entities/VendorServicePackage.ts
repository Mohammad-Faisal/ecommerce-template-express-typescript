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
import {ServicePackage} from "./ServicePackage";
import {OrderedProduct} from "./OrderedProduct";
import {OrderedServicePackage} from "./OrderedServicePackage";



@Entity({ name : "VENDOR_SERVICE_PACKAGE"})
export class VendorServicePackage extends BaseEntity{


    @Column({ type: "varchar", length: 200 , nullable: false })
    name: string;

    @Column({ type: "varchar", length: 400 })
    description: string;

    @Column({ type: "int" ,nullable: true })
    price: number;

    @Column({ type: "int" , default :0 })
    discount: number;

    @Column({ type: "int" })
    availableQuantity: number;

    @Column({ type: "float" , default:0.0 })
    rating: number;

    @Column("simple-array" , {default:[]})
    images: string[];

    @ManyToOne(type => ServicePackage, servicePackage => servicePackage.vendorServicePackages ,
        {eager : true ,  onDelete: "CASCADE"} )
    servicePackage: ServicePackage;

    @OneToMany(type => OrderedServicePackage,
        orderedPackage => orderedPackage.vendorServicePackage,{
            eager: false , cascade:false
        })
    orderedServicePackages:OrderedServicePackage[]


    @ManyToOne(type => Vendor, vendor => vendor.vendorServicePackages ,
        {eager : true ,  onDelete: "CASCADE"} )
    vendor: Vendor;


    @ManyToMany(type => ProductCategory , category => category.products)
    categories: ProductCategory[];


}




