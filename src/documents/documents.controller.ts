import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { Document } from './document.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateDocumentDto } from './dto/updateDocument.dto';

@Controller('documents')
export class DocumentController {
  constructor(
    private documentsService: DocumentsService,
    private projectService: ProjectsService,
  ) {}

  @Get()
  getDocuments() {
    return this.documentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async postDocument(
    @Body() newDocumentDto: CreateDocumentDto,
    @Request() request: any,
  ) {
    const project = await this.projectService.findOne(newDocumentDto.projectId);
    if (!project) {
      throw new BadRequestException("Le projet n'existe pas");
    } else {
      if (request.user.userId !== project.user.id) {
        throw new UnauthorizedException('Ce projet ne vous appartient pas');
      } else {
        const newDocument = new Document();
        newDocument.title = newDocumentDto.title;
        newDocument.content = newDocumentDto.content;
        newDocument.status = newDocumentDto.status;
        newDocument.state = newDocumentDto.state;
        newDocument.project = project;
        project.updatedAt = new Date();
        await this.projectService.update(project.id, project);
        return this.documentsService.create(newDocument);
      }
    }
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateDocument(
    @Body() newUpdateDocumentDto: UpdateDocumentDto,
    @Param('id') id: string,
    @Request() request: any,
  ) {
    const updatedDocument = await this.documentsService.findOne(id);
    const project = await this.projectService.findOne(
      updatedDocument.project.id,
    );

    if (!updatedDocument) {
      throw new NotFoundException("Ce document n'existe pas");
    } else {
      if (request.user.userId !== updatedDocument.project.user.id) {
        throw new UnauthorizedException('Ce document ne vous appartient pas');
      } else {
        updatedDocument.title = newUpdateDocumentDto.title;
        updatedDocument.content = newUpdateDocumentDto.content;
        updatedDocument.status = newUpdateDocumentDto.status;
        updatedDocument.state = newUpdateDocumentDto.state;
        project.updatedAt = new Date();
        await this.projectService.update(project.id, project);
        return this.documentsService.update(id, updatedDocument);
      }
    }
  }
}
