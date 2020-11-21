import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ModifyManagersWithGithubInfo1600992782822
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('managers', 'name');
    await queryRunner.dropColumn('managers', 'github_token');

    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'github_token',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('managers', 'avatar_url');
    await queryRunner.dropColumn('managers', 'github_token');
    await queryRunner.dropColumn('managers', 'name');

    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'github_token',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
