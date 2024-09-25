import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  create(document: Document): Promise<Document> {
    return this.documentRepository.save(document);
  }

  async delete(id: string): Promise<void> {
    await this.documentRepository.delete(id);
  }

  findOne(id: string) {
    return this.documentRepository.findOne({
      where: { id: id },
      relations: ['project.user'],
    });
  }

  async update(id: string, document: Document) {
    document.updatedAt = new Date();
    await this.documentRepository.update(id, document);
    return this.documentRepository.findOne({ where: { id: id } });
  }
}
