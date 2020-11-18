import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class createSpotName1603423271597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spots',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('spots', 'name');
  }
}
