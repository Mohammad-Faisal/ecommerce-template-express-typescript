import {
    Entity,
    Column
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";


@Entity({ name : "TRANSACTION"})
export class Transaction extends BaseEntity{

    @Column()
    amount: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    paymentMethod: string;

    @Column()
    note: string;


}




