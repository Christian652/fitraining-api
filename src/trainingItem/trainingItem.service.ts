import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingItem } from './trainingItem.entity';
import { TrainingItemDTO } from './dto/trainingItem.dto';
import { TrainingItemRepository } from './trainingItem.repository';

@Injectable()
export class TrainingItemService {
  private readonly logger = new Logger(TrainingItemService.name);
  
  constructor(
    @InjectRepository(TrainingItemRepository)
    private TrainingItemRepository: TrainingItemRepository,
  ) { }

  public async save(
    TrainingItemDTO: TrainingItemDTO,
  ): Promise<TrainingItem> {
    try {
      this.logger.log(` Saving ${TrainingItemDTO.id} TrainingItem`);
      return await this.TrainingItemRepository.saveTrainingItem(TrainingItemDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<TrainingItem[]> {
    return await this.TrainingItemRepository.getAll();
  }

  public async getOne(id: number): Promise<TrainingItem> {

    const foundTrainingItem = await this.TrainingItemRepository.findOne(id);
    if (!foundTrainingItem) {
      this.logger.warn(` Can't Found TrainingItem With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundTrainingItem;
  }

  public async delete(TrainingItemId: number): Promise<void> {
    try {
      this.logger.log(` Deleting TrainingItem : ${TrainingItemId} `);
      await this.TrainingItemRepository.delete(TrainingItemId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}