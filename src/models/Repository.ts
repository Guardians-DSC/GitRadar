import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Student from './Student';

@Entity('repositories')
class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  student_id: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('varchar')
  name: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  html_url: string;

  @Column('int2')
  github_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Repository;
