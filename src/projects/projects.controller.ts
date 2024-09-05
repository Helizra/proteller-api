import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/createProject.dto";
import { Project } from "./project.entity";

@Controller('projects')
export class ProjectsController{
    constructor(private projectsService : ProjectsService){}

    @Get()
    getProjects(){
        return this.projectsService.findAll()
    }

    @Post()
    postProject(@Body() newProjectDto:CreateProjectDto){
        const newProject = new Project()
        newProject.title = newProjectDto.title
        newProject.description = newProjectDto.description
        newProject.status = newProjectDto.status
        return this.projectsService.create(newProject)
    }
}