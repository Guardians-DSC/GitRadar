import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddStudentDailyReportId1602087620953
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'spot_daily_report_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'commits',
      new TableForeignKey({
        name: 'commitReport',
        columnNames: ['spot_daily_report_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spot_daily_reports',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('commits', 'commitReport');
    await queryRunner.dropColumn('commits', 'spot_daily_reports');
  }
}
