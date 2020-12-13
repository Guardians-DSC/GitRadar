import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createProjectsSpotsSpots1607633780038
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects_spots_spots',
        columns: [
          {
            name: 'projectsId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'spotsId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'projects_spots_spots',
      new TableForeignKey({
        name: 'projectsId',
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'projects_spots_spots',
      new TableForeignKey({
        name: 'spotsId',
        columnNames: ['spotsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spots',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects_spots_spots', 'spotsId');
    await queryRunner.dropForeignKey('projects_spots_spots', 'projectsId');
    await queryRunner.dropTable('projects_spots_spots');
  }
}
