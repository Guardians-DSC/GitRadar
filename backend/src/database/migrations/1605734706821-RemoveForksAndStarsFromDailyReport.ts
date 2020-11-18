import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveForksAndStarsFromDailyReport1605734706821
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('spot_daily_reports', 'new_stars');
    await queryRunner.dropColumn('spot_daily_reports', 'new_forks');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spot_daily_reports',
      new TableColumn({
        name: 'new_forks',
        type: 'int2',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'spot_daily_reports',
      new TableColumn({
        name: 'new_stars',
        type: 'int2',
        isNullable: true,
      }),
    );
  }
}
