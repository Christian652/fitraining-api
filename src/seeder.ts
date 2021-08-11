import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/orm'
import { UserSeeder } from "./user/user.seeder";
import { UserRepository } from "./user/user.repository";
import { ExerciseSeeder } from "./exercise/exercise-and-muscles.seeder";
import { ExerciseRepository } from "./exercise/exercise.repository";
import { MuscleGroupRepository } from "./muscleGroup/muscleGroup.repository";

seeder({
  imports: [ 
    TypeOrmModule.forRoot(configService.getTypeOrmData()),
    TypeOrmModule.forFeature([UserRepository, ExerciseRepository, MuscleGroupRepository]),
  ],
}).run([UserSeeder, ExerciseSeeder]);