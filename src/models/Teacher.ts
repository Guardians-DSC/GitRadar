import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('teachers')
class Teacher {
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

  @Column('int2')
  github_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Teacher;
