import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RemoveCommitSpotForeignKey1605898474371
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('commits', 'commitSpot');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'commits',
      new TableForeignKey({
        name: 'commitSpot',
        columnNames: ['spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
