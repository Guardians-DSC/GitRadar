import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveRepositoryIdFromCommit1605898667830
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'repository_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'spot_daily_report_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }
}
