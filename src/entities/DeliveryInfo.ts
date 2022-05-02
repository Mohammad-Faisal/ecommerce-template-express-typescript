import {
    Entity,
    Column
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";


@Entity({ name : "DELIVERY_INFO"})
export class DeliveryInfo extends BaseEntity{

    @Column({ nullable: true })
    userId: number;

    @Column()
    title: string;

    @Column()
    address: string;

}




