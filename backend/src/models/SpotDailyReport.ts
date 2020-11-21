import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Spot from './Spot';

@Entity('spot_daily_reports')
class SpotDailyReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  spot_id: string;

  @ManyToOne(() => Spot, { eager: true })
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @Column('int2')
  new_issues: number;

  @Column('int2')
  new_prs: number;

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

  @Column('timestamp')
  taken_at: Date;
}

export default SpotDailyReport;
