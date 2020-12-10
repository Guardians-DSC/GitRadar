import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createProjectSpotsSpot1607633780038
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_spots_spot',
        columns: [
          {
            name: 'project_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'spot_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'project_spots_spot',
      new TableForeignKey({
        name: 'projectId',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'project_spots_spot',
      new TableForeignKey({
        name: 'spotId',
        columnNames: ['spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('project_spots_spot', 'spotId');
    await queryRunner.dropForeignKey('project_spots_spot', 'spotId');
  }
}
