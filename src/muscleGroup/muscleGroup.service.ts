import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MuscleGroup } from './muscleGroup.entity';
import { MuscleGroupDTO } from './dto/muscleGroup.dto';
import { MuscleGroupRepository } from './muscleGroup.repository';

@Injectable()
export class MuscleGroupService {
  private readonly logger = new Logger(MuscleGroupService.name);
  
  constructor(
    @InjectRepository(MuscleGroupRepository)
    private MuscleGroupRepository: MuscleGroupRepository,
  ) { }

  public async save(
    MuscleGroupDTO: MuscleGroupDTO,
  ): Promise<MuscleGroup> {
    try {
      this.logger.log(` Saving ${MuscleGroupDTO.name} MuscleGroup`);
      return await this.MuscleGroupRepository.saveMuscleGroup(MuscleGroupDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<MuscleGroup[]> {
    return await this.MuscleGroupRepository.getAll();
  }

  public async getOne(id: number): Promise<MuscleGroup> {

    const foundMuscleGroup = await this.MuscleGroupRepository.findOne(id);
    if (!foundMuscleGroup) {
      this.logger.warn(` Can't Found MuscleGroup With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundMuscleGroup;
  }

  public async delete(MuscleGroupId: number): Promise<void> {
    try {
      this.logger.log(` Deleting MuscleGroup : ${MuscleGroupId} `);
      await this.MuscleGroupRepository.delete(MuscleGroupId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}