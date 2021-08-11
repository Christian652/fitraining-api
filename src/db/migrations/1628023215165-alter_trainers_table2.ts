import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTrainersTable21628023215165 implements MigrationInterface {
    name = 'alterTrainersTable21628023215165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `students` DROP FOREIGN KEY `FK_e0208b4f964e609959aff431bf9`");
        await queryRunner.query("ALTER TABLE `students` ADD CONSTRAINT `FK_e0208b4f964e609959aff431bf9` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `students` DROP FOREIGN KEY `FK_e0208b4f964e609959aff431bf9`");
        await queryRunner.query("ALTER TABLE `students` ADD CONSTRAINT `FK_e0208b4f964e609959aff431bf9` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
