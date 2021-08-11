import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/role.module';
import { LoggerMiddleware } from './operationLogs/logger.middleware';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { OperationLogsModule } from './operationLogs/operationLogs.module';
import { TrainerModule } from './trainer/trainer.module';
import { StudentModule } from './student/student.module';
import { ExerciseModule } from './exercise/exercise.module';
import { MuscleGroupModule } from './muscleGroup/muscleGroup.module';
import { TrainingModule } from './training/training.module';
import { TrainingSheetModule } from './trainingSheet/trainingSheet.module';
import { TrainingItemModule } from './trainingItem/trainingItem.module';

@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmData()), 
    UserModule, AuthModule, RolesModule, OperationLogsModule,
    TrainerModule, StudentModule, ExerciseModule, MuscleGroupModule, 
    TrainingSheetModule, TrainingModule, TrainingItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/(.*)', method: RequestMethod.GET},
        { path: '/users', method: RequestMethod.GET }, 
      )
      .forRoutes(UserController, AuthController)
  }
}


