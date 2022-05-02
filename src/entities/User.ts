import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from "./BaseEntity";

@Entity("USER")
export class User extends BaseEntity {

    @Column({ unique :true })
    firebaseId: string;

    @Column()
    name : string  = "";

    @Column({nullable:true})
    address : string  = "";

    @Column()
    phone : string = "";

    @Column()
    email : string = "";

    @Column()
    image : string = "";

}