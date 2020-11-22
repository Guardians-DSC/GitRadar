import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateSpotsForeignKey1600911321319
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'spots',
      new TableForeignKey({
        name: 'spotsManager',
        columnNames: ['manager_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'managers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('spots', 'spotsManager');
  }
}
