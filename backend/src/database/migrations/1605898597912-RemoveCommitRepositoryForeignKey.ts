import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RemoveCommitRepositoryForeignKey1605898597912
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('commits', 'commitRepository');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'commits',
      new TableForeignKey({
        name: 'commitRepository',
        columnNames: ['repository_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'repositories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
