import { BadRequestException, Body, Controller, Delete, Get, Post, Req } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/createDocument.dto";
import { Document } from "./document.entity";
import { ProjectsService } from "src/projects/projects.service";
import { request } from "http";


@Controller('documents')
export class DocumentController{
    constructor(private documentsService: DocumentsService, private projectService: ProjectsService){}

    @Get()
    getDocuments(){
        return this.documentsService.findAll()
    }

    @Post()
    async postDocument(@Body() newDocumentDto:CreateDocumentDto){
        const project = await this.projectService.findOne(newDocumentDto.projectId)
        if (!project){
            throw new BadRequestException("Le projet n'existe pas")
        }
        const newDocument = new Document()
        newDocument.title = newDocumentDto.title
        newDocument.content = newDocumentDto.content
        newDocument.status = newDocumentDto.status
        newDocument.state = newDocumentDto.state
        newDocument.project = project
        return this.documentsService.create(newDocument)
    }

    @Delete(':id')
    async deleteDocument(@Req() request){
        return this.documentsService.delete(request.params.id)
    }
}