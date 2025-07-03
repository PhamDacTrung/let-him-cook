import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1751469881990 implements MigrationInterface {
    name = 'InitDb1751469881990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."dish_ingredients_unit_enum" AS ENUM('GRAM', 'KILOGRAM', 'LITRE', 'MILLILITRE', 'PIECE', 'TABLESPOON', 'TEASPOON', 'CUP', 'PINCH', 'TIN', 'CLOVE', 'CLOTH', 'BOTTLE', 'CAN', 'LEAF')`);
        await queryRunner.query(`CREATE TABLE "dish_ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "dish_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, "quantity" smallint NOT NULL, "unit" "public"."dish_ingredients_unit_enum" NOT NULL, CONSTRAINT "PK_0c1cc40f8fc05334e8cb958b60d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_tastes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "dish_id" uuid NOT NULL, "taste" character varying NOT NULL, CONSTRAINT "UQ_0997ef4df6d96842e71d56177d9" UNIQUE ("dish_id", "taste"), CONSTRAINT "PK_d9c5d3afd0d4968ce2fae460326" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_temperatures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "dish_id" uuid NOT NULL, "temperature" character varying NOT NULL, CONSTRAINT "UQ_c33c9254b3049a851ddb7f85739" UNIQUE ("dish_id", "temperature"), CONSTRAINT "PK_124cad4d86c8b56af725329cd1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "password" character varying NOT NULL, "avatar" character varying, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["let-him-cook","public","dishes","GENERATED_COLUMN","search_vector","to_tsvector('simple', name)"]);
        await queryRunner.query(`CREATE TABLE "dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "images" character varying array, "description" character varying(10000) NOT NULL, "author_id" uuid NOT NULL, "is_verified" boolean NOT NULL DEFAULT true, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED, CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ingredients_type_enum" AS ENUM('VEGETABLE', 'FRUIT', 'MEAT', 'SEAFOOD', 'CEREAL', 'TUBER', 'LEGUME', 'DAIRY', 'OTHER')`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["let-him-cook","public","ingredients","GENERATED_COLUMN","search_vector","to_tsvector('simple', name)"]);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "type" "public"."ingredients_type_enum" NOT NULL, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED, CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "dish_id" uuid NOT NULL, "rating" smallint NOT NULL, "comment" character varying(1000), CONSTRAINT "UQ_2f9c609d54a980d58ef2d2c4078" UNIQUE ("user_id", "dish_id"), CONSTRAINT "CHK_d28dde6bc9e4285e9d616685ae" CHECK ("rating" >= 1 AND "rating" <= 5), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dish_ingredients" ADD CONSTRAINT "FK_39f8e6cc96a9d1cf6fc18d25b0e" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_ingredients" ADD CONSTRAINT "FK_67a8cf026a0b034af2709ce4215" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_tastes" ADD CONSTRAINT "FK_c46244e4c137bebf3bd6e2b85f9" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_temperatures" ADD CONSTRAINT "FK_0b9c58a18d09570e72e2ea5650b" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD CONSTRAINT "FK_9a96fb980c125b5c98aeda91a9f" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_15267b47cd65eef824df295e64f" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_15267b47cd65eef824df295e64f"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP CONSTRAINT "FK_9a96fb980c125b5c98aeda91a9f"`);
        await queryRunner.query(`ALTER TABLE "dish_temperatures" DROP CONSTRAINT "FK_0b9c58a18d09570e72e2ea5650b"`);
        await queryRunner.query(`ALTER TABLE "dish_tastes" DROP CONSTRAINT "FK_c46244e4c137bebf3bd6e2b85f9"`);
        await queryRunner.query(`ALTER TABLE "dish_ingredients" DROP CONSTRAINT "FK_67a8cf026a0b034af2709ce4215"`);
        await queryRunner.query(`ALTER TABLE "dish_ingredients" DROP CONSTRAINT "FK_39f8e6cc96a9d1cf6fc18d25b0e"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","let-him-cook","public","ingredients"]);
        await queryRunner.query(`DROP TYPE "public"."ingredients_type_enum"`);
        await queryRunner.query(`DROP TABLE "dishes"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","let-him-cook","public","dishes"]);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "dish_temperatures"`);
        await queryRunner.query(`DROP TABLE "dish_tastes"`);
        await queryRunner.query(`DROP TABLE "dish_ingredients"`);
        await queryRunner.query(`DROP TYPE "public"."dish_ingredients_unit_enum"`);
    }

}
