import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Order} from "./Order";



@Entity({ name : "ORDER_STATUS_HISTORY"})
export class OrderStatusHistory extends BaseEntity{

    @ManyToOne(type => Order, order => order.statusHistory ,
        {eager : false ,  onDelete: "CASCADE"})
    order: any;


    @Column()
    updatedById: number

    @Column()
    updatedByName: string;

    @Column()
    note: string;

}
