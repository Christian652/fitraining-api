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
import { TrainerService } from './trainer.service';
import { TrainerDTO } from './dto/trainer.dto';
import { Trainer } from './trainer.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { IsUserLoggedEqualsGuard } from 'src/user/guards/isUserLoggedEquals.guard';
import { UpdateTrainerDTO } from './dto/update-trainer.dto';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('trainers')
export class TrainerController {
  constructor(
    private trainerService: TrainerService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() trainerDTO: TrainerDTO,
  ): Promise<Trainer> {
    try {
      const trainer = await this.trainerService.save(trainerDTO);
      return trainer;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(Role.Admin, Role.Trainer)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async update(
    @Body() trainerDTO: UpdateTrainerDTO,
  ): Promise<Trainer> {
    try {
      const trainer = await this.trainerService.save(trainerDTO);
      return trainer;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin)
  public async getAll(): Promise<Trainer[]> {
    try {
      const trainer = await this.trainerService.getAll();
      return trainer;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard, IsUserLoggedEqualsGuard)
  @Roles(Role.Admin, Role.Trainer)
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Trainer> {
      const trainer = await this.trainerService.getOne(id);
      return trainer;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedTrainer = await this.trainerService.delete(id);
      return deletedTrainer
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}