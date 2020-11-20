import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveSpotDailyReportIdFromCommit1605898834652
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'spot_daily_report_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'repository_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }
}
