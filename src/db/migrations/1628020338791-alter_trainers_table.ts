import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTrainersTable1628020338791 implements MigrationInterface {
    name = 'alterTrainersTable1628020338791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `trainers` DROP FOREIGN KEY `FK_df0f86b968a8e5d73a9cab39278`");
        await queryRunner.query("ALTER TABLE `trainers` ADD CONSTRAINT `FK_df0f86b968a8e5d73a9cab39278` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `trainers` DROP FOREIGN KEY `FK_df0f86b968a8e5d73a9cab39278`");
        await queryRunner.query("ALTER TABLE `trainers` ADD CONSTRAINT `FK_df0f86b968a8e5d73a9cab39278` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
