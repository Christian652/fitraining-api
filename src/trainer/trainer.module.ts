import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TrainerController } from './trainer.controller';
import { TrainerRepository } from './trainer.repository';
import { TrainerService } from './trainer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainerRepository, UserRepository]),
    AuthModule,
    UserModule
  ], 
  controllers: [TrainerController],
  providers: [TrainerService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class TrainerModule {}
