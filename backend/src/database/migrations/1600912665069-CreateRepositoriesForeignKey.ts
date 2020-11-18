import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRepositoriesForeignKey1600912665069
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'repositories',
      new TableForeignKey({
        name: 'repositorySpot',
        columnNames: ['spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'repositorySpot');
  }
}
