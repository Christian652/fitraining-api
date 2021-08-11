import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TrainingSheetController } from './trainingSheet.controller';
import { TrainingSheetRepository } from './trainingSheet.repository';
import { TrainingSheetService } from './trainingSheet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingSheetRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [TrainingSheetController],
  providers: [TrainingSheetService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class TrainingSheetModule {}
