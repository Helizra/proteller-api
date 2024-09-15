import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
        return this.documentsService.create(newDocument);
      }
    }
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}
