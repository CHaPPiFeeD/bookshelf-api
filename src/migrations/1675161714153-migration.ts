/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1675161714153 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Комедія')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Романтика')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Фентезі')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Детектив')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Боєвик')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Містика')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Пригоди')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Жахи')`);
    await queryRunner.query(`INSERT INTO genre (name) VALUES ('Фантастика')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
