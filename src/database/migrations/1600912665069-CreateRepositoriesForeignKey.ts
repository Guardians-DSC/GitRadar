import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRepositoriesForeignKey1600912665069
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('students', 'studentTeacher');
  }
}
