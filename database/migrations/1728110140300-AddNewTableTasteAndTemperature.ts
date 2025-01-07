import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewTableTasteAndTemperature1728110140300
  implements MigrationInterface
{
  name = 'AddNewTableTasteAndTemperature1728110140300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dish_tastes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "dish_id" uuid NOT NULL, "taste" character varying NOT NULL, CONSTRAINT "UQ_0997ef4df6d96842e71d56177d9" UNIQUE ("dish_id", "taste"), CONSTRAINT "PK_d9c5d3afd0d4968ce2fae460326" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dish_temperatures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "dish_id" uuid NOT NULL, "temperature" character varying NOT NULL, CONSTRAINT "UQ_c33c9254b3049a851ddb7f85739" UNIQUE ("dish_id", "temperature"), CONSTRAINT "PK_124cad4d86c8b56af725329cd1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish_tastes" ADD CONSTRAINT "FK_c46244e4c137bebf3bd6e2b85f9" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish_temperatures" ADD CONSTRAINT "FK_0b9c58a18d09570e72e2ea5650b" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dish_temperatures" DROP CONSTRAINT "FK_0b9c58a18d09570e72e2ea5650b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish_tastes" DROP CONSTRAINT "FK_c46244e4c137bebf3bd6e2b85f9"`,
    );
    await queryRunner.query(`DROP TABLE "dish_temperatures"`);
    await queryRunner.query(`DROP TABLE "dish_tastes"`);
  }
}
