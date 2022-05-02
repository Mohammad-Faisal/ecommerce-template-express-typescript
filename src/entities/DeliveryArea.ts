import {
    Entity,
    Column
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";


@Entity({ name : "DELIVERY_AREA"})
export class DeliveryArea extends BaseEntity{

    @Column({unique:true})
    firebaseId: string;

    @Column()
    banglaName: string;

    @Column()
    englishName: string;

    @Column()
    code: number;

}




