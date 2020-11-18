import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Manager from './Manager';
import Repository from './Repository';

@Entity('spots')
class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  manager_id: string;

  @ManyToOne(() => Manager, { eager: true })
  @JoinColumn({ name: 'manager_id' })
  manager: Manager;

  @Column('varchar')
  github_login: string;

  @Column('varchar')
  avatar_url: string;

  @Column('varchar')
  top_language: string;

  @Column('varchar')
  github_id: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Spot;
