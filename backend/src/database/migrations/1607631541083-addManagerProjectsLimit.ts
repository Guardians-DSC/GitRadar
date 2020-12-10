import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addManagerProjectsLimit1607631541083
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'managers',
      new TableColumn({
        name: 'projects_limit',
        type: 'int2',
        default: 5,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('managers', 'projects_limit');
  }
}
