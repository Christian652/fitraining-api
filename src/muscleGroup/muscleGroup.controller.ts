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
import { MuscleGroupService } from './muscleGroup.service';
import { MuscleGroupDTO } from './dto/muscleGroup.dto';
import { MuscleGroup } from './muscleGroup.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { GetMuscleGroupFilterDTO } from './dto/getMuscleGroup.filter.dto';

@UseGuards(AuthGuard())
@UseGuards(RolesGuard)
@Controller('muscle-groups')
export class MuscleGroupController {
  constructor(
    private muscleGroupService: MuscleGroupService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() muscleGroupDTO: MuscleGroupDTO,
  ): Promise<MuscleGroup> {
    try {
      const muscleGroup = await this.muscleGroupService.save(muscleGroupDTO);
      return muscleGroup;
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
    @Body() muscleGroupDTO: MuscleGroupDTO,
  ): Promise<MuscleGroup> {
    try {
      const muscleGroup = await this.muscleGroupService.save(muscleGroupDTO);
      return muscleGroup;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  public async getAll(): Promise<MuscleGroup[]> {
    try {
      const muscleGroup = await this.muscleGroupService.getAll();
      return muscleGroup;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<MuscleGroup> {
      const muscleGroup = await this.muscleGroupService.getOne(id);
      return muscleGroup;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedMuscleGroup = await this.muscleGroupService.delete(id);
      return deletedMuscleGroup
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}