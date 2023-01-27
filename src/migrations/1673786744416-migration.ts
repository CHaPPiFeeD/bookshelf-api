import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1673786744416 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "user" (
        "user_guid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "nickname" character varying(16) NOT NULL, 
        "password" character varying NOT NULL, 
        "is_banned" boolean NOT NULL DEFAULT false, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "booksId" integer, 
        CONSTRAINT "PK_0e75d44991bcd6e6f06125bd136" PRIMARY KEY ("user_guid")
      )`);

    await queryRunner.query(`INSERT INTO users 
      (nickname, password)
      VALUES ('Chapka', '123456')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
