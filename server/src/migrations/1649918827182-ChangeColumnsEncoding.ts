import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnsEncoding1649918827182 implements MigrationInterface {
  name = "ChangeColumnsEncoding1649918827182";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE
            user
            CHANGE last_name last_name
            VARCHAR(100)
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci;`
    );

    await queryRunner.query(
      `ALTER TABLE
            user
            CHANGE first_name first_name
            VARCHAR(100)
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`last_name\` \`last_name\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`first_name\` \`first_name\` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL`
    );
  }
}
