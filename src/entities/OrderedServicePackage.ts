import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";
import {ServicePackage} from "./ServicePackage";
import {VendorServicePackage} from "./VendorServicePackage";
import {Order} from "./Order";



@Entity({ name : "ORDERED_SERVICE_PACKAGE"})
export class OrderedServicePackage extends BaseEntity {

    @ManyToOne(type => VendorServicePackage, vendorPackage => vendorPackage.orderedServicePackages ,
        {eager : false })
    vendorServicePackage: any;

    @ManyToOne(type => ServicePackage, servicePackage => servicePackage.orderedServicePackages ,
        {eager : false })
    servicePackage: any;

    @ManyToOne(type => Order, order => order.orderedServicePackages ,
        {eager : false ,  onDelete: "CASCADE"})
    order: Order;

    @Column()
    packageName: string;

    @Column( "int")
    quantity : number;

    @Column( "int")
    unitPrice : number;

}




