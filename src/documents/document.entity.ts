import { Project } from 'src/projects/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 'Draft 1' })
  status: string;

  @Column({ default: 'Aucun statut' })
  state: string;

  @Column()
  content: string;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}
