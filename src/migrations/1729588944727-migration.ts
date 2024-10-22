import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1729588944727 implements MigrationInterface {
  name = 'migration1729588944727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user_book_like_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "book_id" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_2d0cc168498457f2005899b77b5" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "user" ADD "description" character varying(320)');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "is_active" SET DEFAULT false');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "is_active" SET DEFAULT true');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "description"');
    await queryRunner.query('DROP TABLE "user_book_like_link"');
  }
}
