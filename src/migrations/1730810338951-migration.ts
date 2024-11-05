import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1730810338951 implements MigrationInterface {
    name = 'migration1730810338951';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "book" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "book" ADD "updated_at" TIMESTAMP WITH TIME ZONE');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "book" DROP COLUMN "updated_at"');
        await queryRunner.query('ALTER TABLE "book" DROP COLUMN "created_at"');
    }

}
