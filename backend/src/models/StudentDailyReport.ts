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

@Entity('student_daily_reports')
class StudentDailyReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  student_id: string;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('int2')
  new_forks: number;

  @Column('int2')
  new_issues: number;

  @Column('int2')
  new_prs: number;

  @Column('int2')
  new_stars: number;

  @Column('int2')
  new_repositories: number;

  @Column('int2')
  new_interactions: number;

  @Column('int2')
  new_commits: number;

  @Column('int2')
  additions: number;

  @Column('int2')
  deletions: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentDailyReport;
