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

@Entity('repositories')
class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  spot_id: string;

  @ManyToOne(() => Spot, { eager: true })
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @Column('varchar')
  name: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  html_url: string;

  @Column('varchar')
  github_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Repository;
