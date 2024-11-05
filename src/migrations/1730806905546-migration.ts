import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1730806905546 implements MigrationInterface {
    name = 'migration1730806905546';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."user_book_status_link_status_enum" AS ENUM(\'liked\', \'reading\', \'read\', \'planned\', \'abandoned\')');
        await queryRunner.query('CREATE TABLE "user_book_status_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "book_id" character varying NOT NULL, "user_id" uuid NOT NULL, "status" "public"."user_book_status_link_status_enum" NOT NULL, CONSTRAINT "PK_269c35096cac8be586ec062a063" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user_book_status_link"');
        await queryRunner.query('DROP TYPE "public"."user_book_status_link_status_enum"');
    }

}
