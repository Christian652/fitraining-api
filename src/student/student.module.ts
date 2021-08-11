import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [StudentController],
  providers: [StudentService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class StudentModule {}
