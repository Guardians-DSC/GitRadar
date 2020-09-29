import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateCommitsForeignKeys1600915158030
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.createForeignKey(
      'commits',
      new TableForeignKey({
        name: 'commitStudent',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('commits', 'commitStudent');
    await queryRunner.dropForeignKey('commits', 'commitRepository');
  }
}
