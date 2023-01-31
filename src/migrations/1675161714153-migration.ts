/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1675161714153 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO users 
      (nickname, password)
      VALUES ('Chapka', '123456')
    `);

    await queryRunner.query('INSERT INTO genres (name) VALUES ("Комедія")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Романтика")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Фентезі")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Детектив")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Боєвик")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Містика")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Пригоди")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Жахи")');
    await queryRunner.query('INSERT INTO genres (name) VALUES ("Фантастика")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
