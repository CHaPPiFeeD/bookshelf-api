import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1736939489377 implements MigrationInterface {
    name = 'migration1736939489377';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "file_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "name" character varying NOT NULL, "mime_type" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "book" ADD "cover_id" uuid');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "book" DROP COLUMN "cover_id"');
        await queryRunner.query('DROP TABLE "file_entity"');
    }

}
