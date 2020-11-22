import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddManagerGithubLoginColumn1601217273020
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'github_login',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('managers', 'github_login');
  }
}
