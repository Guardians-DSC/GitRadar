import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ModifyTeachersWithGithubInfo1600992782822
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teachers', 'name');
    await queryRunner.dropColumn('teachers', 'github_token');

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'github_token',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teachers', 'avatar_url');
    await queryRunner.dropColumn('teachers', 'github_token');
    await queryRunner.dropColumn('teachers', 'name');

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'github_token',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
