import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateStudentsForeignKey1600911321319
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'studentTeacher',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teachers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('students', 'studentTeacher');
  }
}
