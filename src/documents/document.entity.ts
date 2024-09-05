import { Project } from 'src/projects/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column({ default: 'Draft 1' })
  status: string;

  @Column({ default: 'Aucun statut' })
  state: string;

  @Column()
  content: string;

  @ManyToOne(() => Project, (project) => project.documents)
  project: Project;
}
