import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Repository from './Repository';
import Student from './Student';

@Entity('commits')
class Commit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  repository_id: string;

  @ManyToOne(() => Repository)
  @JoinColumn({ name: 'repository_id' })
  repository: Repository;

  @Column('uuid')
  student_id: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('varchar')
  message: string;

  @Column('int2')
  additions: number;

  @Column('int2')
  deletions: number;

  @Column('varchar')
  sha: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Commit;
