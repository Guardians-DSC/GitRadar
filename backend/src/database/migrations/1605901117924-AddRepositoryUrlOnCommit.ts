import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRepositoryUrlOnCommit1605901117924
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'repository_url',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'repository_url');
  }
}
