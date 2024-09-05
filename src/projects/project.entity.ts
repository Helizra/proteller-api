import { Document } from 'src/documents/document.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({default:new Date()})
  createdAt: Date;

  @Column({default:new Date()})
  updatedAt: Date;

  @Column()
  description: string;

  @Column({default:'Draft 1'})
  status : string;

  @OneToMany(()=> Document, document => document.project)
  documents : Document
}
