import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { MuscleGroupController } from './muscleGroup.controller';
import { MuscleGroupRepository } from './muscleGroup.repository';
import { MuscleGroupService } from './muscleGroup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MuscleGroupRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [MuscleGroupController],
  providers: [MuscleGroupService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class MuscleGroupModule {}
