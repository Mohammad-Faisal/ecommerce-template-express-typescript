import {
    Entity,
    Column, OneToOne
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";
import {Order} from "./Order";


@Entity({ name : "ORDER_INVOICE"})
export class OrderInvoice extends BaseEntity{

    @OneToOne(() => Order, (order: Order) => order.orderInvoice)
    public order: Order;

    @Column()
    basicAmount: number;

    @Column()
    deliveryCharge: number;

    @Column({default : 0})
    additionalCharge: number;

    @Column()
    totalPayable: number;

    @Column({default :0})
    paidAmount: number;


}




