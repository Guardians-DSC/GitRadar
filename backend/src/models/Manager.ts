import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Project from './Project';

@Entity('managers')
class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  github_login: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  github_token: string;

  @Column('varchar')
  avatar_url: string;

  @Column('varchar')
  github_id: string;

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Manager;
