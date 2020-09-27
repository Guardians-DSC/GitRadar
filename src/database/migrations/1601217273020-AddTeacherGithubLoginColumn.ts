import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTeacherGithubLoginColumn1601217273020
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'github_login',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teachers', 'github_login');
  }
}
