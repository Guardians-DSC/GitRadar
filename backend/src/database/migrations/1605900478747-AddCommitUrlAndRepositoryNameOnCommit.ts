import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCommitUrlAndRepositoryNameOnCommit1605900478747
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'commit_url',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'repository_name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'repository_name');
    await queryRunner.dropColumn('commits', 'commit_url');
  }
}
