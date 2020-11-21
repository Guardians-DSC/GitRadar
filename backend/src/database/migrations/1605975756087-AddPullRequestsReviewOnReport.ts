import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPullRequestsReviewOnReport1605975756087
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spot_daily_reports',
      new TableColumn({
        name: 'new_prs_review',
        type: 'int2',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('spot_daily_reports', 'new_prs_review');
  }
}
