import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateStudentDailyReportsForeignKey1600914672921
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'student_daily_reports',
      new TableForeignKey({
        name: 'dailyStudent',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('student_daily_reports', 'dailyStudent');
  }
}
