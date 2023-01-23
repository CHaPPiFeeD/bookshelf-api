import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1673786744416 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" (
        "user_guid" character varying NOT NULL, 
        "nickname" character varying NOT NULL,
        "password" character varying NOT NULL, 
        "is_banned" boolean NOT NULL DEFAULT false, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_ae8fef845fe336b069f4d227609" PRIMARY KEY ("user_guid")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
