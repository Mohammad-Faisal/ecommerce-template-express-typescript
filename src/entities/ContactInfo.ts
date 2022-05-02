import {
    Entity,
    Column
} from 'typeorm';
import {BaseEntity} from "./BaseEntity";


@Entity({ name : "CONTACT_INFO"})
export class ContactInfo extends BaseEntity{

    @Column({ nullable: true })
    userId: number;

    @Column()
    title: string;

    @Column()
    contact: string;

}




