import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseDTO } from './dto/exercise.dto';
import { Exercise } from './exercise.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard())
@UseGuards(RolesGuard)
@Controller('exercises')
export class ExerciseController {
  constructor(
    private exerciseService: ExerciseService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() exerciseDTO: ExerciseDTO,
  ): Promise<Exercise> {
    try {
      const exercise = await this.exerciseService.save(exerciseDTO);
      return exercise;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async update(
    @Body() exerciseDTO: ExerciseDTO,
  ): Promise<Exercise> {
    try {
      const exercise = await this.exerciseService.save(exerciseDTO);
      return exercise;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  public async getAll(): Promise<Exercise[]> {
    try {
      const exercise = await this.exerciseService.getAll();
      return exercise;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
      const exercise = await this.exerciseService.getOne(id);
      return exercise;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedExercise = await this.exerciseService.delete(id);
      return deletedExercise
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}