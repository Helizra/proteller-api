import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsService } from "./documents.service";
import { DocumentController } from "./documents.controller";
import { Document } from "./document.entity";
import { ProjectsModule } from "src/projects/projects.module";

@Module({
    imports:[TypeOrmModule.forFeature([Document]), ProjectsModule],
    providers:[DocumentsService],
    controllers:[DocumentController],
})

export class DocumentsModule{}