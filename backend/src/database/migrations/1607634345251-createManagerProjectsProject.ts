import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createManagerProjectsProject1607634345251
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'manager_projects_project',
        columns: [
          {
            name: 'manager_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'project_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'manager_projects_project',
      new TableForeignKey({
        name: 'managerId',
        columnNames: ['manager_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'managers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'manager_projects_project',
      new TableForeignKey({
        name: 'projectId',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('manager_projects_project', 'projectId');
    await queryRunner.dropForeignKey('manager_projects_project', 'managerId');
    await queryRunner.dropTable('manager_projects_project');
  }
}
