import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateSpotDailyReportsForeignKey1600914672921
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'spot_daily_reports',
      new TableForeignKey({
        name: 'dailySpot',
        columnNames: ['spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('spot_daily_reports', 'dailySpot');
  }
}
