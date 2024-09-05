import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository : Repository<Project>
    ){}

    findAll():Promise<Project[]>{
        return this.projectRepository.find({
            relations:['documents']
        })
    }

    findOne(id:string):Promise<Project>{
        return this.projectRepository.findOne({where:{id: id}})
    }

    create(project:Project):Promise<Project>{
        return this.projectRepository.save(project)
    }
}