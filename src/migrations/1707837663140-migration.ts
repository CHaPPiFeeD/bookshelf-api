import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1707837663140 implements MigrationInterface {
    name = 'migration1707837663140';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "book_tag_link" ("id" SERIAL NOT NULL, "book_id" uuid NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_6f01b178953682e842c8114af3d" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "title" character varying(128) NOT NULL, "body" character varying NOT NULL, "book_id" integer NOT NULL, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(16) NOT NULL, "email" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "comment" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "body" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "refresh_token" character varying NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "book_genre_link" ("id" SERIAL NOT NULL, "book_id" uuid NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_84b40719fd0d4bd0feca247cafb" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "book_genre_link"');
        await queryRunner.query('DROP TABLE "refresh_token"');
        await queryRunner.query('DROP TABLE "comment"');
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TABLE "chapter"');
        await queryRunner.query('DROP TABLE "genre"');
        await queryRunner.query('DROP TABLE "book"');
        await queryRunner.query('DROP TABLE "tag"');
        await queryRunner.query('DROP TABLE "book_tag_link"');
    }

}
