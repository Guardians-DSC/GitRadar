import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('commits')
class Commit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  spot_id: string;

  @Column('varchar')
  message: string;

  @Column('int2')
  additions: number;

  @Column('varchar')
  commit_url: string;

  @Column('varchar')
  repository_name: string;

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
