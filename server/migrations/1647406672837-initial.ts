import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1647406672837 implements MigrationInterface {
    name = 'initial1647406672837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`registration_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`password\` varchar(512) NOT NULL, \`salt\` varchar(100) NOT NULL, \`birthday\` date NOT NULL, \`sex\` enum ('MALE', 'FEMALE') NOT NULL, \`city\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id_1\` varchar(255) NOT NULL, \`user_id_2\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`friend_link\` ADD CONSTRAINT \`FK_787d7126a46717c5181f8b7a4f0\` FOREIGN KEY (\`user_id_1\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_link\` ADD CONSTRAINT \`FK_9a73ea1443bce4a6f97bf4e6bf3\` FOREIGN KEY (\`user_id_2\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friend_link\` DROP FOREIGN KEY \`FK_9a73ea1443bce4a6f97bf4e6bf3\``);
        await queryRunner.query(`ALTER TABLE \`friend_link\` DROP FOREIGN KEY \`FK_787d7126a46717c5181f8b7a4f0\``);
        await queryRunner.query(`DROP TABLE \`friend_link\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
