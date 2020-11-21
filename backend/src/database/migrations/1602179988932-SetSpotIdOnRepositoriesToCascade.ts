import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class SetSpotIdOnRepositoriesToCascade1602179988932
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'repositorySpot');

    await queryRunner.createForeignKey(
      'repositories',
      new TableForeignKey({
        name: 'repositorySpot',
        columnNames: ['spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'repositorySpot');

    await queryRunner.createForeignKey(
      'repositories',
      new TableForeignKey({
        name: 'repositorySpot',
        columnNames: ['spot'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
