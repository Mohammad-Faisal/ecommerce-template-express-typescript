import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";
import {VendorProduct} from "./VendorProduct";
import {Product} from "./Product";
import {Order} from "./Order";



@Entity({ name : "ORDERED_PRODUCT"})
export class OrderedProduct extends BaseEntity {

    @ManyToOne(type => Product, product => product.orderedProducts ,
        {eager : false })
    product: any;


    @ManyToOne(type => VendorProduct, vendorProduct => vendorProduct.orderedProducts ,
        {eager : false })
    vendorProduct: any;

    @ManyToOne(type => Order, order => order.orderedProducts ,
        {eager : false ,  onDelete: "CASCADE"})
    order: Order;

    @Column()
    productName: string;

    @Column()
    productImage:string;

    @Column( "int")
    productQuantity : number;

    @Column( "int")
    unitPrice : number;

}




