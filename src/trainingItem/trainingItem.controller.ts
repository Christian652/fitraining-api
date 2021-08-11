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
import { TrainingItemService } from './trainingItem.service';
import { TrainingItemDTO } from './dto/trainingItem.dto';
import { TrainingItem } from './trainingItem.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('training-items')
export class TrainingItemController {
  constructor(
    private trainingItemService: TrainingItemService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() trainingItemDTO: TrainingItemDTO,
  ): Promise<TrainingItem> {
    try {
      const trainingItem = await this.trainingItemService.save(trainingItemDTO);
      return trainingItem;
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
    @Body() trainingItemDTO: TrainingItemDTO,
  ): Promise<TrainingItem> {
    try {
      const trainingItem = await this.trainingItemService.save(trainingItemDTO);
      return trainingItem;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  public async getAll(): Promise<TrainingItem[]> {
    try {
      const trainingItem = await this.trainingItemService.getAll();
      return trainingItem;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<TrainingItem> {
      const trainingItem = await this.trainingItemService.getOne(id);
      return trainingItem;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedTrainingItem = await this.trainingItemService.delete(id);
      return deletedTrainingItem
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}