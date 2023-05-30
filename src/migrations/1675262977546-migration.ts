import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1675262977546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public.user RENAME COLUMN nickname to name');

    await queryRunner.query(`ALTER TABLE public.user
      ADD email character varying NOT NULL UNIQUE;`);

    await queryRunner.query(`ALTER TABLE public.user
      ADD "isVerified" boolean NOT NULL DEFAULT false;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public.user RENAME COLUMN name to nickname');
    await queryRunner.query('ALTER TABLE public.user DROP COLUMN email');
    await queryRunner.query('ALTER TABLE public.user DROP COLUMN "isVerified"');
  }
}

