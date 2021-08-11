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
import { TrainingService } from './training.service';
import { TrainingDTO } from './dto/training.dto';
import { Training } from './training.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('trainings')
export class TrainingController {
  constructor(
    private trainingService: TrainingService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() trainingDTO: TrainingDTO,
  ): Promise<Training> {
    try {
      const training = await this.trainingService.save(trainingDTO);
      return training;
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
    @Body() trainingDTO: TrainingDTO,
  ): Promise<Training> {
    try {
      const training = await this.trainingService.save(trainingDTO);
      return training;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  public async getAll(): Promise<Training[]> {
    try {
      const training = await this.trainingService.getAll();
      return training;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Training> {
      const training = await this.trainingService.getOne(id);
      return training;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedTraining = await this.trainingService.delete(id);
      return deletedTraining
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}