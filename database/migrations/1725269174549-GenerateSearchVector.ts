import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateSearchVector1725269174549 implements MigrationInterface {
  name = 'GenerateSearchVector1725269174549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredients" ADD "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'let-him-cook',
        'public',
        'ingredients',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name)",
      ],
    );
    await queryRunner.query(
      `ALTER TABLE "dishes" ADD "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'let-him-cook',
        'public',
        'dishes',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name)",
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'let-him-cook', 'public', 'dishes'],
    );
    await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "search_vector"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'let-him-cook',
        'public',
        'ingredients',
      ],
    );
    await queryRunner.query(
      `ALTER TABLE "ingredients" DROP COLUMN "search_vector"`,
    );
  }
}
