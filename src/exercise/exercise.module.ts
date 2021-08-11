import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { ExerciseRepository } from 'src/exercise/exercise.repository';
import { ExerciseService } from 'src/exercise/exercise.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ExerciseController } from './exercise.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [ExerciseController],
  providers: [ExerciseService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class ExerciseModule {}
