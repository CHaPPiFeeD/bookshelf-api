import { MigrationInterface, QueryRunner } from 'typeorm';


export class migration1730818685456 implements MigrationInterface {
    name = 'migration1730818685456';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_book_status_link" DROP COLUMN "book_id"');
        await queryRunner.query('ALTER TABLE "user_book_status_link" ADD "book_id" uuid NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_book_status_link" DROP COLUMN "book_id"');
        await queryRunner.query('ALTER TABLE "user_book_status_link" ADD "book_id" character varying NOT NULL');
    }

}
