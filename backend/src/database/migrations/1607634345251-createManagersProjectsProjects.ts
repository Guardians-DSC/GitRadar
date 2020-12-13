import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createManagersProjectsProjects1607634345251
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'managers_projects_projects',
        columns: [
          {
            name: 'managersId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'projectsId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'managers_projects_projects',
      new TableForeignKey({
        name: 'managersId',
        columnNames: ['managersId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'managers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'managers_projects_projects',
      new TableForeignKey({
        name: 'projectsId',
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'managers_projects_projects',
      'projectsId',
    );
    await queryRunner.dropForeignKey(
      'managers_projects_projects',
      'managersId',
    );
    await queryRunner.dropTable('managers_projects_projects');
  }
}
