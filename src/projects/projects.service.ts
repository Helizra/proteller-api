import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['documents'],
    });
  }

  findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  find(options: FindManyOptions<Project>): Promise<Project[]> {
    return this.projectRepository.find(options);
  }

  create(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  async update(id: string, project: Project) {
    project.updatedAt = new Date();
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOne({ where: { id: id } });
  }
}
