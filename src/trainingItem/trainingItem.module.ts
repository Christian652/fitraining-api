import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TrainingItemController } from './trainingItem.controller';
import { TrainingItemRepository } from './trainingItem.repository';
import { TrainingItemService } from './trainingItem.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingItemRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [TrainingItemController],
  providers: [TrainingItemService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class TrainingItemModule {}
