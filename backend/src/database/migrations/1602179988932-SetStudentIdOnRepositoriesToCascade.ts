import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class SetStudentIdOnRepositoriesToCascade1602179988932
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'repositoryStudent');

    await queryRunner.createForeignKey(
      'repositories',
      new TableForeignKey({
        name: 'repositoryStudent',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'repositoryStudent');

    await queryRunner.createForeignKey(
      'repositories',
      new TableForeignKey({
        name: 'repositoryStudent',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
