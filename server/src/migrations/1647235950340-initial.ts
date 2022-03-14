import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1647235950340 implements MigrationInterface {
    name = 'initial1647235950340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`registration_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`password\` varchar(512) NOT NULL, \`salt\` varchar(100) NOT NULL, \`birthday\` date NOT NULL, \`sex\` enum ('MALE', 'FEMALE') NOT NULL, \`city_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_d0466ca4c350253867a0c70892\` (\`city_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id_1\` varchar(255) NOT NULL, \`user_id_2\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d0466ca4c350253867a0c708923\` FOREIGN KEY (\`city_id\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_link\` ADD CONSTRAINT \`FK_787d7126a46717c5181f8b7a4f0\` FOREIGN KEY (\`user_id_1\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_link\` ADD CONSTRAINT \`FK_9a73ea1443bce4a6f97bf4e6bf3\` FOREIGN KEY (\`user_id_2\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friend_link\` DROP FOREIGN KEY \`FK_9a73ea1443bce4a6f97bf4e6bf3\``);
        await queryRunner.query(`ALTER TABLE \`friend_link\` DROP FOREIGN KEY \`FK_787d7126a46717c5181f8b7a4f0\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d0466ca4c350253867a0c708923\``);
        await queryRunner.query(`DROP TABLE \`friend_link\``);
        await queryRunner.query(`DROP INDEX \`REL_d0466ca4c350253867a0c70892\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`city\``);
    }

}
