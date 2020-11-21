import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTakenAtOnReport1605913545598
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spot_daily_reports',
      new TableColumn({
        name: 'taken_at',
        type: 'timestamp',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('spot_daily_reports', 'taken_at');
  }
}
