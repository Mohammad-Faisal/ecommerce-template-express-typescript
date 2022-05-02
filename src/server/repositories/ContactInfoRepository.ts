import { EntityRepository, Repository } from "typeorm";
import { ContactInfo } from "../../entities/ContactInfo";

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo> {}
