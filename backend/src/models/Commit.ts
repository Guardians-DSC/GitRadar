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
import Student from './Spot';
import StudentDailyReport from './SpotDailyReport';

@Entity('commits')
class Commit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  repository_id: string;

  @ManyToOne(() => Repository, { eager: true })
  @JoinColumn({ name: 'repository_id' })
  repository: Repository;

  @Column('uuid')
  student_id: string;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('uuid')
  student_daily_report_id: string;

  @ManyToOne(() => StudentDailyReport, { eager: true })
  @JoinColumn({ name: 'student_daily_report_id' })
  studentDailyReport: StudentDailyReport;

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
