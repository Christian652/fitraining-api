import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { TrainingDTO } from './dto/training.dto';
import { TrainingRepository } from './training.repository';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);
  
  constructor(
    @InjectRepository(TrainingRepository)
    private TrainingRepository: TrainingRepository,
  ) { }

  public async save(
    TrainingDTO: TrainingDTO,
  ): Promise<Training> {
    try {
      this.logger.log(` Saving ${TrainingDTO.id} Training`);
      return await this.TrainingRepository.saveTraining(TrainingDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<Training[]> {
    return await this.TrainingRepository.getAll();
  }

  public async getOne(id: number): Promise<Training> {

    const foundTraining = await this.TrainingRepository.findOne(id);
    if (!foundTraining) {
      this.logger.warn(` Can't Found Training With Id : ${id} `);
      throw new NotFoundException(`Não Existe Treino Com o Id: ${id}`);
    }
    return foundTraining;
  }

  public async delete(TrainingId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Training : ${TrainingId} `);
      await this.TrainingRepository.delete(TrainingId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}