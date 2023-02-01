/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1675154529120 implements MigrationInterface {
  name = 'migration1675154529120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "chapter" (
        "id" SERIAL NOT NULL,
        "title" character varying(128) NOT NULL,
        "body" character varying NOT NULL,
        "bookId" integer,
        CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`CREATE TABLE "genre" (
        "id" SERIAL NOT NULL,
        "name" character varying(32) NOT NULL,
        CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`CREATE TABLE "tag" (
        "id" SERIAL NOT NULL,
        "name" character varying(32) NOT NULL,
        CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`CREATE TABLE "comment" (
        "id" SERIAL NOT NULL,
        "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "body" character varying NOT NULL,
        "authorUserGuid" uuid,
        CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`CREATE TABLE "user" (
        "userGuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "nickname" character varying(16) NOT NULL,
        "password" character varying NOT NULL,
        "isBanned" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_c7d16b6dd290ae6d9b5c6eeadc8" PRIMARY KEY ("userGuid")
      )`);

    await queryRunner.query(`CREATE TABLE "book" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "authorUserGuid" uuid,
        CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`ALTER TABLE "chapter"
        ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" 
        FOREIGN KEY ("bookId") REFERENCES "book"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "comment"
        ADD CONSTRAINT "FK_4a2db7d11f97a6171c202727c2a"
        FOREIGN KEY ("authorUserGuid") REFERENCES "user"("userGuid")
        ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "book"
        ADD CONSTRAINT "FK_e207bbed3c566a5ea3f02fb9224"
        FOREIGN KEY ("authorUserGuid") REFERENCES "user"("userGuid")
        ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "book" DROP CONSTRAINT "FK_e207bbed3c566a5ea3f02fb9224"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_4a2db7d11f97a6171c202727c2a"');
    await queryRunner.query('ALTER TABLE "chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"');
    await queryRunner.query('DROP TABLE "book"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "comment"');
    await queryRunner.query('DROP TABLE "tag"');
    await queryRunner.query('DROP TABLE "genre"');
    await queryRunner.query('DROP TABLE "chapter"');
  }
}
