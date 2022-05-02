import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne
} from 'typeorm';

import {BaseEntity} from "./BaseEntity";
import {OrderedProduct} from "./OrderedProduct";
import {DeliveryInfo} from "./DeliveryInfo";
import {OrderInvoice} from "./OrderInvoice";
import {OrderStatusHistory} from "./OrderStatusHistory";
import {ContactInfo} from "./ContactInfo";
import {OrderedServicePackage} from "./OrderedServicePackage";
import {User} from "./User";



@Entity({ name : "ORDER"})
export class Order extends BaseEntity {

    @OneToMany(type => OrderedProduct,
            orderedProduct => orderedProduct.order,{
        eager: true , cascade:true
    })
    orderedProducts:OrderedProduct[]

    @OneToMany(type => OrderedServicePackage,
        orderedPackage => orderedPackage.order,{
            eager: true , cascade:true
        })
    orderedServicePackages:OrderedServicePackage[]

    @ManyToOne(type => User, {cascade:true ,eager : true } )
    user: any;

    @ManyToOne(type => DeliveryInfo, {cascade:true ,eager : true } )
    deliveryInfo: any;

    @ManyToOne(type => ContactInfo, {cascade:true ,eager : true } )
    contactInfo: any;

    @OneToOne(() => OrderInvoice, {cascade :true ,eager : true})
    @JoinColumn()
    public orderInvoice: OrderInvoice;

    @Column()
    orderStatus: string

    @Column()
    paymentStatus: string

    @Column()
    orderType: string

    @OneToMany(
        type => OrderStatusHistory,
        history => history.order,{
            cascade :true , eager: true
        })
    statusHistory:OrderStatusHistory[]

}




