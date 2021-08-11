import {MigrationInterface, QueryRunner} from "typeorm";

export class coisa1627316741276 implements MigrationInterface {
    name = 'coisa1627316741276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `muscle_groups` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trainers` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, UNIQUE INDEX `REL_df0f86b968a8e5d73a9cab3927` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `students` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, UNIQUE INDEX `REL_e0208b4f964e609959aff431bf` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `training_sheets` (`id` int NOT NULL AUTO_INCREMENT, `start_date` date NOT NULL, `end_date` date NOT NULL, `trainerId` int NULL, `studentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trainings` (`id` int NOT NULL AUTO_INCREMENT, `days_in_week` text NOT NULL, `trainingSheetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `training_items` (`id` int NOT NULL AUTO_INCREMENT, `num_sets` int NOT NULL, `num_reps` int NOT NULL, `exerciseId` int NULL, `trainingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `exercises` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trainings_muscle_groups_muscle_groups` (`trainingsId` int NOT NULL, `muscleGroupsId` int NOT NULL, INDEX `IDX_860df9ddd2754c7d3dc63f494d` (`trainingsId`), INDEX `IDX_8f23bc7877af1eaa83f3468d11` (`muscleGroupsId`), PRIMARY KEY (`trainingsId`, `muscleGroupsId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `trainers` ADD CONSTRAINT `FK_df0f86b968a8e5d73a9cab39278` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `students` ADD CONSTRAINT `FK_e0208b4f964e609959aff431bf9` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `training_sheets` ADD CONSTRAINT `FK_4124e03124212abbb0a37fe1d88` FOREIGN KEY (`trainerId`) REFERENCES `trainers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `training_sheets` ADD CONSTRAINT `FK_029eebccf06a9507b79158cc558` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `trainings` ADD CONSTRAINT `FK_677791d50f651ec19e0fc73a446` FOREIGN KEY (`trainingSheetId`) REFERENCES `training_sheets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `training_items` ADD CONSTRAINT `FK_a3e02c902c74591e2ebc5e4e156` FOREIGN KEY (`exerciseId`) REFERENCES `exercises`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `training_items` ADD CONSTRAINT `FK_c4da7ba8b71cc45aa17e3a351f2` FOREIGN KEY (`trainingId`) REFERENCES `trainings`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `trainings_muscle_groups_muscle_groups` ADD CONSTRAINT `FK_860df9ddd2754c7d3dc63f494d4` FOREIGN KEY (`trainingsId`) REFERENCES `trainings`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `trainings_muscle_groups_muscle_groups` ADD CONSTRAINT `FK_8f23bc7877af1eaa83f3468d119` FOREIGN KEY (`muscleGroupsId`) REFERENCES `muscle_groups`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `trainings_muscle_groups_muscle_groups` DROP FOREIGN KEY `FK_8f23bc7877af1eaa83f3468d119`");
        await queryRunner.query("ALTER TABLE `trainings_muscle_groups_muscle_groups` DROP FOREIGN KEY `FK_860df9ddd2754c7d3dc63f494d4`");
        await queryRunner.query("ALTER TABLE `training_items` DROP FOREIGN KEY `FK_c4da7ba8b71cc45aa17e3a351f2`");
        await queryRunner.query("ALTER TABLE `training_items` DROP FOREIGN KEY `FK_a3e02c902c74591e2ebc5e4e156`");
        await queryRunner.query("ALTER TABLE `trainings` DROP FOREIGN KEY `FK_677791d50f651ec19e0fc73a446`");
        await queryRunner.query("ALTER TABLE `training_sheets` DROP FOREIGN KEY `FK_029eebccf06a9507b79158cc558`");
        await queryRunner.query("ALTER TABLE `training_sheets` DROP FOREIGN KEY `FK_4124e03124212abbb0a37fe1d88`");
        await queryRunner.query("ALTER TABLE `students` DROP FOREIGN KEY `FK_e0208b4f964e609959aff431bf9`");
        await queryRunner.query("ALTER TABLE `trainers` DROP FOREIGN KEY `FK_df0f86b968a8e5d73a9cab39278`");
        await queryRunner.query("DROP INDEX `IDX_8f23bc7877af1eaa83f3468d11` ON `trainings_muscle_groups_muscle_groups`");
        await queryRunner.query("DROP INDEX `IDX_860df9ddd2754c7d3dc63f494d` ON `trainings_muscle_groups_muscle_groups`");
        await queryRunner.query("DROP TABLE `trainings_muscle_groups_muscle_groups`");
        await queryRunner.query("DROP TABLE `log`");
        await queryRunner.query("DROP TABLE `exercises`");
        await queryRunner.query("DROP TABLE `training_items`");
        await queryRunner.query("DROP TABLE `trainings`");
        await queryRunner.query("DROP TABLE `training_sheets`");
        await queryRunner.query("DROP INDEX `REL_e0208b4f964e609959aff431bf` ON `students`");
        await queryRunner.query("DROP TABLE `students`");
        await queryRunner.query("DROP INDEX `REL_df0f86b968a8e5d73a9cab3927` ON `trainers`");
        await queryRunner.query("DROP TABLE `trainers`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `muscle_groups`");
    }

}
