import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTakenAtOnCommit1606565789215
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'commits',
      new TableColumn({
        name: 'taken_at',
        type: 'timestamp',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('commits', 'taken_at');
  }
}
