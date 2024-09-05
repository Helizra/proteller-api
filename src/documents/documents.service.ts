import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./document.entity";


@Injectable()
export class DocumentsService{
    constructor(
        @InjectRepository(Document)
        private documentRepository : Repository<Document>
    ){}

    findAll():Promise<Document[]>{
        return this.documentRepository.find()
    }

    create(document:Document):Promise<Document>{
        return this.documentRepository.save(document)
    }

    async delete (id:string):Promise<void>{
        await this.documentRepository.delete(id)
    }

}