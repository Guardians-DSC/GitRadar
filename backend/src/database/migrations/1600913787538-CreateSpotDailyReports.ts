import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSpotDailyReports1600913787538
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'spot_daily_reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'spot_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'new_forks',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_issues',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_prs',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_stars',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_repositories',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_interactions',
            type: 'int2',
            isNullable: false,
          },
          {
            name: 'new_commits',
            type: 'int2',
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
    await queryRunner.dropTable('spot_daily_reports');
  }
}
