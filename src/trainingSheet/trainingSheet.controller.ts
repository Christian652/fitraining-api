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
import { TrainingSheetService } from './trainingSheet.service';
import { TrainingSheetDTO } from './dto/trainingSheet.dto';
import { TrainingSheet } from './trainingSheet.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('training-sheets')
export class TrainingSheetController {
  constructor(
    private trainingSheetService: TrainingSheetService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() trainingSheetDTO: TrainingSheetDTO,
  ): Promise<TrainingSheet> {
    try {
      const trainingSheet = await this.trainingSheetService.save(trainingSheetDTO);
      return trainingSheet;
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
    @Body() trainingSheetDTO: TrainingSheetDTO,
  ): Promise<TrainingSheet> {
    try {
      const trainingSheet = await this.trainingSheetService.save(trainingSheetDTO);
      return trainingSheet;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  public async getAll(): Promise<TrainingSheet[]> {
    try {
      const trainingSheet = await this.trainingSheetService.getAll();
      return trainingSheet;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<TrainingSheet> {
      const trainingSheet = await this.trainingSheetService.getOne(id);
      return trainingSheet;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedTrainingSheet = await this.trainingSheetService.delete(id);
      return deletedTrainingSheet
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}