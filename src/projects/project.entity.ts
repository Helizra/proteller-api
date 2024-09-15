import { Document } from 'src/documents/document.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  description: string;

  @Column({ default: 'Draft 0' })
  status: string;

  @OneToMany(() => Document, (document) => document.project)
  documents: Document[];

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
}
