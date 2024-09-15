import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './project.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProjects(@Request() request: any) {
    const user = await this.usersService.findOne(request.user.userId);
    if (!user) {
      throw new BadRequestException();
    }
    return this.projectsService.find({
      where: { user: user },
      relations: ['documents'],
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postProject(
    @Body() newProjectDto: CreateProjectDto,
    @Request() request: any,
  ) {
    const newProject = new Project();
    newProject.title = newProjectDto.title;
    newProject.description = newProjectDto.description;
    newProject.status = newProjectDto.status;
    newProject.user = request.user.userId;
    newProject.documents = [];
    return this.projectsService.create(newProject);
  }
}
