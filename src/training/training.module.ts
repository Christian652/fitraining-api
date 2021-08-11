import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingRepository, UserRepository, ]),
    AuthModule
  ], 
  controllers: [TrainingController],
  providers: [TrainingService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class TrainingModule {}
