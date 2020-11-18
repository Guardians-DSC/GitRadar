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
import Spot from './Spot';
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
  spot_id: string;

  @ManyToOne(() => Spot, { eager: true })
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @Column('uuid')
  spot_daily_report_id: string;

  @ManyToOne(() => StudentDailyReport, { eager: true })
  @JoinColumn({ name: 'spot_daily_report_id' })
  spotDailyReport: StudentDailyReport;

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
