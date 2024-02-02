import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1685368682573 implements MigrationInterface {
  name = 'migration1685368682573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "refresh_token" (
          "id" SERIAL NOT NULL,
          "userGuid" uuid NOT NULL,
          "refreshToken" character varying NOT NULL,
          CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
        )`);
    
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "isVerified" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "isVerified" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL');
    await queryRunner.query('DROP TABLE "refresh_token"');
  }
}
