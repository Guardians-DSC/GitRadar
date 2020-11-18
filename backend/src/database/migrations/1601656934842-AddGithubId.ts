import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddGithubId1601656934842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'github_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'spots',
      new TableColumn({
        name: 'github_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'repositories',
      new TableColumn({
        name: 'github_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'sha',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'sha');
    await queryRunner.dropColumn('repositories', 'github_id');
    await queryRunner.dropColumn('spots', 'github_id');
    await queryRunner.dropColumn('managers', 'github_id');
  }
}
