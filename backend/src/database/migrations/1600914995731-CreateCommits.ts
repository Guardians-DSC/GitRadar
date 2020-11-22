import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCommits1600914995731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'commits',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'repository_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'spot_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'message',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'additions',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'deletions',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commits');
  }
}
